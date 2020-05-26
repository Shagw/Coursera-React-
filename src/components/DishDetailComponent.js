import React, {Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
  } from 'reactstrap';

  class DishDetail extends Component{
      
   
    renderDish(dish){
        if (dish != null){
            return(
                <div className='col-12 col-md-5 m-1'>

                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
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
          let options = { year: "numeric", month: "short", day: "numeric" };
          return comments.map(comment => (
            <ul key={comment.id} className="list-unstyled">
              <li className="mb-2">{comment.comment}</li>
              <li>
                -- {comment.author}{" "}
                {new Date(comment.date).toLocaleDateString("en-US", options)}
              </li>
            </ul>
          ));
        } else return <div />;
      }


        

render(){
    const {dish} = this.props

    return(
    <div className='container'>
        <div className='row'>
               {this.renderDish(dish)}
            <div className='col-12 col-md-5 m-1'>
                <h4>Comments</h4>
                {this.renderComments(dish.comments)}
            </div>
        </div>
    </div>
        )

    }

}

export default DishDetail;