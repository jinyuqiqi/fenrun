import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BreadCrumb from '@/components/breadcrumb';
import LeftNavMenu from '@/components/leftNavMenu';
import Loadable from '@/components/loadable';
import './index.css';

const SalesBill = Loadable(()=> import('@/pages/billingcenter/salesbill'));
const BusinessBill = Loadable(()=> import('@/pages/billingcenter/businessbill'));
const FlowingWater = Loadable(()=> import('@/pages/billingcenter/flowingwater'));
const SaleBillInfo = Loadable(()=> import('@/pages/billingcenter/salebillinfo'));


class BillingCenter extends Component{
	constructor(props){
        super(props);
		this.state = {
			path: null,
			loading: true,
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
		this.state.path = this.props.location.pathname
    }
	
	static propTypes = {
		loading: PropTypes.bool,
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
							<Route path='/index/billingcenter/salesbill' component={SalesBill} />
							<Route path='/index/billingcenter/businessbill' component={BusinessBill} />
							<Route path='/index/billingcenter/flowingwater' component={FlowingWater} />
							<Route path='/index/billingcenter/salebillinfo' component={SaleBillInfo} />
							<Redirect to='/index/billingcenter/salesbill'  />
						</Switch>
					</Spin>
				</div>
            </div>  
        )
    }
}

export default connect(state => ({
	loading: state.storeState.loading,
 }), null)(BillingCenter);

