import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { CircularProgress } from '@material-ui/core'
import ConsecutiveSnackbars from './Snackbar'
import { mailFolderListItems, otherMailFolderListItems, buttonItems } from './TileData';
import {toggleMenu} from '../actions'

import '../css/header.css'

class BodyDrawer extends React.Component {

	render() {
		const {
			classes,
			theme,
			children,
			isOpen,
			toggleMenu,
			withTooltip,
			tooltip
		} = this.props;

		const sideList = (
			<div>
				<Divider />
				<List>{mailFolderListItems}</List>
				<Divider />
				<List>{otherMailFolderListItems}</List>
				<Divider />
				<List>{buttonItems}</List>	
			</div>
		);

		return (
			<div className={classes.root}>

				<AppBar position="absolute" className={classNames(classes.appBar, isOpen && classes.appBarShift)} id="appbar">
					<Toolbar disableGutters={!isOpen} >
						<IconButton id="menu-button" color="inherit" aria-label="Menu" onClick={() => toggleMenu(withTooltip, tooltip)}>
							<MenuIcon />
						</IconButton>

						<Typography variant="title" color="inherit" id="header-name">Weather Map</Typography>

						<div><CircularProgress color="inherit" size={30} thickness={5} variant={this.props.progressing} className={classes.progress} /></div>

					</Toolbar>
					<ConsecutiveSnackbars />
				</AppBar>

				<Drawer variant="permanent" open={isOpen} classes={{
					paper: classNames(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
				}}>
					<div className={classes.toolbar}>
						<IconButton onClick={toggleMenu}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					{sideList}
				</Drawer>

				<main className={classes.content}>
					<div className={classes.toolbar} />
					{/* inner content */}
					{children}
				</main>
			</div>
		);
	}
}

const drawerWidth = 240;

const styles = theme => {
	 return ({
		root: {
			flexGrow: 1,
			height: 'auto',
			zIndex: 1,
			overflow: 'hidden',
			position: 'relative',
			display: 'flex',
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
			}),
			background: '#1C3144',
			color: 'wheat',
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerPaper: {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
			background: 'wheat',
		},
		drawerPaperClose: {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing.unit * 7,
			[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9,
			},
		},
		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: '0 8px',
			...theme.mixins.toolbar,
		},
		content: {
			flexGrow: 1,
			backgroundColor: theme.palette.background.default,
		},
		progress: {
			margin: theme.spacing.unit * 2,
		},
	})
};

const mapStateToProps = (state, ownProps) => {
	return {
		isOpen: state.getIn(['main', 'menuOpened']),
		progressing: state.getIn(['main', 'isProgressing']),
		withTooltip: state.getIn(['main', 'tooltips', 'menu', 'display']),
		tooltip: state.getIn(['main', 'tooltips', 'menu', 'tooltip'])
	}
}

const mapDispatchToProps = dispatch => {
	return {
   		toggleMenu: (withTooltip, tooltip) => toggleMenu(dispatch, withTooltip, tooltip),
	}
}

BodyDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(BodyDrawer));