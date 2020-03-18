import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import LeftNavMenu from '@/components/leftNavMenu';
import Loadable from '@/components/loadable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';

const Customer = Loadable(()=> import('@/pages/productlicensing/customer'));
const Authorizations = Loadable(()=> import('@/pages/productlicensing/authorizations'));
const AuthorizationSteps = Loadable(()=> import('@/pages/productlicensing/authorizationsteps'));
const InAudit = Loadable(()=> import('@/pages/productlicensing/inaudit'));
// const InAudit = Loadable(()=> import('@/pages/billingcenter/salebillinfo'));
const AuditSuccess = Loadable(()=> import('@/pages/productlicensing/auditsuccess'));

class ProductLicensing extends Component{
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
	
	static propTypes = {
		loading: PropTypes.bool,
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
					<Spin spinning={this.props.loading}>
						<Switch>
							<Route path='/index/productlicensing/authorizations' component={Authorizations} />
							<Route path='/index/productlicensing/customer' component={Customer} />
							<Route path='/index/productlicensing/inaudit' component={InAudit} />
							<Route path='/index/productlicensing/auditsuccess' component={AuditSuccess} />
							<Route path='/index/productlicensing/authorizationsteps' component={AuthorizationSteps} />
							<Redirect to='/index/productlicensing/authorizations'  />
						</Switch>
					</Spin>
				</div>
            </div>  
        )
    }
}


export default connect(state => ({
	loading: state.storeState.loading,
 }), null)(ProductLicensing);