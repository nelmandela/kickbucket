import React from 'react';
import Dialog from 'material-ui/Dialog';
import { Col } from "react-bootstrap";

import FlatButton from 'material-ui/FlatButton';
import TextField from "material-ui/TextField";

const CreateItemDialog = (props) => {
    const actions = [
        <FlatButton
            label={props.editing ? "Edit" : "Add"}
            primary={true}
            onClick={props.editing ? props.handleEdit :props.handleSubmit}
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
                title={props.title}
                actions={actions}
                modal={true}
                open={props.createOpen}
            >
                <Col lg={12}>
                    <Col lg={10} lgOffset={2}>
                        {props.errorMessage !== "" &&
                            <p style={{'color': 'red'}}>{props.errorMessage}</p>}
                        <TextField
                            name="name"
                            value={props.name}
                            floatingLabelText="Enter item name"
                            onChange={props.handleChange} />
                    </Col>
                 
                </Col>
            </Dialog>
        </div>
    );
}

export default CreateItemDialog;
