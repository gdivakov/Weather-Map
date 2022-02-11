const CELSIUS_IN_KELVINS = 273.15;

// handler functions
const onLocationFound = (e, map) => {
}

const onLocationError = (e) => {
	console.log(e.message);
}

function getColorHumidity(d, {min, max}) {
	return d > min+(max-min)*0.875 ? '#023858' :
		d > min+(max-min)*0.75  ? '#045a8d' :
		d > min+(max-min)*0.625  ? '#0570b0' :
		d > min+(max-min)*0.5  ? '#3690c0' :
		d > min+(max-min)*0.375   ? '#74a9cf' :
		d > min+(max-min)*0.250   ? '#a6bddb' :
		d > min+(max-min)*0.125   ? '#d0d1e6' :
					'#ece7f2';
}

function getColorTemp(d, {min, max}) {
	return d > min+(max-min)*0.875 ? '#800026' :
	d > min+(max-min)*0.75  ? '#bd0026' :
	d > min+(max-min)*0.625  ? '#e31a1c' :
	d > min+(max-min)*0.5  ? '#fc4e2a' :
	d > min+(max-min)*0.375   ? '#fd8d3c' :
	d > min+(max-min)*0.250   ? '#feb24c' :
	d > min+(max-min)*0.125   ? '#fed976' :
			   '#ffeda0';
}

// default style (first open)
function style(feature) {
	return {
		fillColor: '#7DAACD',
		weight: 2,
		opacity: 1,
		color: '#989898',
		dashArray: '3',
		fillOpacity: 0.2
	};
}

const showRainActivity = (feature, extrems) => {
	return {
		fillColor: getColorHumidity(feature.properties.humidity, extrems),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	}
};

const showTempActivity = (feature, extrems) => {
	return {
		fillColor: getColorTemp(feature.properties.temp, extrems),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	}
};

const setWeatherData = (features, regions) => {
	for (let i = 0; i < features.length; i++) {
		let region = regions.get(features[i].properties.id);

		features[i].properties.temp = Math.round(region.getIn(['main', 'temp']) - CELSIUS_IN_KELVINS, -1);
		features[i].properties.humidity = Math.round(region.getIn(['main', 'humidity']), -1);
	}
	return features;
}

const findExtrems = (features, prop) => {
	const extrems = {
		min: features[0].properties[prop],
		max: features[0].properties[prop]
	};

	features.map(feature => {
		if (feature.properties[prop] > extrems.max) extrems.max = feature.properties[prop];
		if (feature.properties[prop] < extrems.min) extrems.min = feature.properties[prop];
		return undefined;
	});

	return extrems;
}

const getGrades = ({min, max}, count) => {
	const step = 1/count,
		grades = [];
	for (let i = 0; i <= count; i++) {
		grades.push(min+(max-min)*step*i);
	}
	return grades;
}

export {
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
}