import React, { Component } from 'react';
import { Spin, Modal, Button } from 'antd';
import ModalCarrier from '@/components/modalCarrier';
import BreadCrumb from '@/components/breadcrumb';
import { Base64 } from 'js-base64';
import ItemNavMenu from '@/components/itemNavMenu';
import TableComponent from '@/components/tableComponent';
import { addCustomer, getCustomerList, deleteCustomer } from '@/http/api';
 import message from '@/utils/message';
import './index.css';

export default class Customer extends Component{
	constructor(props){
        super(props);
		this.state = {
			affairId: 0,
			visible: false,
			loading: true,
			myAuth: {},
			columns: [
			  {
				title: '客户名称',
				dataIndex: 'customerName',
			  },
			  {
				title: '公司名称', 
				dataIndex: 'companyName',
			  },
			  {
				title: '联系方式',
				dataIndex: 'linkPhone',
			  },
			  {
				title: '公司地址',
				dataIndex: 'addressInfo',
			  },
			  {
				title: '数量/车场数量',
				dataIndex: 'parkCount',
			  },
			  {
				title: '创建时间',
				dataIndex: 'createTime',
			  },
			  {
				  title: '操作',
				  key: 'action',
				  render: (text, record) => (
				    <span className="span_btn_group">
						{
							this.state.myAuth.viewc&&(
								<span onClick={this.routePageEvent.bind(this,  record.customerId)} className="span_btn pointer">详情</span>
							)
						}
						{
							this.state.myAuth.addparking&&(
								<span onClick={this.addParkingEvent.bind(this, record)} className="span_btn pointer">添加车场</span>
							)
						}
						{
							this.state.myAuth.delparking&&(
								<span onClick={this.deleteEvent.bind(this, record.customerId)} className="span_btn return_color pointer">删除</span>
							)
						}
				  	</span>
				  )
			  },
			],
			tableList: [],
			pagination: {
				size: 'small',
				showSizeChanger: true,
				showQuickJumper: true,
				total: 0,
				pageSize: 10, 
				current: 1,
				showTotal: total => `共 ${total} 条`,
				onChange: this.onPaginationChange,
				onShowSizeChange: this.onPaginationChange
			},
			breadcrumbList: [
				{
					title: '产品授权',
					path: '/index/productlicensing/authorizations'
				},
				{
					title: '客户管理',
				}
			],
		}
    }
	
	componentWillMount(){
		let productAuths = JSON.parse(Base64.decode(sessionStorage.getItem('productAuths')))
		this.setState({
			myAuth: productAuths
		})
	}

	componentDidMount(){
		this.takeTableList()
	}
	
	onPaginationChange = (current, pageSize)=> {
		let pagination = this.state.pagination
		pagination.current = current
		pagination.pageSize = pageSize
		this.setState({
			pagination: pagination
		})
	}
	
	addParkingEvent = record => {
		this.props.history.push({
			pathname: '/index/productlicensing/authorizationsteps', 
			state: {id: 1, customerId: record.customerId, customerName: record.customerName},
		})
	}
	
	routePageEvent = id => {
		this.props.history.push({pathname: '/index/productlicensing/customerinfo', state: {id: id}})
	}
	
	onCancel = () => {
		this.setState({
			visible: false
		})
	}
	
	onConfirm = p => {
		const that = this
		addCustomer(p).then(res=> {
			if(res.code===1){
				message.success('成功！')
				that.takeTableList()
				that.setState({
					visible: false
				})
			}
		})
	}
	
	deleteEvent = id => {
		const that = this
		Modal.confirm({
			centered: true,
			width: 360,
			title: '提示!',
			content: '删除客户之后，客户的所属车场将不能再登录平台，你还要继续吗?',
			onOk() {
				deleteCustomer({customerId: id}).then(res=> {
					if(res.code===1){
						message.success('成功！')
						that.takeTableList()
					}
				})
			},
			onCancel() {
			  
			},
		});
		
	}
	
	modalEvent = () => {
		this.setState({
			visible: true
		})
	}
	
	takeTableList = () => {
		let { pagination, tableList } = this.state
		this.setState({
			loading: true
		})
		getCustomerList({
			pageNum: pagination.current,
			pageSize: pagination.pageSize
		}).then(res=> {
			if(res.code===1){
				pagination.total = res.data.total
				tableList = res.data.list.map((item, index)=> {
					item["key"] = item.customerId
					item["createTime"] = item.createTime.replace(/T/g, " ").replace(/\.000\+0000/g, "")
				    item["addressInfo"] = item.province+""+item.city+""+item.area+""+item.address
					return item
				})
				
				this.setState({
					loading: false,
					pagination,
					tableList
				})
			}else{
				this.setState({
					loading: false
				})
			}
		}).catch(err=> {
			this.setState({
				loading: false
			})
		})
	}

    render(){
        return(
            <div className="container_wrap">
            	<BreadCrumb 
            		isRight={true}
            		breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
<<<<<<< HEAD
            	<div className="srcoll_box">
            		<div className="srcoll_box_inner">
						<div className="inner_top_title flex_box flex_between">
							<span className="top_btn">
								<Button onClick={this.modalEvent.bind(this, 1)} type="primary">添加客户</Button>
							</span>
							<div></div>
=======
				{
					this.state.loading&&(
						<div className="srcoll_box loading_box">
							<Spin spinning={true}></Spin>
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
						</div>
					)
				}
				{
					!this.state.loading&&(
						<div className="srcoll_box">
							<div className="srcoll_box_inner">
								<div className="inner_top_title flex_box flex_between">
									<span className="top_btn">
										{
											this.state.myAuth.addcustomer&&(
												<Button onClick={this.modalEvent} type="primary">添加车场运营商</Button>
											)
										}
									</span>
									<div></div>
								</div>
								<TableComponent
									columns={this.state.columns}
									data={this.state.tableList} 
									pagination={this.state.pagination}></TableComponent>
							</div>
						</div>
					)
				}
				<ModalCarrier 
					visible={this.state.visible}
					onCancel={this.onCancel}
					onConfirm={this.onConfirm}></ModalCarrier>
            </div>
        )
    }
}