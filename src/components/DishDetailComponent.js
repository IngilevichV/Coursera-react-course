import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {
    renderDish(dish) {
        if (this.props.dish != null)
            return(
                <Card>
                    <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    renderComments(dish) {
        const monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ];
        if (this.props.dish != null) {
            const comment = this.props.dish.comments.map((comment)=>{
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
                <div className="comment" key={dish.id}>
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

    render () {
        return(
            <div className="container">
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish)}
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;