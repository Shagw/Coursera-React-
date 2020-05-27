import React, { Component } from 'react';
import Menu from './MenuComponents';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent'
import Header from './Header'
import Footer from './Footer'
import { DISHES } from '../shared/dishes';
import {Switch, Route, Redirect} from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
    };
  }


  //  renderDish(dish){
  //     if(dish!=null) return <DishDetail dish=
  //     {this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
  //     else return <div />
  //     }

  render() {
    
    const HomePage=()=>{
      return(
        <Home />
      )
    }
    
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path ="/menu" component={()=> <Menu dishes={this.state.dishes}/> }/>
          <Redirect to="/home" />
        </Switch>
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        {this.renderDish(this.state.selectedDish)} */}
        <Footer />
      </div>
    );
  }
}

export default Main;