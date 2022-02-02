import L from 'leaflet';

const mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
const attribution = '';
const accessToken = 'pk.eyJ1IjoiamFja3NtZWV0IiwiYSI6ImNqamw4azNzYzFhbzEzdm0wZjZ2MWw4OGsifQ.asLd4d0r0Id6VlYIwth4Pg';

const Light = L.tileLayer(mapboxUrl, {
	tileSize: 512,
	maxZoom: 18,
	zoomOffset: -1,
	id: 'mapbox/light-v10',
	accessToken,
	attribution,
});
const Streets = L.tileLayer(mapboxUrl, {
	id: 'mapbox/streets-v11',
	attribution,
	maxZoom: 18,
	accessToken
});

const Dark = L.tileLayer(mapboxUrl, {
	id: 'mapbox/dark-v10',
	attribution,
	maxZoom: 18,
	accessToken
});

const Satellite = L.tileLayer(mapboxUrl, {
	id: 'mapbox/satellite-v9',
	attribution,
	maxZoom: 18,
	accessToken
});

const StreetsSatellite = L.tileLayer(mapboxUrl, {
	id: 'mapbox/satellite-streets-v11',
	attribution,
	maxZoom: 18,
	accessToken
});

const NavigationDay = L.tileLayer(mapboxUrl, {
	id: 'mapbox/navigation-day-v1',
	attribution,
	maxZoom: 18,
	accessToken
});

const Outdoors = L.tileLayer(mapboxUrl, {
	id: 'mapbox/outdoors-v11',
	attribution,
	maxZoom: 18,
	accessToken
});

const NavigationNight = L.tileLayer(mapboxUrl, {
	id: 'mapbox/navigation-night-v1',
	attribution,
	maxZoom: 18,
	accessToken
});

export default {
	Light,
	Streets,
	Dark,
	Satellite,
	StreetsSatellite,
	NavigationDay,
	NavigationNight,
	Outdoors,
};