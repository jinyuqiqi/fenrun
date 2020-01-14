import React, { Component } from 'react';
import {  NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import './index.css';

export default class LeftNavMenu extends Component{
	constructor(props){
        super(props);
		this.state = {
			// path: '/index/productlicensing/authorizations',
		}
    }

	componentDidMount(){
		console.log('mount')
	}
	

    render(){
        return(
			<div className="asideNav">
				<Menu
				  defaultSelectedKeys={[this.props.path]}
				  selectedKeys={[this.props.path]}
				  mode="vertical"
				  theme="dark"
				>
				  {
				  	this.props.leftMenuList.map((item, index)=> {
				  		return (
				  			<Menu.Item key={item.path}>
				  				<NavLink to={item.path}>
				  					<span>
				  						{item.title}
				  					</span>
				  				</NavLink>
				  			</Menu.Item>
				  		)
				  	})
				  }
				  {/*
				  <Menu.Item key="1">
				  					<span>Option 1</span>
				  </Menu.Item>
				  <Menu.Item key="2">
				  					<span>Option 2</span>
				  </Menu.Item>
				  <Menu.Item key="3">
				  					<span>Option 3</span>
				  </Menu.Item>
				  */}
				</Menu>
			</div>
        )
    }
}