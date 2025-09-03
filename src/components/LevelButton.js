import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import StyledListItemText from './StyledListItemText'

import { connect } from 'react-redux'
import {getCountryWeather} from '../actions/async'

class LevelButton extends React.Component {
	render() {
		const {children, onClick, weather, type, isFindByPointOn, layersExist} = this.props;

		return (
			<ListItem button onClick={() => onClick(weather.get('regions'), type, isFindByPointOn, layersExist)}>
				<ListItemIcon>
					{children}
				</ListItemIcon>
				<StyledListItemText primary={type} />
			</ListItem>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		weather: state.getIn(['main', 'weather']),
		isFindByPointOn: state.getIn(['main', 'findByPoint']),
		layersExist: state.getIn(['main', 'layersDisplay'])
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (regions, type, isFindByPointOn, layersExist) => getCountryWeather(regions, type, dispatch, isFindByPointOn, layersExist)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelButton);