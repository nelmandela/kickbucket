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
            label="Discard"
            primary={true}
            onClick={props.handleClose}
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
                Discard draft?
        </Dialog>
        </div>
    )
}

export default ConfirmDialog;