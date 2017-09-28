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
        title: "Add a new bucket list",
        editing: false,
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
                url: `/bucketlists/${this.state.bucket_id}`,
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

        instance.request({
            url: `/bucketlists/${this.state.bucket_id}`,
            method: "DELETE",
        }).then((response) => {
            if(response.data.status === "success"){
                // get bucketlists again
                this.fetchBucketlists();

                // close the modal
                this.setState({
                    confirmOpen: false,
                    errorMessage: "",
                    bucket_id: ""
                })
            }
        }).catch((error) => {
            this.setState({
                errorMessage: error.response.data.message
            })
        })
    }

    handleOpen = (dialogType, bucket_id) => {
        // check type of dialog to be opened
        if (dialogType === "create-dialog" && bucket_id === undefined) {
            // open add new bucket dialog
            this.setState({
              createOpen: true,
              bucket_id: "",
              name: "",
              description: "",
              editing: false
            });
        }
        else if (dialogType === "create-dialog" && bucket_id !== undefined) {
          const bucket = this.state.bucketlists.filter((bucket) => bucket.bucketlistId === parseInt(bucket_id))[0];
          if (bucket) {
            // open dialog as edit
            this.setState({
                createOpen: true,
                bucket_id: bucket_id,
                name: bucket.name,
                description: bucket.description || "",
                editing: true,
                title: `Edit bucketlist ${bucket.name}`
             });
          }

        }
        else {
          console.log(bucket_id)
            // open confirmation dialog
            this.setState({
              confirmOpen: true,
              bucket_id: bucket_id
            });
        }
    }

    handleClose = (dialogType) => {
        // check type of dialog to be closed
        if (dialogType === "create-dialog") {
            // close add new bucket dialog
            this.setState({
                createOpen: false,
                errorMessage: "",
                title: "Add a new bucketlist"
            });
        }
        else {
            // close confirmation dialog
            this.setState({
                confirmOpen: false,
                errorMessage: "",
                bucket_id: ""
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
                <h3 className="text-lead lead text-center">Welcome to your dashboard</h3>
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
                        handleEdit={this.handleEdit}
                        {...this.state}
                    />

                    <ConfirmDialog
                        handleChange={this.handleChange}
                        handleClose={this.handleClose}
                        handleDelete={this.handleDelete}
                        actionMessage="Are you sure you want to delete the bucketlist?"
                        open={this.state.confirmOpen} />
                </div>
            </Grid>
        )
    }
}
