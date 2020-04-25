import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {login,home,assemble,classification,cart,user} from './assembly'

export default class Router extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={login} />
          <Route path="/" render={(props)=>{
            const isAuth=localStorage.getItem('user')
            return isAuth ?
            ( 
              <Switch>
                <Route path="/home" component={home} />
                <Route path="/assemble" component={assemble} />
                <Route path="/classification" component={classification} />
                <Route path="/cart" component={cart} />
                <Route path="/user" component={user} />
                <Redirect exact from="/" to="/home" />
              </Switch>
            ):<Redirect to="/login" />
          }} />
        </Switch>
      </BrowserRouter>
    )
  }
}
