import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { Base64 } from 'js-base64';
import ModalStaff from '@/components/modalStaff';
import BreadCrumb from '@/components/breadcrumb';
import TableComponent from '@/components/tableComponent';
import { getStaff, getAllRoles, removeStaff } from '@/http/api';
import message from '@/utils/message';
import './index.css';

export default class Staff extends Component{
	constructor(props){
        super(props);
		this.state = {
			affairId: 0,
			userId: null,
			visible: false,
			columns: [
			  {
					title: '登录账号',
					dataIndex: 'accountName',
			  },
			  {
				title: '名称',
				dataIndex: 'userName',
			  },
			  {
				title: '角色', 
				dataIndex: 'roleName',
			  },
			  {
				title: '联系方式',
				dataIndex: 'linkPhone',
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
							this.state.myAuth.updatestaff&&(
								<span
									className="span_btn pointer" 
									onClick={this.modalEvent.bind(this, 0, record.userId)}>重置密码</span>
							)
						}
						{
							this.state.myAuth.delstaff&&(
								<span
									className="span_btn pointer return_color"
									onClick={this.deleteEvent.bind(this, record.userId)}>删除</span>
							)
						}
					</span>
				)
			  },
			],
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
			roleList: [],
			tableList: [],
			breadcrumbList: [
				{
					title: '基础设置',
					path: '/index/basicsetting/roles'
				},
				{
					title: '人员管理',
				}
			],
			myAuth: {}
		}
		
    }

	componentWillMount(){
		let baseAuthInfo = JSON.parse(Base64.decode(sessionStorage.getItem('baseAuthInfo')))
		this.setState({
			myAuth: baseAuthInfo
		})
		
		this.fetchStaff()
		this.fetchAllRoles()
	}
	
	deleteEvent = uid => {
		const that = this
		Modal.confirm({
			centered:true,
			width: 360,
			title: '温馨提示!',
			content: '请确认是否要删除该人员?',
			onOk() {
			  removeStaff({userId: uid}).then(res=> {
			  	if(res.code===1){
			  		message.success('成功!')
			  		that.fetchStaff()
			  	}
			  })
			},
			onCancel() {
			  
			},
		});
	}
	
	fetchStaff = () => {
		let params = {
			pageNum: this.state.pagination.current,
			pageSize: this.state.pagination.pageSize
		}
		getStaff(params).then(res=> {
			if(res.code===1){
				let pagination = this.state.pagination
				let tableList = res.data.list.map(item=> {
					item['key'] = item.userId
					item['createTime'] = item.createTime?item.createTime.replace(/-/g, '/').replace('T', ' ').replace('.000+0000',''):''
					return item
				})
				pagination.total = res.data.total
				this.setState({
					pagination: pagination,
					tableList: tableList
				})
			}
		})
	}
	
	fetchAllRoles = () => {
		let params = {
			pageNum: 1,
			pageSize: 1000
		}
		getAllRoles(params).then(res=> {
			if(res.code===1){
				if(res.data.total){
					this.setState({
						roleList: res.data.list
					})
				}
				
			}
		})
	}
	
	routePageEvent = (pathname)=> {
		this.props.history.push({pathname: pathname})
	}
	
	hideModal = (id=null) => {
		this.setState({
			visible: false
		})
		if(this.state.affairId===1&&id){
			this.fetchStaff()
		}
	}
	
	modalEvent = (id, userId) => {
		this.setState({
			affairId: id,
			userId: userId,
			visible: true
		})
	}
	
	onPaginationChange = (current, pageSize)=> {
		let pagination = this.state.pagination
		pagination.current = current
		pagination.pageSize = pageSize
		this.setState({
			pagination: pagination
		})
		this.fetchStaff()
	}

    render(){
        return(
            <div className="container_wrap">
            	<BreadCrumb 
            		isRight={true}
            		breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
            	<div className="srcoll_box">
            		<div className="srcoll_box_inner">
						<div className="inner_top_title flex_box flex_between">
							<span className="top_btn">
								{
									this.state.myAuth.addstaff&&(
										<Button onClick={this.modalEvent.bind(this, 1, null)} type="primary">添加人员</Button>
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
				<ModalStaff 
					userId={this.state.userId}
					roleList={this.state.roleList}
					affairId={this.state.affairId}
					visible={this.state.visible}
					hideModal={this.hideModal}></ModalStaff>
            </div>
        )
    }
}