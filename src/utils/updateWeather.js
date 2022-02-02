import {fromJS} from 'immutable'

const updateWeather = (existingWeather, newWeather) => {
	// return a new state of the weather property
	for (let i = 0; i < newWeather.length; i++) {
		let newRegionId = newWeather[i].id;
		existingWeather = existingWeather.setIn(['regions', newRegionId], fromJS(newWeather[i]));
	}
	return existingWeather;
}

export {updateWeather}