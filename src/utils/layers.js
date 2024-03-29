import L from 'leaflet';

const LEAFLET_URL = 'https://api.mapbox.com/styles/v1/';
const mapboxUrl = `${LEAFLET_URL}{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`;
const attribution = '';
const { REACT_APP_LEAFLET_TOKEN: accessToken } = process.env;

export const layers = [
	{ id: 'mapbox/light-v10', label: 'Light' },
	{ id: 'mapbox/dark-v10', label: 'Dark' },
	{ id: 'mapbox/satellite-v9', label: 'satellite' },
	{ id: 'mapbox/satellite-streets-v11', label: 'satellite-streets' },
	{ id: 'mapbox/navigation-day-v1', label: 'navigation-day' },
	{ id: 'mapbox/outdoors-v11', label: 'outdoors' },	
	{ id: 'mapbox/navigation-night-v1', label: 'navigation-night' },	
];

const initializedLayers = layers.map(({ id, label }) => ([
	label, 
	L.tileLayer(mapboxUrl, {
		id, 
		accessToken, 
		attribution,
	})
]));
const preparedLayers = Object.fromEntries(initializedLayers);

export default preparedLayers;