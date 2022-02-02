import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux'
import {closeMessage} from '../actions'

class CustomSnackbars extends React.Component {

	render() {
		const { classes } = this.props;
		const {message, open, handleClose, autoHideDuration} = this.props;

		return (
			<div>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					open={open}
					autoHideDuration={autoHideDuration}
					onClose={(e, reason) => handleClose(reason)}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id="message-id">{message}</span>}
					action={[
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							className={classes.close}
							onClick={handleClose}
						>
						<CloseIcon />
						</IconButton>,
					]}
				/>
			</div>
		);
	}
}

const styles = theme => ({
	close: {
		width: theme.spacing.unit * 4,
		height: theme.spacing.unit * 4,
	},
});

CustomSnackbars.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		message: state.getIn(['main', 'snackbar', 'message']),
		open: state.getIn(['main', 'snackbar', 'open']),
		autoHideDuration: state.getIn(['main', 'snackbar', 'autoHideDuration']) || 5000
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleClose: (reason) => {
			if (arguments.length && reason !== 'clickaway') dispatch(closeMessage())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomSnackbars));