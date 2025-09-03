import {fromJS} from 'immutable'
import * as Actions from '../constants/ActionTypes.js'
import {updateWeather} from '../utils/updateWeather'
import BUTTON_CONSTS from '../constants/SidebarButtons.js'

const initialState = fromJS({
	showHumidityLevel: false,
	showTempLevel: false,
	menuOpened: false,
	isProgressing: 'determinate',
	event: null,
	expanded: { panel1: false, panel2: false },
	currentRegion: null,
	fitTo: null,
	findByPoint: false,
	layersDisplay: true,
	weather: {
		regions: {},
		cities: {},
		countries: {},
	},
	snackbar: {
		message: null,
		open: false,
		autoHideDuration: null
	},
	dialogs: {
		[BUTTON_CONSTS.BY_CITY_NAME]: {
			isOpen: false,
			label: 'City name',
			contentText: 'To find weather by City, please enter the name of your city here and click on the search button or press "Enter". (Use only English letters).'
		},
		[BUTTON_CONSTS.BY_COORDS]: {
			isOpen: false,
			label: ' Lat Lon',
			contentText: 'To find weather by coords, please enter the coords here and click on the search button or press "Enter".'
		}
	},
	tooltips: {
		mapDidMount: {
			display: true,
			tooltip: "Hey, you can get weather in your region by clicking on it but it's available only for Ukraine regions. Otherwise you can use other options to find weather wherever you want. Look on the leftside bar",
			duration: 10000
		},
		menu: {
			display: true,
			tooltip: "Also you can look at the temp/humidity level in Ukraine",
			duration: null
		},
		findByPointOn: {
			display: true,
			tooltip: "Click on any point on the map",
			duration: 2000
		}
	}
});

const main = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SHOW_WATER:
			return state
				.update('showHumidityLevel', (val) => !val)
				.update('showTempLevel', () => initialState.get('showTempLevel'))
				.update('event', () => null);
		case Actions.SHOW_TEMP:
			return state
				.update('showTempLevel', (val) => !val)
				.update('showHumidityLevel', val => initialState.get('showHumidityLevel'))
				.update('event', val => null);
		case Actions.TOGGLE_MENU:
			return state
				.update('menuOpened', val => !val)
				.updateIn(['tooltips', 'menu'], val => false)
		case Actions.CLOSE_MENU:
			return state
				.update('menuOpened', () => false)
		case Actions.FETCH_BY_ID_START:
			return state
				.update('isProgressing', () => 'indeterminate')
		case Actions.FETCH_BY_ID_SUCCESS:
				return state
				.updateIn(['weather', 'regions'], (val) => val.set(action.id, fromJS(action.value)))
				.update('currentRegion', () => fromJS(action.value))
				.update('isProgressing', () => initialState.get('isProgressing'))
				.updateIn(['expanded', 'panel1'], val => true)
				.update('event', () => 'update_weather');
		case Actions.FETCH_BY_ID_ERROR:
			return state
				.update('isProgressing', () => initialState.get('isProgressing'))
		case Actions.ERROR:
			return state;
		case Actions.EXPANDED:
			return state
				.updateIn(['expanded', action.idx], val => !val)
		case Actions.CHANGE_CURRENT_REGION:
			return state
				.update('currentRegion', val => action.region)
				.updateIn(['expanded', 'panel1'], val => true)
		case Actions.FETCH_ALL_REGIONS_WEATHER_START:
			return state
				.update('isProgressing', val => 'indeterminate')
		case Actions.FETCH_ALL_REGIONS_WEATHER_SUCCESS:
			return state
				.update('isProgressing', val => initialState.get('isProgressing'))
				.update('weather', val => updateWeather(state.get('weather'), action.res))
				.update('event', val => 'update_weather')
		case Actions.FETCH_ALL_REGIONS_WEATHER_ERROR:
			return state
				.update('isProgressing', val => initialState.get('isProgressing'))
		case Actions.OPEN_DIALOG:
			return state
				.updateIn(['dialogs', action.dialogType, 'isOpen'], () => true)
		case Actions.CLOSE_DIALOG:
			return state
				.updateIn(['dialogs', action.dialogType, 'isOpen'], () => false)
		case Actions.FETCH_BY_CITY_NAME_START:
			return state
				.update('isProgressing', () => 'indeterminate')
		case Actions.FETCH_BY_CITY_NAME_SUCCESS:
			return state
				.update('isProgressing', () => 'determinate')
				.update('currentRegion', () => fromJS(action.city))
				.updateIn(['expanded', 'panel1'], () => true)
		case Actions.FETCH_BY_CITY_NAME_ERROR:
			return state
				.update('isProgressing', () => initialState.get('isProgressing'))
		case Actions.FIT_BY_COORDS:
			return state
				.update('fitTo', () => action.coords)
		case Actions.RESET_FIT:
			return state
				.update('fitTo', () => null)
		case Actions.FETCH_BY_COORDS_START:
			return state
				.update('isProgressing', () => 'indeterminate')
		case Actions.FETCH_BY_COORDS_SUCCESS:
			return state
				.update('isProgressing', () => initialState.get('isProgressing'))
				.update('currentRegion', () => fromJS(action.region))
				.updateIn(['expanded', 'panel1'], () => true)
		case Actions.FETCH_BY_COORDS_ERROR:
			return state
				.update('isProgressing', () => initialState.get('isProgressing'))
		case Actions.TOGGLE_FIND_BY_POINT:
			return state
				.update('findByPoint', val => !val)
				.updateIn(['tooltips', 'findByPointOn', 'display'], () => false)
		case Actions.FIND_BY_POINT_OFF:
			return state
				.update('findByPoint', () => false)
		case Actions.TOGGLE_LAYERS_DISPLAY:
			return state
				.update('layersDisplay', val => !val)
		case Actions.SHOW_MESSAGE:
			return state
				.updateIn(['snackbar', 'message'], () => action.message)
				.updateIn(['snackbar', 'open'], () => true)
				.updateIn(['snackbar', 'autoHideDuration'], () => action.autoHideDuration || null)
		case Actions.CLOSE_MESSAGE:
			return state
				.updateIn(['snackbar', 'message'], val => null)
				.updateIn(['snackbar', 'open'], val => false)
		default:
			return state;
	}
}

export default main;
