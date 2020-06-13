import React,{Component} from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal, ModalHeader, Row, Col, Label, ModalBody
  } from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseURL} from '../shared/baseURL';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

      
   
    function RenderDish({dish}) {
        if (dish != null){
            return(
                <div className='col-12 col-md-5 m-1'>
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseURL+ dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </FadeTransform>
                </div>
            )
        }
        else {
            return(
                <div></div>
            )
        }
    }


    function RenderComments({comments, postComment, dishId}) {
        
        var commentlist=comments.map(comment => {
            return(
                <div>
                <Fade in>
                 <ul key={comment.id} className="list-unstyled">
                    <li className="mb-2">{comment.comment}</li>
                    <li>
                    -- {comment.author}{" "}
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).
                    format(new Date(Date.parse(comment.date)))}</li>
                   <br></br>
                 </ul>
                 </Fade>
              </div>
            )

        })
        
        return(
            <div>             
                {commentlist}
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        )
        }


    const DishDetail = (props) => {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.errmess){
            return(
                <div className='container'>
                    <div className='row'>
                        <h4>{props.errmess}</h4>
                    </div>
                </div>
            )
        }

      else{
         return(
            <div className='container'>
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
            <div className='row'>
               <RenderDish dish={props.dish} />
               <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
                </div>
            </div>
            </div>
            )
        }
    }
    
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);


export class CommentForm extends Component{
    constructor(props) {
      super(props)
    
      this.state = {
         isModalOpen: false
      };
      this.toggleModal   = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    };

    toggleModal(){
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    
    render(){
        return(
        <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-lg fa-pencil">Submit Button</span></Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <hr className="m-0"></hr>   
                    <ModalBody className="p-0">
                             <LocalForm  onSubmit={(values)=>{this.handleSubmit(values)}}>
                                <Row className="form-group mx-0 mb-0">
                                    <Label For="rating" md={12}>Rating</Label>
                                    <Col className="mb-2" md={12}>
                                        <Control.select
                                        model=".rating" id="rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group mb-0 mx-0">
                                    <Label htmlFor="author" md={12} >Your Name</Label>
                                    <Col className="mb-2" md={12}>
                                        <Control.text model=".author" id="author"
                                        name="author" className="form-control"  validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}/>
                                    </Col>
                                    <Errors
                                        className="text-danger px-3"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Row>  
                                <Row className="form-group mb-0 mx-0">
                                        <Label htmlFor="comment" md={12}>Your feedback</Label>
                                        <Col  className="mb-2" md={12}>
                                            <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"  validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(25)
                                        }}/>
                                        </Col>
                                        <Errors
                                        className="text-danger px-3"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Row>
                                <Button type="submit" value="submit" color="primary" className="mx-3 mb-3">Submit</Button>
                            </LocalForm>
                    </ModalBody>
                </Modal>
        </div>

        )
    }
}
export default DishDetail;