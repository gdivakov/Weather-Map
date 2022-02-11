import L from 'leaflet'
import React, {Component} from 'react'
import { connect } from 'react-redux'

import ukraineGeoJSON from '../data/ukraine'
import preparedLayers, { layers } from '../utils/layers'
import {fetchRegionById, onMapClick} from '../actions/async'
import {
	selectRegion,
	resetFit,
	findByPointOff,
	toggleLayersDisplay,
	showMessage
} from '../actions/'
import {
	onLocationFound,
	onLocationError,
	getColorHumidity,
	getColorTemp,
	style,
	showRainActivity,
	showTempActivity,
	setWeatherData,
	findExtrems,
	getGrades,
} from '../utils/mapUtils'

import '../css/map.css'

const GRADES_COUNT = 8;
const INTERACTIVE_LAYERS_TYPES = {
	HUMIDITY: 'humidity',
	TEMPERATURE: 'temp',
}

// Map interaction logic (legacy code)
class MapApp extends Component {

	shouldComponentUpdate() {
		return false;
	}

	componentDidMount() {
		const {showMessage, withTooltip, tooltip, duration} = this.props;

		this.initialize();

		if (withTooltip) {
			showMessage(tooltip, duration);
		}
	}

	componentWillReceiveProps(nextProps) {

		const {
			findByPointOff,
			fitTo,
			resetFit,
			findByPoint,
			event,
			weather,
			showHumidityLevel: isHumidityLevelDisplayed,
			showTempLevel: isTempLevelDisplayed,
			onMapClick,
			layersDisplay: isLayersDisplayed,
			toggleLayersDisplay
		} = nextProps;

		if (event === 'update_weather') {
			this.weather = weather;
		}

		// fit by coords
		if (fitTo) {
			// set layers view to default
			this.selectedLayer = null
			this.highlightRegions();

			// show region by coords
			this.map.flyTo(L.latLng(fitTo.lat, fitTo.lon), 10, {
				animate: true,
				duration: 2
			});

			resetFit();
			if (findByPoint) {
				findByPointOff();
			}
		}

		if (findByPoint) {
			// layers display => off
			if (isLayersDisplayed) toggleLayersDisplay();
			this.removeLayers();

			// change cursor view to crosshair
			L.DomUtil.addClass(this.map._container,'crosshair-cursor-enabled');
			return this.map.on('click', onMapClick);
		} else {
			// change cursor view to default
			L.DomUtil.removeClass(this.map._container,'crosshair-cursor-enabled');
			this.map.off('click', onMapClick);
		}

		if (isLayersDisplayed) {
			if (isHumidityLevelDisplayed) {
				return this.showLevels(INTERACTIVE_LAYERS_TYPES.HUMIDITY);
			}

			if (isTempLevelDisplayed) {
				return this.showLevels(INTERACTIVE_LAYERS_TYPES.TEMPERATURE)
			}

			return this.highlightRegions();
		} else {
			this.removeLayers();
		}
	}

	initialize() {
		// create map
		this.map = L.map('map', {
				center: [48.78, 32.35],
				zoom: 6,
				minZoom: 1,
				layers: [preparedLayers[layers[0].label]]
			})

		// create info L.control and define it's methods
		this.info = L.control({
			position: 'bottomleft'
		});

		this.info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info-selected-region');
			this.update();
			return this._div;
		};

		this.info.update = function (props) {
			this._div.innerHTML = '<h4>Region:</h4>' +  (props ?
				'<b>' + props.name + '</b>'
				: 'Hover over the area');
		};

		this.info.addTo(this.map);

		// add control
		L.control.layers(preparedLayers, {}, {position: 'bottomleft'}).addTo(this.map);

		// define handlers
		this.map.on('locationfound', (e) => onLocationFound(e, this.map));
		this.map.on('locationerror', onLocationError);

		this.highlightRegions();

