import React, { Component } from "react";
import { Grid, Col } from "react-bootstrap";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { BucketListCard } from "../components/BucketListCard";
import { CreateDialog, ConfirmDialog } from "../components/Dialogs";

import instance from "../common/axiosInstance";

export default class DashBoardContainer extends Component {
    state = {
        bucketlists: [],
        confirmOpen: false,
        createOpen: false,
        errorMessage: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {name, description} = this.state;

        if(name === "" || description === ""){
            this.setState({
                errorMessage: "inputs cannot be empty"
            })
        }
        else {
            instance.request({
                url: "/bucketlists",
                method: "POST",
                data: {
                    name,
                    description
                }
            }).then((response) => {
                if(response.data.status === "success"){
                    // get bucketlists again
                    this.fetchBucketlists();

                    // close the modal
                    this.setState({
                        createOpen: false,
                        errorMessage: ""
                    })
                }
            }).catch((error) => {        
                this.setState({
                    errorMessage: error.response.data.message
                })
            })
        }
    }

    handleOpen = (dialogType) => {
        // check type of dialog to be opened
        if (dialogType === "create-dialog") {
            // open add new bucket dialog
            this.setState({ createOpen: true });
        }
        else {
            // open confirmation dialog
            this.setState({ confirmOpen: true });
        }
    }

    handleClose = (dialogType) => {
        // check type of dialog to be closed
        if (dialogType === "create-dialog") {
            // close add new bucket dialog
            this.setState({ 
                createOpen: false,
                errorMessage: ""
            });
        }
        else {
            // close confirmation dialog
            this.setState({ 
                confirmOpen: false,
                errorMessage: ""
            });
        }
    }

    componentWillMount() {
        this.fetchBucketlists();
    }

    fetchBucketlists = () => {
        instance.request({
            url: "/bucketlists",
            method: "GET",
        }).then((response) => {
            this.setState({
                bucketlists: response.data.bucketlist
            })
        }).catch((error) => {
            this.setState({
                errorMessage: error.response.data.message
            })
        })
    }

    render() {
        const style= {
            'float': 'right',
            'marginBottom': '20px' 
        }

        return (
            <Grid>
                <p>Welcome to your dashboard</p>
                <Col lg={12} className="floating-btn">
                    <FloatingActionButton style={style} onClick={() => this.handleOpen("create-dialog")}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Col>
                <Col lg={12}>
                    {this.state.bucketlists.length > 0 && this.state.bucketlists.map((bucket, index) => (
                        <BucketListCard 
                            key={index} 
                            {...bucket} />
                    ))}
                </Col>
                {/* dashboard dialogs container */}
                <div>
                    <CreateDialog 
                        handleChange={this.handleChange} 
                        handleClose={this.handleClose} 
                        errorMessage={this.state.errorMessage}
                        handleSubmit={this.handleSubmit}
                        open={this.state.createOpen} />

                    <ConfirmDialog 
                        handleChange={this.handleChange} 
                        handleClose={this.handleClose} 
                        open={this.state.confirmOpen} />
                </div>
            </Grid>
        )
    }
}