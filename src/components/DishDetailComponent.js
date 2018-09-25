import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import {Link} from "react-router-dom";
import {Control, LocalForm, Errors} from "react-redux-form";


const required =  (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        // alert(JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.yourname, values.message)
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Submit comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <div className="container">
                        <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={this.handleSubmit}>
                                <Row className="form-group">
                                    <Label htmlFor="rating"> Rating</Label>
                                    <Control.select model=".rating" id="rating" type="text" name="rating" className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="yourname"> Your name</Label>
                                    <Control.text model=".yourname" id="yourname" name="yourname" className="form-control"
                                                  validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                                    <Errors className="text-danger" model=".yourname" show="touched"
                                            messages ={{
                                                required: "Required",
                                                minLength: "Must be greater than 3 characters",
                                                maxLength: "Must be 15 characters or less"
                                            }}/>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="message">Comment</Label>
                                    <Control.textarea model=".message" type="textarea" id="message" name="message"
                                                      rows={6}
                                                      className="form-control"/>

                                </Row>
                                <Button type="submit" value="submit" className="primary">Submit</Button>
                            </LocalForm>
                    </ModalBody>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

function RenderDish(props) {
    if (props.dish != null)
        return(
            <Card>
                <CardImg top src={props.dish.image} alt={props.dish.name} />
                <CardBody>
                    <CardTitle>{props.dish.name}</CardTitle>
                    <CardText>{props.dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div/>
        );
}

function RenderComments(comments) {
    const monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];
    if (comments != null) {
        const comment = comments["dish"].map((comment)=>{
            let date = new Date(comment.date);
            let dateFormat = monthNames[date.getMonth()] + " " + date.getDate() + "," + date.getFullYear();
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {dateFormat}</p>
                </li>

            )
        })

        return (
            <div className="comment">
                <h4>Comments</h4>
                <ul className={"list-unstyled"}>{comment}</ul>
                <CommentForm dishId={comments["dishId"]} addComment={comments["addComment"]}/>
            </div>
        )
    } else {
        return (
            <div/>
        );
    }
}

const DishDetail = (props) => {
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                </div>
                <div  className="col-12 col-md-5 m-1">
                    <RenderComments dish={props.comment}
                    addComment = {props.addComment}
                    dishId={props.dish.id}/>
                </div>
            </div>
        </div>
    );
};

export default DishDetail;