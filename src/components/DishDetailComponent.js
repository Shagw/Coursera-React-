import React, {Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardImgOverlay
  } from 'reactstrap';

  class DishDetail extends Component{
      
   
    renderDish(dish){
        if (dish != null){
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else {
            return(
                <div></div>
            )
        }
    }


    renderComments(comments) {
        if (comments != null) {
          return comments.map(comment => (
            <ul key={comment.id} className="list-unstyled">
              <li className="mb-2">{comment.comment}</li>
              <li>
                -- {comment.author}{" "}
                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}              </li>
            </ul>
          ));
        } else return <div />;
      }


        

render(){
    const {dish} = this.props

    return(
        <div className='row'>
            <div className='col-12 col-md-5 m-1'>
               {this.renderDish(dish)}
            </div>

            <div className='col-12 col-md-5 m-1'>
                <h4>Comments</h4>
                {this.renderComments(dish.comments)}
            </div>
        </div>
        )

    }

}

export default DishDetail;