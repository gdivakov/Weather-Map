import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core'
import WeatherFragment from './WeatherFragment'
import { onPanelExpand } from '../actions/index'
import '../css/weatherTab.css'

class WeatherTab extends React.Component {
	render() {
		const { classes, expanded, onExpand, currentRegion} = this.props;
		const weatherFragment = currentRegion ? <WeatherFragment /> : '';
		return (
			<div className="expansion-panel">
				<ExpansionPanel expanded={expanded.get('panel1')} onChange={() => onExpand('panel1')} disabled={currentRegion == null} >
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.panel}>
						<Typography>
							<span className="heading">
								{currentRegion == null ? "Region" : currentRegion.get('name')}
							</span>
						</Typography>
					</ExpansionPanelSummary>

					<ExpansionPanelDetails className={classes.panelDetails}>
						{weatherFragment}
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		);
	}
}

const styles = theme => ({
	panel: {
		backgroundColor: 'wheat',
		textAlign: 'center'
	},
	panelDetails: {
		backgroundColor: 'wheat',
		padding: '4px',
		minWidth: 150
	}
});

WeatherTab.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	return {
		expanded: state.getIn(['main', 'expanded']),
		currentRegion: state.getIn(['main', 'currentRegion'])
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onExpand: (idx) => dispatch(onPanelExpand(idx))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WeatherTab));