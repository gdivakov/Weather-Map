const showLevelHandler = (value) => {
	switch (value) {
		case 'ShowWaterLevel':
			return {type: 'SHOW_WATER'};
		case 'ShowTempLevel':
			return {type: 'SHOW_TEMP'};
		default:
			return {type: 'ERROR'};
		}
}

const toggleMenu = (dispatch, withTooltip, tooltip) => {
	if (withTooltip === true) showMessage(dispatch, tooltip)
	return dispatch({type: 'TOGGLE_MENU'});
	
}

const onPanelExpand = (idx) => {
	return {type: 'EXPANDED', idx};
}

const selectRegion = (region) => {
	return {type: 'CHANGE_CURRENT_REGION', region}
}

const openDialog = dialogType => {
	return {type: 'OPEN_DIALOG', dialogType}
}

const closeDialog = dialogType => {
	return {type: 'CLOSE_DIALOG', dialogType}
}

const resetFit = () => {
	return {type: 'RESET_FIT'}
}

const findByPointOff = () => {
	return {type: 'FIND_BY_POINT_OFF'}
}

const toggleFindByPoint = (dispatch, withTooltip, tooltip, duration) => {
	if (withTooltip === true) showMessage(dispatch, tooltip, duration);
	dispatch({type: 'CLOSE_MENU'});
	return dispatch({type: 'TOGGLE_FIND_BY_POINT'});
}

const toggleLayersDisplay = () => {
	return {type: "TOGGLE_LAYERS_DISPLAY"}
}

const showMessage = (dispatch, message, duration) => {
	dispatch({type: 'CLOSE_MESSAGE'});
	return setTimeout(() => dispatch({type: "SHOW_MESSAGE", message, autoHideDuration: duration || null}), 500)
}

const closeMessage = () => {
	return {type: "CLOSE_MESSAGE"}
}
export {
	showLevelHandler,
	toggleMenu,
	onPanelExpand,
	selectRegion,
	openDialog,
	closeDialog,
	resetFit,
	findByPointOff,
	toggleFindByPoint,
	toggleLayersDisplay,
	showMessage,
	closeMessage
};