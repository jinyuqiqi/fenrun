import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { Base64 } from 'js-base64';
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
			billPageList: [],
			leftMenuList: []
		}
		
		let { leftMenuList, billPageList } = this.state
		let myAuthMenu = JSON.parse(Base64.decode(window.sessionStorage.getItem('myAuthMenu')))
		let billAuth = myAuthMenu.filter(item => item.menuId === 3)
		billAuth[0].children.forEach(item=> {
			if(item.menuId===16){
				billPageList.push({
					path: '/index/billingcenter/salesbill',
					component: SalesBill,
					key: item.menuId
				})
				billPageList.push({
					path: '/index/billingcenter/salebillinfo',
					component: SaleBillInfo,
					key: item.menuId+100
				})
				leftMenuList.push({
					path: '/index/billingcenter/salesbill',
					title: '销售订单',
					key: item.menuId,
				})
			}
			if(item.menuId===17){
				billPageList.push({
					path: '/index/billingcenter/businessbill',
					component: BusinessBill,
					key: item.menuId
				})
				leftMenuList.push({
					path: '/index/billingcenter/businessbill',
					title: '业务订单',
					key: item.menuId,
				})
			}
			if(item.menuId===18){
				billPageList.push({
					path: '/index/billingcenter/flowingwater',
					component: FlowingWater,
					key: item.menuId
				})
				leftMenuList.push({
					path: '/index/billingcenter/flowingwater',
					title: '资金流水',
					key: item.menuId,
				})
			}
		})
		this.state.leftMenuList = leftMenuList
		this.state.billPageList = billPageList
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
							{
								this.state.billPageList.map(item=> {
									return (<Route path={item.path} component={item.component} key={item.key} />)
								})
							}
							
							<Redirect to={this.state.billPageList[0].path}  />
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

