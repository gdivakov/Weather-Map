import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {connect} from 'react-redux'
import {toggleFindByPoint} from '../actions'

class PointButton extends React.Component {
	render() {
		const {children, onClick, type, withTooltip, tooltip, duration} = this.props;
		return (
			<div>
				<ListItem button onClick={() => onClick(withTooltip, tooltip, duration)}>
					<ListItemIcon>
						{children}
					</ListItemIcon>
					<ListItemText primary={type} />
				</ListItem>					
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		withTooltip: state.getIn(['main', 'tooltips', 'findByPointOn', 'display']),
		tooltip: state.getIn(['main', 'tooltips', 'findByPointOn', 'tooltip']),
		duration: state.getIn(['main', 'tooltips', 'findByPointOn', 'duration'])
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: (withTooltip, tooltip, duration) => toggleFindByPoint(dispatch, withTooltip, tooltip, duration)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PointButton);