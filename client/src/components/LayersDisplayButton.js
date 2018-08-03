import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {connect} from 'react-redux'
import {toggleLayersDisplay} from '../actions'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

class LayersDisplayButton extends React.Component {

	render() {
		const {layersDisplay, toggleLayersDisplay, label, classes} = this.props;

		return (
			<div>
				<FormControlLabel
					control={
						<Switch
							checked={layersDisplay}
							onChange={toggleLayersDisplay}
							color="default"
						/>}
					label={label}
					classes={{
						label: classes.label
					}}
				/>
			</div>
		);
	}
}

const styles = theme => ({
	label: {
		fontSize: '1rem'
	}
});

LayersDisplayButton.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	return {
		layersDisplay: state.getIn(['main', 'layersDisplay'])
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		toggleLayersDisplay: () => dispatch(toggleLayersDisplay())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LayersDisplayButton));