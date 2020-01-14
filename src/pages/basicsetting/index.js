import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LeftNavMenu from '@/components/leftNavMenu';
import Loadable from '@/components/loadable';
import './index.css';

const Roles = Loadable(()=> import('@/pages/basicsetting/roles'));
const Staff = Loadable(()=> import('@/pages/basicsetting/staff'));
const AddingRole = Loadable(()=> import('@/pages/basicsetting/addingrole'));


export default class ProductLicensing extends Component{
	constructor(props){
        super(props);
		this.state = {
			path: null, 
			leftMenuList: [
				{
					path: '/index/basicsetting/roles',
					title: '角色管理',
					key: '1',
				},
				{
					path: '/index/basicsetting/staff',
					title: '人员管理',
					key: '2',
				}
			]
		}
		
		// console.log(props.location.pathname.substr())
    }
	
	componentWillMount(){
		this.listenRouteChange(this.props.location.pathname)
	}
	
	componentWillReceiveProps(nextProps) {
		console.log(this.props)
		console.log(nextProps)
	    if (nextProps.location.pathname !== this.props.location.pathname) {
			this.listenRouteChange(nextProps.location.pathname)
			
	    } 
	}

	componentDidMount(){
		console.log('mount')
	}
	
	listenRouteChange(pathname){
		this.setState({
			path: pathname
		})
	}
	
    render(){
        return(
            <div className="container_parent flex_box">
				<LeftNavMenu
					path={this.state.path}
					leftMenuList={this.state.leftMenuList}></LeftNavMenu>
				<div className="right_content">
					<Switch>
						<Route path='/index/basicsetting/roles' component={Roles} />
						<Route path='/index/basicsetting/staff' component={Staff} />
						<Route path='/index/basicsetting/addingrole' component={AddingRole} />
						<Redirect to='/index/basicsetting/roles'  />
					</Switch>
				</div>
            </div>  
        )
    }
}