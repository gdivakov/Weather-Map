import L from 'leaflet';

const LEAFLET_URL = "https://api.mapbox.com/styles/v1/";
const mapboxUrl = `${LEAFLET_URL}{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`;
const attribution = '';
const { REACT_APP_LEAFLET_TOKEN: accessToken } = process.env;

const layers = [
	'mapbox/light-v10',
	'mapbox/dark-v10',
	'mapbox/satellite-v9',
	'mapbox/satellite-streets-v11',
	'mapbox/navigation-day-v1',
	'mapbox/outdoors-v11',
	'mapbox/navigation-night-v1',	
];

const initializedLayers = layers.map(id => L.tileLayer(mapboxUrl, { id, accessToken, attribution }));

export default initializedLayers;