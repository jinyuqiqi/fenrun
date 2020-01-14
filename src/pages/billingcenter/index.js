import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import BreadCrumb from '@/components/breadcrumb';
import LeftNavMenu from '@/components/leftNavMenu';
import Loadable from '@/components/loadable';
import './index.css';

const SalesBill = Loadable(()=> import('@/pages/billingcenter/salesbill'));
const BusinessBill = Loadable(()=> import('@/pages/billingcenter/businessbill'));
const FlowingWater = Loadable(()=> import('@/pages/billingcenter/flowingwater'));

export default class BillingCenter extends Component{
	constructor(props){
        super(props);
		this.state = {
			path: null,
			leftMenuList: [
				{
					path: '/index/billingcenter/salesbill',
					title: '销售订单',
				},
				{
					path: '/index/billingcenter/businessbill',
					title: '业务订单',
				},
				{
					path: '/index/billingcenter/flowingwater',
					title: '资金流水',
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
						<Route path='/index/billingcenter/salesbill' component={SalesBill} />
						<Route path='/index/billingcenter/businessbill' component={BusinessBill} />
						<Route path='/index/billingcenter/flowingwater' component={FlowingWater} />
						<Redirect to='/index/billingcenter/salesbill'  />
					</Switch>
				</div>
            </div>  
        )
    }
}