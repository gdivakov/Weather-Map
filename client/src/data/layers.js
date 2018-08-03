import L from 'leaflet';

const mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
const attribution = '';
const accessToken = 'pk.eyJ1IjoiamFja3NtZWV0IiwiYSI6ImNqamw4azNzYzFhbzEzdm0wZjZ2MWw4OGsifQ.asLd4d0r0Id6VlYIwth4Pg';

const Light = L.tileLayer(mapboxUrl, {
	id: 'mapbox.light',
	attribution,
	maxZoom: 18,
	accessToken
});
const Streets = L.tileLayer(mapboxUrl, {
	id: 'mapbox.streets',
	attribution,
	maxZoom: 18,
	accessToken
});
const Wheatpaste = L.tileLayer(mapboxUrl, {
	id: 'mapbox.wheatpaste',
	attribution,
	maxZoom: 18,
	accessToken
});

const Satellite = L.tileLayer(mapboxUrl, {
	id: 'mapbox.satellite',
	attribution,
	maxZoom: 18,
	accessToken
});

const StreetsSatellite = L.tileLayer(mapboxUrl, {
	id: 'mapbox.streets-satellite',
	attribution,
	maxZoom: 18,
	accessToken
});

const StreetsBasic = L.tileLayer(mapboxUrl, {
	id: 'mapbox.streets-basic',
	attribution,
	maxZoom: 18,
	accessToken
});

const Comic = L.tileLayer(mapboxUrl, {
	id: 'mapbox.comic',
	attribution,
	maxZoom: 18,
	accessToken
});

const Outdoors = L.tileLayer(mapboxUrl, {
	id: 'mapbox.outdoors',
	attribution,
	maxZoom: 18,
	accessToken
});

const RunBikeHike = L.tileLayer(mapboxUrl, {
	id: 'mapbox.run-bike-hike',
	attribution,
	maxZoom: 18,
	accessToken
});

const Pencil = L.tileLayer(mapboxUrl, {
	id: 'mapbox.pencil',
	attribution,
	maxZoom: 18,
	accessToken
});

const Pirates = L.tileLayer(mapboxUrl, {
	id: 'mapbox.pirates',
	attribution,
	maxZoom: 18,
	accessToken
});

const Emerald = L.tileLayer(mapboxUrl, {
	id: 'mapbox.emerald',
	attribution,
	maxZoom: 18,
	accessToken
});

const HighContrast = L.tileLayer(mapboxUrl, {
	id: 'mapbox.high-contrast',
	attribution,
	maxZoom: 18,
	accessToken
});

const Dark = L.tileLayer(mapboxUrl, {
	id: 'mapbox.dark',
	attribution,
	maxZoom: 18,
	accessToken
});

export default {
	Light,
	Streets,
	Wheatpaste,
	Satellite,
	StreetsSatellite,
	StreetsBasic,
	Comic,
	Outdoors,
	RunBikeHike,
	Pencil,
	Pirates,
	Emerald,
	HighContrast,
	Dark
};