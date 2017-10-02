import React, { Component } from "react";
import { Grid, Col } from "react-bootstrap";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Pagination from 'material-ui-pagination';

import { BucketListCard } from "../components/BucketListCard";
import { CreateDialog, ConfirmDialog } from "../components/Dialogs";
import { browserHistory } from 'react-router';
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
        errorMessage: "",
    }

    setTotal = (event, total) => {
      // eslint-disable-next-line no-param-reassign
      total = total.trim();
      if (total.match(/^\d*$/)) {
        if (total !== '') {
          // eslint-disable-next-line no-param-reassign
          total = parseInt(total, 10);
        } else {
          // eslint-disable-next-line no-param-reassign
          total = 0;
        }

        this.setState({ total });
      }
    }

    setDisplay = (event, display) => {
      // eslint-disable-next-line no-param-reassign
      display = display.trim();
      if (display.match(/^\d*$/)) {
        if (display !== '') {
          // eslint-disable-next-line no-param-reassign
          display = parseInt(display, 10);
        } else {
          // eslint-disable-next-line no-param-reassign
          display = 0;
        }

        this.setState({ display });
      }
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

    redirectTo = (bucket_id, bucket_title) =>{
        // event.preventDefault();
        browserHistory.push({
                           pathname: "/bucketlists/" + bucket_id +"/items/",
                           state: { title: bucket_title }
                       });
      }

    componentWillMount() {
        this.fetchBucketlists();
    }

    fetchBucketlists = (nextPage = 1) => {
        instance.request({
            url: `/bucketlists?page=${nextPage}`,
            method: "GET",
        }).then((response) => {
            this.setState({
                bucketlists: response.data.bucketlist,
                total: response.data.meta.total_pages,
                display: response.data.meta.total_pages,
                number: nextPage
            })
        }).catch((error) => {
            this.setState({
                errorMessage: error.response.data.message
            })
        });

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
                            redirect={this.redirectTo}
                            key={index}
                            {...bucket}
                            />
                    ))}
                </Col>
                <Col>
                  <Pagination
                    total = { this.state.total }
                    current = { this.state.number }
                    display = { this.state.display }
                    onChange = { number => this.fetchBucketlists(number) }
                  />
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
