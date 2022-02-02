import React, { Fragment } from 'react'
import MapApp from './MapApp'
import WeatherTab from './WeatherTab'
import BodyDrawer from './BodyDrawer'

import '../css/map.css'

const App = () => {
	return (
		<Fragment>
			<BodyDrawer>
				<div position="relative" className="wrap"> <MapApp /> </div>
				<WeatherTab />
			</BodyDrawer>
		</Fragment>
	);
}

export default App;
