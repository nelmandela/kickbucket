import React from "react";
import moment from "moment";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Col } from "react-bootstrap";
import FlatButton from 'material-ui/FlatButton';

export const BucketListCard = (bucket) => {
    const created_on = `created on: ${moment(bucket.created_on).format("YYYY-MM-DD")}`;
    return (
        <Col lg={5} xs={12} sm={6} style={{'margin': '1%'}}>
            <Card>
                <CardHeader
                    title={bucket.name}
                    subtitle={created_on}
                />
                <CardActions>
                    <FlatButton onClick={() => bucket.handleOpen("create-dialog", bucket.id)} label="Edit" />
                    <FlatButton label="Delete" />
                    <FlatButton label="View Items" />
                </CardActions>
                <CardText expandable={true}>
                    <p>{bucket.description}</p>
                </CardText>
            </Card>
        </Col>
    )
};
