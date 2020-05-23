import React, {Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardImgOverlay
  } from 'reactstrap';
import DishDetail from './DishDetailComponent'

class Menu extends Component{
    constructor(props){
        super(props);
 
        this.state={
                selectedDish:null
        }

    }

    onDishSelect(dish){
        this.setState({selectedDish:dish}) 
    }
    
    renderDish(dish){
      if(dish!=null) return <DishDetail dish={dish} />
      else return <div />
      }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card onClick={()=>this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay body className="ml-5">
                    <CardTitle heading>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        }
    );

        return (
          <div className="container">
            <div className="row">
                  {menu}
            </div>
            {this.renderDish(this.state.selectedDish)}
          </div>
        );
    }
}

export default Menu;