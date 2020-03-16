import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Base64 } from 'js-base64';
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
			leftMenuList: [],
			basePageList: []
		}
		let { leftMenuList, basePageList } = this.state
		let baseAuth = {}
		let myAuthMenu = JSON.parse(Base64.decode(window.sessionStorage.getItem('myAuthMenu')))
		let baseAuthList = myAuthMenu.filter(item => item.menuId === 5)
		baseAuthList[0].children.forEach(item=> {
			if(item.menuId===27){
				leftMenuList.push({
					path: '/index/basicsetting/roles',
					title: '角色管理',
					key: item.menuId,
				})
				basePageList.push({
					path: '/index/basicsetting/roles',
					component: Roles,
					key: item.menuId
				})
				item.children.forEach(value=> {
					if(value.menuId===30){
						baseAuth["addrole"] = true
						basePageList.push({
							path: '/index/basicsetting/addingrole',
							component: AddingRole,
							key: value.menuId
						})
					}
					if(value.menuId===31){
						baseAuth["updaterole"] = true
					}
					if(value.menuId===32){
						baseAuth["delrole"] = true
					}
				})
			}
			if(item.menuId===28){
				leftMenuList.push({
					path: '/index/basicsetting/staff',
					title: '人员管理',
					key: item.menuId,
				})
				basePageList.push({
					path: '/index/basicsetting/staff',
					component: Staff,
					key: item.menuId
				})
				item.children.forEach(value=> {
					if(value.menuId===34){
						baseAuth["addstaff"] = true
					}
					if(value.menuId===35){
						baseAuth["updatestaff"] = true
					}
					if(value.menuId===36){
						baseAuth["delstaff"] = true
					}
				})
			}
		})
		let baseAuthInfo = Base64.encode(JSON.stringify(baseAuth))
		window.sessionStorage.setItem('baseAuthInfo', baseAuthInfo)
		this.state.leftMenuList = leftMenuList
		this.state.basePageList = basePageList
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
							this.state.basePageList.map(item=> {
								return (
									<Route path={item.path} component={item.component} key={item.key} />
								)
							})
						}
						<Redirect to={this.state.basePageList[0].path}  />
					</Switch>
				</div>
            </div>  
        )
    }
}