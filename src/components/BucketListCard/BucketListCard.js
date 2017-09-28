import React from "react";
import moment from "moment";
import {Link} from "react-router";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Col } from "react-bootstrap";
import FlatButton from 'material-ui/FlatButton';

export const BucketListCard = (bucket) => {
    return (
        <Col lg={5} xs={12} sm={6} style={{'margin': '1%'}}>
            <Card>
                <CardHeader
                    title={bucket.name}
                    subtitle={`created on: ${moment(bucket.created_on).format("YYYY-MM-DD")}`}
                />
                <CardActions>
                    <FlatButton onClick={() => bucket.handleOpen("create-dialog", bucket.bucketlistId)} label="Edit" />
                    <FlatButton onClick={() => bucket.handleOpen("", bucket.bucketlistId)} label="Delete" />
                    <Link to={`/bucketlists/`+ bucket.bucketlistId+`/items`}><FlatButton label="View Items"/></Link>
                </CardActions>
                <CardText expandable={true}>
                    <p>{bucket.description}</p>
                </CardText>
            </Card>
        </Col>
    )
};
