import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { Spin } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import LeftNavMenu from '@/components/leftNavMenu';
import Loadable from '@/components/loadable';
import './index.css';

const Customer = Loadable(()=> import('@/pages/productlicensing/customer'));
const Authorizations = Loadable(()=> import('@/pages/productlicensing/authorizations'));
const AuthorizationSteps = Loadable(()=> import('@/pages/productlicensing/authorizationsteps'));
const AuthorizationStepsl = Loadable(()=> import('@/pages/productlicensing/authorizationstepsl'));
const InAudit = Loadable(()=> import('@/pages/productlicensing/inaudit'));
const CustomerInfo = Loadable(()=> import('@/pages/productlicensing/customerinfo'));
const AuditSuccess = Loadable(()=> import('@/pages/productlicensing/auditsuccess'));

export default class ProductLicensing extends Component{
	constructor(props){
        super(props);
		this.state = {
			path: null,
			leftMenuList: [
				{
					path: '/index/productlicensing/authorizations',
					title: '授权管理',
					key: '1',
				},
				{
					path: '/index/productlicensing/customer',
					title: '客户管理',
					key: '2',
				}
			]
		}
    }
	
	componentWillMount(){
		this.listenRouteChange(this.props.location.pathname)
	}
	
	componentWillReceiveProps(nextProps) {
	    if (nextProps.location.pathname !== this.props.location.pathname) {
			this.listenRouteChange(nextProps.location.pathname)
	    } 
	}

	componentDidMount(){
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
						<Route path='/index/productlicensing/authorizations' component={Authorizations} />
						<Route path='/index/productlicensing/customer' component={Customer} />
						<Route path='/index/productlicensing/customerinfo' component={CustomerInfo} />
						<Route path='/index/productlicensing/inaudit' component={InAudit} />
						<Route path='/index/productlicensing/auditsuccess' component={AuditSuccess} />
						<Route path='/index/productlicensing/authorizationsteps' component={AuthorizationSteps} />
						<Route path='/index/productlicensing/authorizationstepsl' component={AuthorizationStepsl} />
						<Redirect to='/index/productlicensing/authorizations'  />
					</Switch>
				</div>
            </div>  
        )
    }
}
