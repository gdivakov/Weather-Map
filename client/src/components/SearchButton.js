import React from 'react'
import {connect} from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SearchDialog from './SearchDialog'
import {openDialog} from '../actions/index'

class SearchButton extends React.Component {
	render() {
		const {children, onClick, type} = this.props;
		return (
			<div>
				<ListItem button onClick={onClick}>
					<ListItemIcon>
						{children}
					</ListItemIcon>
					<ListItemText primary={type} />
				</ListItem>	
				<SearchDialog type={type}/>					
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => dispatch(openDialog(ownProps.type))
	}
}

export default connect(null, mapDispatchToProps)(SearchButton);