import React, { Component } from "react";
import { Grid, Col } from "react-bootstrap";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { ItemCard } from "../components/ItemCard";
import { CreateItemDialog, ConfirmDialog } from "../components/Dialogs";

import instance from "../utils/axiosInstance";

export default class ItemContainer extends Component {
    state = {
        bucketlists: [],
        name: "",
        description: "",
        title: "Add new Item",
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
        const {name} = this.state;

        if(name === ""){
            this.setState({
                errorMessage: "inputs cannot be empty"
            })
        }
        else {
            instance.request({
                url: this.props.location.pathname,
                method: "POST",
                data: {
                    name,
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
        const {name} = this.state;

        if(name === ""){
            this.setState({
                errorMessage: "inputs cannot be empty"
            })
        }
        else {
            instance.request({
                
                url: this.props.location.pathname +"/"+ this.state.itemId  ,
                method: "PUT",
                data: {
                    name
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
            url: this.props.location.pathname+"/"+this.state.itemId,
            method: "DELETE",
        }).then((response) => {
            if(response.data.status === "success"){
                // get bucketlists again
                this.fetchBucketlists();

                // close the modal
                this.setState({
                    confirmOpen: false,
                    errorMessage: "",
                    itemId: ""
                })
            }
        }).catch((error) => {
            this.setState({
                errorMessage: error.response.data.message
            })
        })
    }

    handleOpen = (dialogType, itemId) => {
        // check type of dialog to be opened
        if (dialogType === "create-dialog" && itemId === undefined) {
            // open add new item dialog
            this.setState({
              createOpen: true,
              itemId: "",
              name: "",
              editing: false
            });
        }
        else if (dialogType === "create-dialog" && itemId !== undefined) {
          const bucket = this.state.bucketlists.filter((bucket) => bucket.id === parseInt(itemId))[0];
          if (bucket) {
            // open dialog as edit
            this.setState({
                createOpen: true,
                itemId: itemId,
                name: bucket.name,
                description: bucket.description || "",
                editing: true,
                title: `Edit bucketlist ${bucket.name}`
             });
          }

        }
        else {
            // open confirmation dialog
            this.setState({
              confirmOpen: true,
              itemId: itemId
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
                itemId: ""
            });
        }
    }

    componentWillMount() {
        this.fetchBucketlists();
    }

    fetchBucketlists = () => {
        instance.request({
            url: this.props.location.pathname,
            method: "GET",
        }).then((response) => {
            this.setState({
                bucketlists: response.data
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
                <Col lg={12} className="floating-btn">
                    <FloatingActionButton style={style} onClick={() => this.handleOpen("create-dialog")}>
                        <ContentAdd />
                    </FloatingActionButton>
                </Col>
                <Col lg={12}>
                    {this.state.bucketlists.length > 0 && this.state.bucketlists.map((bucket, index) => (
                        <ItemCard
                            handleOpen={this.handleOpen}
                            key={index}
                            {...bucket} />
                    ))}
                </Col>
                {/* dashboard dialogs container */}
                <div>
                    <CreateItemDialog
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
                        actionMessage="Are you sure you want to delete the item?"
                        open={this.state.confirmOpen} />
                </div>
            </Grid>
        )
    }
}
