import React, { Component } from "react";
import { Grid, Col } from "react-bootstrap";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { BucketListCard } from "../components/BucketListCard";
import { CreateDialog, ConfirmDialog } from "../components/Dialogs";

import instance from "../utils/axiosInstance";

export default class DashBoardContainer extends Component {
    state = {
        bucketlists: [],
        name: "",
        description: "",
        confirmOpen: false,
        createOpen: false,
        title: "Add a new bucket list",
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

    handleEdit = (event) => {
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
                method: "PUT",
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

    handleDelete = (event) => {
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
                method: "DELETE",
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

    handleOpen = (dialogType, bucket_id) => {
        // check type of dialog to be opened
        if (dialogType === "create-dialog" && bucket_id === "") {
            // open add new bucket dialog
            this.setState({
              createOpen: true,
              bucket_id: "",
              name: "",
              description: "",
              editing: false
            });
        }
        else if (bucket_id !== "") {
          const bucket = this.state.bucketlists.filter((bucket) => bucket.id === bucket_id);
          if (bucket) {
            // open dialog as edit
            this.setState({
                createOpen: true,
                bucket_id: bucket_id,
                name: bucket.name,
                description: bucket.description,
                editing: true
             });
          }

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
                            handleOpen={this.handleOpen}
                            key={index}
                            {...bucket} />
                    ))}
                </Col>
                {/* dashboard dialogs container */}
                <div>
                    <CreateDialog
                        handleChange={this.handleChange}
                        handleClose={this.handleClose}
                        handleSubmit={this.handleSubmit}
                        {...this.state}
                    />

                    <ConfirmDialog
                        handleChange={this.handleChange}
                        handleClose={this.handleClose}
                        open={this.state.confirmOpen} />
                </div>
            </Grid>
        )
    }
}
