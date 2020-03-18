import React, { Component } from 'react';
import Loadable from '@/components/loadable';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
 import { Base64 } from 'js-base64';
import TopNavigationBar from '@/components/topNavMenu';
import './index.css';
const { Content } = Layout;
const WorkBench = Loadable(()=> import('@/pages/workbench'));
const ProductLicensing = Loadable(()=> import('@/pages/productlicensing'));
const ProjectContractor = Loadable(()=> import('@/pages/projectcontractor'));
const BillingCenter = Loadable(()=> import('@/pages/billingcenter'));
const BasicSetting = Loadable(()=> import('@/pages/basicsetting'));
const ResetPassword = Loadable(() => import('@/pages/resetpassword'));
const Audit = Loadable(()=> import('@/pages/workbench/audit'));
const AuditContent = Loadable(()=> import('@/pages/workbench/auditcontent'));
const Withdraw = Loadable(()=> import('@/pages/workbench/withdraw'));
const Record = Loadable(()=> import('@/pages/workbench/record'));
const BankCard = Loadable(()=> import('@/pages/workbench/bankcard'));


export default class Index extends Component{
	constructor(props){
        super(props);
		this.state = {
			path: null,
			logoText: '麦泊工程商管理',
			menuList: [],
			workbenchAuthList: []
		}
		
    }
	
	componentWillMount(){
		const that = this
		let myAuthMenu = JSON.parse(Base64.decode(window.sessionStorage.getItem('myAuthMenu')))
		let menuList = myAuthMenu.map(item=> {
			let menuItem = {
				menuId: item.menuId,
				title: item.menuName,
				key: item.menuId,
			}
			switch(item.menuId){
				case 1:
					menuItem['path'] = '/index/workbench';
					menuItem['icon'] = require('@/image/111.png');
					menuItem['component'] = WorkBench;
					break;
				case 2:
					menuItem['path'] = '/index/productlicensing';
					menuItem['icon'] = require('@/image/222.png');
					menuItem['component'] = ProductLicensing;
					break;
				case 3:
					menuItem['path'] = '/index/billingcenter';
					menuItem['icon'] = require('@/image/333.png');
					menuItem['component'] = BillingCenter;
					break;
				case 4:
					menuItem['path'] = '/index/projectcontractor';
					menuItem['icon'] = require('@/image/444.png');
					menuItem['component'] = ProjectContractor;
					break;
				case 5:
					menuItem['path'] = '/index/basicsetting';
					menuItem['icon'] = require('@/image/555.png');
					menuItem['component'] = BasicSetting;
					break;
			}
			return menuItem
		})
		this.setState({
			menuList
		}, ()=>{
			that.listenRouteChange(that.props.location.pathname)
		})
		let workbenchAuth = myAuthMenu.filter(item => item.menuId === 1)
		if(workbenchAuth.length){
			let workbenchAuthList = []
			workbenchAuth[0].children.forEach(item=> {
				if(item.menuId===46&&item.children.length){
					workbenchAuthList.push({
						path: '/index/workbench/audit',
						component: Audit
					})
					workbenchAuthList.push({
						path: '/index/workbench/auditcontent',
						component: AuditContent
					})
				}
				if(item.menuId===39&&item.children.length){
					let _w = {
						path: '/index/workbench/withdraw',
						component: Withdraw
					}
					let _l = {
						path: '/index/workbench/record',
						component: Record
					}
					if(item.children.length===1){
						if(item.children[0].menuId===42) {
							workbenchAuthList.push(_w)
						}else{
							workbenchAuthList.push(_l)
						}
					}else{
						workbenchAuthList.push(_w)
						workbenchAuthList.push(_l)
					}
				}
				if(item.menuId===40&&item.children.length){
					workbenchAuthList.push({
						path: '/index/workbench/bankcard',
						component: BankCard
					})
				}
			})
			that.setState({
				workbenchAuthList
			})
		}
	}
	
	componentWillReceiveProps(nextProps) {
	    if (nextProps.location.pathname !== this.props.location.pathname) {
			this.listenRouteChange(nextProps.location.pathname)
	    } 
	}

	componentDidMount(){
	}
	
	listenRouteChange(pathname){
		let notTopMenu = true
		this.state.menuList.forEach(item=> {
			if(pathname.includes(item.path)){
				this.setState({
					path: item.path
				})
				notTopMenu = false
			}
			if(pathname==='/index'){
				this.setState({
					path: '/index/workbench'
				})
				notTopMenu = false
			}
		})
		if(notTopMenu){
			this.setState({
				path: '/index/resetpassword'
			})
		}
	}

    render(){
        return(
            <Layout className="Layout">
				<TopNavigationBar
					history={this.props.history}
					path={this.state.path}
					menuList={this.state.menuList}></TopNavigationBar>
				<Content>
				    <Switch>
						{
							this.state.menuList.map((item, index)=> {
								return index===0 ? (
									<Route path={item.path} key={item.menuId} exact component={item.component} />
								) : (
									<Route path={item.path} key={item.menuId} component={item.component} />
								)
							})
						}
				        {/*<Route path='/index/workbench' exact component={WorkBench} />
				        <Route path='/index/productlicensing' component={ProductLicensing} />
						<Route path='/index/projectcontractor' component={ProjectContractor} />
						<Route path='/index/billingcenter' component={BillingCenter} />
						<Route path='/index/basicsetting' component={BasicSetting} />*/}
						{
							this.state.workbenchAuthList.map((item, index)=> {
								return (
									<Route path={item.path} key={item.path} component={item.component} />
								)
							})
						}
						{/*<Route path='/index/workbench/audit' component={Audit} />
						<Route path='/index/workbench/auditcontent' component={AuditContent} />
						<Route path='/index/workbench/withdraw' component={Withdraw} />
						<Route path='/index/workbench/record' component={Record} />
						<Route path='/index/workbench/bankcard' component={BankCard} />*/}
						<Route path='/index/resetpassword' component={ResetPassword} />
						{
							this.state.menuList.length&&(
								<Redirect to={this.state.menuList[0].path}  />
							)
						}
						
				    </Switch>
				</Content>
            </Layout>  
        )
    }
}