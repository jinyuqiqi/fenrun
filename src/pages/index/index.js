import React, { Component } from 'react';
import Loadable from '@/components/loadable';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import TopNavigationBar from '@/components/topNavMenu';
import './index.css';
const { Content } = Layout;
const WorkBench = Loadable(()=> import('@/pages/workbench'));
const ProductLicensing = Loadable(()=> import('@/pages/productlicensing'));
const ProjectContractor = Loadable(()=> import('@/pages/projectcontractor'));
const BillingCenter = Loadable(()=> import('@/pages/billingcenter'));
const BasicSetting = Loadable(()=> import('@/pages/basicsetting'));
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
			menuList: [
				{
					path: '/index/workbench',
					title: '工作台',
					key: '1',
					icon: require('@/image/111.png')
				},
				{
					path: '/index/productlicensing',
					title: '产品授权',
					key: '2',
					icon: require('@/image/222.png')
				},
				{
					path: '/index/billingcenter',
					title: '对账中心',
					key: '3',
					icon: require('@/image/333.png')
				},
				{
					path: '/index/projectcontractor',
					title: '工程商管理',
					key: '4',
					icon: require('@/image/444.png')
				},
				{
					path: '/index/basicsetting',
					title: '基础设置',
					key: '5',
					icon: require('@/image/555.png')
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
		console.log('mount')
	}
	
	routeTurns = () => {
		this.props.history.replace({pathname: '/index'})
	}
	
	listenRouteChange(pathname){
		this.state.menuList.forEach(item=> {
			if(pathname.includes(item.path)){
				this.setState({
					path: item.path
				})
			}
		})
	}

    render(){
        return(
            <Layout className="Layout">
				<TopNavigationBar
					path={this.state.path}
					menuList={this.state.menuList}></TopNavigationBar>
				<Content>
				    <Switch>
				        <Route path='/index/workbench' exact component={WorkBench} />
				        <Route path='/index/productlicensing' component={ProductLicensing} />
						<Route path='/index/projectcontractor' component={ProjectContractor} />
						<Route path='/index/billingcenter' component={BillingCenter} />
						<Route path='/index/basicsetting' component={BasicSetting} />
						<Route path='/index/workbench/audit' component={Audit} />
						<Route path='/index/workbench/auditcontent' component={AuditContent} />
						<Route path='/index/workbench/withdraw' component={Withdraw} />
						<Route path='/index/workbench/record' component={Record} />
						<Route path='/index/workbench/bankcard' component={BankCard} />
				        <Redirect to='/index/workbench'  />
				    </Switch>
				</Content>
            </Layout>  
        )
    }
}