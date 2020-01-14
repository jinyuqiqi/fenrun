import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import TableComponent from '@/components/tableComponent';
import { getAllRoles, removeRole } from '@/http/api';
import message from '@/utils/message';
import './index.css';

export default class Roles extends Component{
	constructor(props){
        super(props);
		this.state = {
			columns: [
			  {
				title: '角色名称',
				dataIndex: 'roleName',
			  },
			  {
				title: '权限', 
				dataIndex: 'menuPermissions',
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
						<span 
							className="span_btn pointer" 
							onClick={() => this.editRole(record)}>编辑</span>
				    	<span 
							className="span_btn pointer return_color" 
							onClick={() => this.deleteRole(record)}>删除</span>
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
					title: '基础设置',
					path: '/index/basicsetting/roles'
				},
				{
					title: '角色管理',
				}
			],
		}
		this.fetchRoles()
    }

	componentDidMount(){
		console.log('mount')
	}
	
	routePageEvent = (pathname)=> {
		this.props.history.push({pathname: pathname})
	}
	
	editRole = row => {
		this.props.history.push({pathname: '/index/basicsetting/addingrole', state: {id: row.roleId}})
	}
	
	deleteRole = row => {
		const that = this
		Modal.confirm({
			width: 360,
			title: '温馨提示!',
			content: '请确认是否要删除该角色?',
			onOk() {
			  removeRole({roleId: row.roleId}).then(res=> {
			  	if(res.code===1){
			  		message.success('成功!')
			  		that.fetchRoles()
			  	}
			  })
			},
			onCancel() {
			  
			},
		});
	}
	
	fetchRoles = () => {
		let params = {
			pageNum: this.state.pagination.current,
			pageSize: this.state.pagination.pageSize
		}
		getAllRoles(params).then(res=> {
			if(res.code===1){
				let pagination = this.state.pagination
				let tableList = res.data.list.map(item=> {
					item['key'] = item.roleId
					item['createTime'] = item.createTime.replace(/T/g, " ").replace(/\.000\+0000/g, "")
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
	
	onPaginationChange = (current, pageSize)=> {
		let pagination = this.state.pagination
		pagination.current = current
		pagination.pageSize = pageSize
		this.setState({
			pagination: pagination
		})
		this.fetchRoles()
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
								<Button type="primary" onClick={this.routePageEvent.bind(this, '/index/basicsetting/addingrole')}>创建角色</Button>
							</span>
							<div></div>
						</div>
						<TableComponent
							columns={this.state.columns}
							data={this.state.tableList} 
							pagination={this.state.pagination}></TableComponent>
            		</div>
            	</div>
            </div>
        )
    }
}