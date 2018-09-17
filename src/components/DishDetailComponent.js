import React from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from "react-router-dom";


function RenderDish(props) {
    console.info(props);
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
            <div></div>
        );
}

function RenderComments(comments) {
    console.info(comments["dish"]);
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
            </div>
        )
    } else {
        return (
            <div></div>
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
                    <RenderComments dish={props.comment}/>
                </div>
            </div>
        </div>
    );
}

export default DishDetail;