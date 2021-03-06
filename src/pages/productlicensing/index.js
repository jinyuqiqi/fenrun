import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { Spin } from 'antd';
import { Base64 } from 'js-base64';
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

export default class ProductLicensing extends Component{
	constructor(props){
        super(props);
		this.state = {
			path: null,
			productPageList: [],
			leftMenuList: []
		}
		let productAuthInfo = {}
		let { leftMenuList, productPageList } = this.state
		let myAuthMenu = JSON.parse(Base64.decode(window.sessionStorage.getItem('myAuthMenu')))
		let productAuth = myAuthMenu.filter(item => item.menuId === 2)
		productAuth[0].children.forEach(item=> {
			if(item.menuId===7){
				productPageList.push({
					path: '/index/productlicensing/authorizations',
					component: Authorizations,
					key: item.menuId
				})
				leftMenuList.push({
					path: '/index/productlicensing/authorizations',
					title: '授权管理',
					key: item.menuId,
				})
				item.children.forEach(value=> {
					if(value.menuId===8){
						productAuthInfo['viewa'] = true
						productPageList.push({
							path: '/index/productlicensing/inaudit',
							component: InAudit,
							key: value.menuId
						})
					}
					if(value.menuId===10){
						productAuthInfo['impower'] = true
						productPageList.push({
							path: '/index/productlicensing/authorizationsteps',
							component: AuthorizationSteps,
							key: value.menuId
						})
						productPageList.push({
							path: '/index/productlicensing/authorizationstepsl',
							component: AuthorizationStepsl,
							key: value.menuId
						})
					}
				})
			}
			if(item.menuId===11){
				productPageList.push({
					path: '/index/productlicensing/customer',
					component: Customer,
					key: item.menuId
				})
				leftMenuList.push({
					path: '/index/productlicensing/customer',
					title: '客户管理',
					key: item.menuId,
				})
				item.children.forEach(value=> {
					if(value.menuId===12){
						productAuthInfo['viewc'] = true
						productPageList.push({
							path: '/index/productlicensing/customerinfo',
							component: CustomerInfo,
							key: value.menuId
						})
					}
					if(value.menuId===13){
						productAuthInfo['addcustomer'] = true
					}
					if(value.menuId===14){
						productAuthInfo['delparking'] = true
					}
					if(value.menuId===15){
						productAuthInfo['addparking'] = true
					}
				})
			}
		})
		let productAuths = Base64.encode(JSON.stringify(productAuthInfo))
		window.sessionStorage.setItem('productAuths', productAuths)
		this.state.leftMenuList = leftMenuList
		this.state.productPageList = productPageList
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
						{
							this.state.productPageList.map(item=> {
								return (<Route path={item.path} auth={{id: 'lsafkan'}} key={item.key} component={item.component} />)
							})
						}
						{/*<Route path='/index/productlicensing/authorizations' component={Authorizations} />
						<Route path='/index/productlicensing/customer' component={Customer} />
						<Route path='/index/productlicensing/customerinfo' component={CustomerInfo} />
						<Route path='/index/productlicensing/inaudit' component={InAudit} />
						<Route path='/index/productlicensing/authorizationsteps' component={AuthorizationSteps} />
						<Route path='/index/productlicensing/authorizationstepsl' component={AuthorizationStepsl} />*/}
						<Redirect to={this.state.productPageList[0].path} auth={{id: 'lsafkan'}}  />
					</Switch>
				</div>
            </div>  
        )
    }
}
