import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


const ConfirmDialog = (props) => {
    const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={() => props.handleClose("confirm-dialog")}
        />,
        <FlatButton
            label="Delete"
            primary={true}
            onClick={props.handleDelete}
        />,
    ];

    return (
        <div>
            <Dialog
                actions={actions}
                modal={false}
                open={props.open}
                onRequestClose={() => props.handleClose("confirm-dialog")}
            >
                {props.actionMessage}
        </Dialog>
        </div>
    )
}

export default ConfirmDialog;
