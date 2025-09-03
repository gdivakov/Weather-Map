import ukraineGeoJSON from '../data/ukraine'
import {showMessage} from './index'

const { REACT_APP_OPEN_WEATHER_MAP_ID: APPID } = process.env;

const OPEN_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

const fetchRegionById = (dispatch, id) => {
	dispatch({type: "FETCH_BY_ID_START"});

	fetch(`${OPEN_WEATHER_URL}?id=${id}&APPID=${APPID}`)
	.then(res => {
		if (res.status !== 200) {
			throw new Error("Fetch region by id error");
		}

		return res.json();
	})
	.then(regionWeather => dispatch({type: 'FETCH_BY_ID_SUCCESS', value: regionWeather, id}))
	.catch(err => {
		showMessage(dispatch, err.message)
		return dispatch({type: 'FETCH_BY_ID_ERROR', value: err.message});
	});
}

const getCountryWeather = (existingWeather = {}, type, dispatch, isFindByPointOn = false, layersExist = true) => {
	if (isFindByPointOn) {
		return showMessage(dispatch, 'Turn off "By point" option before display levels');
	}

	if (!layersExist) {
		dispatch({type: "TOGGLE_LAYERS_DISPLAY"});
	}

	// filter currently existing data
	const regions = ukraineGeoJSON.features.filter(feature => {
		let id = feature.properties.id;
		for (let key of existingWeather.keys()) {
			if (+key === +id) return false;
		}
		return true;
	});

	// if all data is on the store
	if (!regions.length) {
		switch (type) {
			case 'Humidity level':
				return dispatch({type: 'SHOW_WATER'});
			case 'Temp level':
				return dispatch({type: 'SHOW_TEMP'});
			default :
				return dispatch({type: 'ERROR', message: 'unknown type'});
		}
	}

	// form tasks array for Promise.all method
	const tasks = [];

	for (let i = 0; i < regions.length; i++) {
		tasks.push(new Promise((res, rej) => {
			fetch(`${OPEN_WEATHER_URL}?id=${regions[i].properties.id}&APPID=${APPID}`)
				.then(res => {
					if (res.status !== 200) throw new Error("Fetch all regions error");
					return res.json();
				}).then((json) => {
					res(json);
				})
				.catch(err => {
					rej(err)
				});
		}));
	}

	// get data for each region
	dispatch({type: 'FETCH_ALL_REGIONS_WEATHER_START'});

	Promise.all(tasks)
		.then(res => {
			return dispatch({type: 'FETCH_ALL_REGIONS_WEATHER_SUCCESS', res});
		})
		.then(res => {
			switch (type) {
				case 'Humidity level':
					return dispatch({type: 'SHOW_WATER'});
				case 'Temp level':
					return dispatch({type: 'SHOW_TEMP'});
				default :
					return dispatch({type: 'ERROR', message: 'unknown type'});
			}
		})
		.catch(err => {
			showMessage(dispatch, err.message);
			return dispatch({type: 'FETCH_ALL_REGIONS_WEATHER_ERROR', message: err.message});
		});
}

const searchByType = (dispatch, type, value) => {
	switch (type) {
		case 'By city name':
			return searchByCity(dispatch, value);
		case 'By coords':
			return searchByCoords(dispatch, value);
		default:
			return dispatch({type: "ERROR"});
	}
}

const searchByCity = (dispatch, value) => {
	if (typeof value !== 'string') {
		showMessage(dispatch, 'City name must be string');
		return dispatch({type: 'ERROR', message: 'City name must be string'});
	}

	dispatch({type: 'CLOSE_MENU'});
	dispatch({type: 'FETCH_BY_CITY_NAME_START'});

	fetch(`${OPEN_WEATHER_URL}?q=${value.trim()}&APPID=${APPID}`)
		.then(res => {
			if (res.status !== 200) {
				throw new Error("Not found");
			}
			return res.json();
		})
		.then(city => {
			dispatch({type: 'FETCH_BY_CITY_NAME_SUCCESS', city});
			return dispatch({type: 'FIT_BY_COORDS', coords: city.coord});
		})
		.catch(err => {
			dispatch({type: 'FIND_BY_POINT_OFF'});
			showMessage(dispatch, err.message);
			return dispatch({type: 'FETCH_BY_CITY_NAME_ERROR', message: err.message});
		})
}

const searchByCoords = (dispatch, value) => {
	if (typeof value !== 'string') {
		showMessage(dispatch, 'Invalid coords');
		return dispatch({type: 'ERROR', message: 'Invalid coords'});
	}

	const coords = value.split(" ");

	dispatch({type: "CLOSE_MENU"});
	dispatch({type: "FETCH_BY_COORDS_START"});

	fetch(`${OPEN_WEATHER_URL}?lat=${coords[0]}&lon=${coords[1]}&APPID=${APPID}`)
		.then(res => {
			if (res.status !== 200) {
				throw new Error("Not Found");
			}
			return res.json();
		})
		.then(region => {
			dispatch({type: "FETCH_BY_COORDS_SUCCESS", region});
			return dispatch({type: 'FIT_BY_COORDS', coords: region.coord});
		})
		.catch(err => {
			dispatch({type: 'FIND_BY_POINT_OFF'});
			showMessage(dispatch, err.message);
			return dispatch({type: "FETCH_BY_COORDS_ERROR", message: err.message});
		});
}

const onMapClick = (dispatch, e) => searchByCoords(dispatch, `${e.latlng.lat} ${e.latlng.lng}`);

export {
	fetchRegionById,
	getCountryWeather,
	searchByType,
	onMapClick
};