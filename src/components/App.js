import React from 'react'
import MapApp from './MapApp'
import WeatherTab from './WeatherTab'
import BodyDrawer from './BodyDrawer'

import '../css/map.css'

const App = () => {
	return (
		<BodyDrawer>
			<div position="relative" className="wrap"> <MapApp /> </div>
			<WeatherTab />
		</BodyDrawer>
	);
}

export default App;
