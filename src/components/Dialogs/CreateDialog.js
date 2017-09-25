import React from 'react';
import Dialog from 'material-ui/Dialog';
import { Col } from "react-bootstrap";

import FlatButton from 'material-ui/FlatButton';
import TextField from "material-ui/TextField";

const CreateDialog = (props) => {
    const actions = [
        <FlatButton
            label="Add"
            primary={true}
            onClick={props.handleClose}
        />,
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={() => props.handleClose("create-dialog")}
        />

    ];

    return (
        <div>
            <Dialog
                title="Add a new bucket list"
                actions={actions}
                modal={true}
                open={props.open}
            >
                <Col lg={12}>
                    <Col lg={10} lgOffset={2}>
                        <TextField
                            name="name"
                            floatingLabelText="Enter bucketlist name" />
                    </Col>
                    <Col lg={10} lgOffset={2}>
                        <TextField
                            name="description"
                            floatingLabelText="Enter bucketlist description" />
                    </Col>
                </Col>
            </Dialog>
        </div>
    );
}

export default CreateDialog;