import React, { Component } from 'react';
import {  NavLink } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import './index.css';

function itemRender(route, params, routes, paths) {
  return route.path ? (
    <NavLink to={route.path}>{route.title}</NavLink>
  ) : (
    <span>{route.title}</span>
  )
}

export default class BreadCrumb extends Component{
    render(){
        return(
            <div className={`bread_wrap ${this.props.isRight ? 'bread_right' : ''}`}>
				<Breadcrumb itemRender={itemRender} routes={this.props.breadcrumbs} />
            </div>  
        )
    }
}