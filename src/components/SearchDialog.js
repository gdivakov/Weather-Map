import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux'
import { closeDialog } from '../actions/';
import { searchByType } from '../actions/async';

class SearchDialog extends React.Component {

  render() {
	const {isOpen, type, closeHandler, searchHandler, label, contentText} = this.props;
	
	return (
		<Dialog
			open={isOpen}
			onClose={closeHandler}
			aria-labelledby="form-dialog-title"
		>

			<DialogTitle id="form-dialog-title">{type}</DialogTitle>

			<DialogContent>
				<DialogContentText>
					{contentText}
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label={label}
					type={type}
					fullWidth
					inputRef={el => this.inputEl = el}
					onKeyUp={(e) => e.keyCode === 13 ? (() => {
						searchHandler(this.inputEl.value);
						return closeHandler();	
					})() : null}
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={() => {searchHandler(this.inputEl.value);closeHandler()}} color="primary">
					Search
				</Button>
				<Button onClick={closeHandler} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

	return {
		isOpen: state.getIn(['main', 'dialogs', ownProps.type, 'isOpen']),
		label: state.getIn(['main', 'dialogs', ownProps.type, 'label']),
		contentText: state.getIn(['main', 'dialogs', ownProps.type, 'contentText'])
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		closeHandler: () => dispatch(closeDialog(ownProps.type)),
		searchHandler: (value) => searchByType(dispatch, ownProps.type, value),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDialog);