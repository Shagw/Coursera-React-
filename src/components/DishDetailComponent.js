import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
  } from 'reactstrap';


      
   
    function RenderDish({dish}) {
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


    function RenderComments({comments}) {
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

    const DishDetail = (props) => {

      
         return(
            <div className='container'>
            <div className='row'>
               <RenderDish dish={props.dish} />
               <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <RenderComments comments={props.dish.comments}/>
                </div>
            </div>
            </div>
            )
        }
    
export default DishDetail;