		// init the weather
		this.weather = this.props.weather;
	}

	highlightRegions() {
		const {onEachFeature, map} = this;

		this.countryLayer && this.countryLayer.remove(map);
		this.legend && this.legend.remove(map);

		this.countryLayer = L.geoJson(ukraineGeoJSON, {style, onEachFeature}).addTo(map);

		if (this.selectedLayer) {
			// define region which was selected before and remove it
			this.selectedLayer = this.findLayerByRegionId(this.selectedLayer, this.countryLayer._layers);
			this.countryLayer.removeLayer(this.selectedLayer);
		}

		this.levelDisplay = false;
	}

	findLayerByRegionId(layer, newLayers) {
		const searchedId = layer.feature.properties.id;

		for (let key in newLayers) {
			if (newLayers[key].feature.properties.id === searchedId) return newLayers[key];
		}

	}

	showLevels(type) {
		const {onEachFeature, map} = this;
		const {weather} = this.props;

		this.countryLayer && this.countryLayer.remove(map);
		this.legend && this.legend.remove(map);

		// set weather data to geo json
		const ukraineGeo = setWeatherData(ukraineGeoJSON.features, weather.get('regions'));
		const extrems = findExtrems(ukraineGeo, type);
		const getLayerStyle = type === INTERACTIVE_LAYERS_TYPES.HUMIDITY ? showRainActivity : showTempActivity;
		const getLegendColor = type === INTERACTIVE_LAYERS_TYPES.HUMIDITY ? getColorHumidity : getColorTemp;
		const units = type === INTERACTIVE_LAYERS_TYPES.HUMIDITY ? '%' : '°C';

		this.countryLayer = L.geoJson(ukraineGeo, {
			style: (feature) => getLayerStyle(feature, extrems),
			onEachFeature
		}).addTo(map);

		// create legend
		this.legend = L.control({position: 'topleft'});
		this.legend.onAdd = function(map) {
			const div = L.DomUtil.create('div', 'info legend'),
				grades = getGrades(extrems, GRADES_COUNT);

			// loop through our temp intervals and generate label with a colored square for each interval
			for (let i = grades.length-1; i > 0; i--) {
				div.innerHTML +=
					'<i style="background:' + getLegendColor(grades[i], extrems) + '"></i> ' +
					Math.round(grades[i - 1]) + `${units}&ndash;` + Math.round(grades[i]) + `${units}<br>`;
			}

			return div;
		};

		this.legend.addTo(map);
		this.levelDisplay = true;
	}

	removeLayers() {
		this.countryLayer && this.countryLayer.remove(this.map);
		this.legend && this.legend.remove(this.map);
	}

	onEachFeature = (feature, layer) => {
		layer.on({
			mouseover: this.highlightFeature,
			mouseout: this.resetHighlight,
			click: this.clickOnRegion
		});
	}

	highlightFeature = (e) => {
		const layer = e.target;

		layer.setStyle({
			weight: 3.5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}
		this.info.update(layer.feature.properties);
	}

	resetHighlight = (e) => {
		this.countryLayer && this.countryLayer.resetStyle(e.target);
		this.info.update();
	}

	clickOnRegion = (e) => {
		const {selectRegion, fetchRegionById} = this.props,
			layer = e.target,
			regionWeather = this.weather.getIn(['regions', layer.feature.properties.id]);

		// get weather by region
		regionWeather ? selectRegion(regionWeather) : fetchRegionById(layer.feature.properties.id);

		if (!this.levelDisplay) {
			// only one region could be selected as the default view, for other views region doesn't selecting

			// add previous selected layer
			if (this.selectedLayer) this.countryLayer.addLayer(this.selectedLayer);

			// remove current selected layer
			this.countryLayer.resetStyle(layer).removeLayer(layer);
		}

		// clicked? => save as current selected layer
		this.selectedLayer = layer;

		this.map.fitBounds(layer.getBounds(), {
			maxZoom: 7
		});
	}

	render() {
		return (
			<div id="map"></div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		withTooltip: state.getIn(['main', 'tooltips', 'mapDidMount', 'display']),
		tooltip: state.getIn(['main', 'tooltips', 'mapDidMount', 'tooltip']),
		duration: state.getIn(['main', 'tooltips', 'mapDidMount', 'duration']),
		showHumidityLevel: state.getIn(['main', 'showHumidityLevel']),
		showTempLevel: state.getIn(['main', 'showTempLevel']),
		weather: state.getIn(['main', 'weather']),
		event: state.getIn(['main', 'event']),
		fitTo: state.getIn(['main', 'fitTo']),
		findByPoint: state.getIn(['main', 'findByPoint']),
		layersDisplay: state.getIn(['main', 'layersDisplay']),
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchRegionById: id => fetchRegionById(dispatch, id),
		selectRegion: region => dispatch(selectRegion(region)),
		resetFit: () => dispatch(resetFit()),
		findByPointOff: () => dispatch(findByPointOff()),
		onMapClick: (e) => onMapClick(dispatch, e),
		toggleLayersDisplay: () => dispatch(toggleLayersDisplay()),
		showMessage: (message, duration) => showMessage(dispatch, message, duration)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MapApp);