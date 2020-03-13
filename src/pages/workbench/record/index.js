import React, { Component } from 'react';
import { Spin } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import TableComponent from '@/components/tableComponent';
import { getWithdrawLogs } from '@/http/api';
import './index.css';

export default class Record extends Component{
	constructor(props){
        super(props);
		this.state = {
			title: '',
			dialog: '',
			visible: false,
			loading: false,
			breadcrumbList: [
				{
					path: '/index/workbench',
					title: '工作台'
				},
				{
					title: '我的账户'
				}
			],
			columns: [
			  {
				title: '时间',
				dataIndex: 'createTime',
			  },
			  {
				title: '交易编号', 
				dataIndex: 'transactionNumber',
			  },
			  {
				title: '交易流水号',
				dataIndex: 'serialNumber',
			  },
			  {
				title: '收款账号',
				dataIndex: 'openBank',
			  },
			  {
				title: '金额',
				dataIndex: 'actualAmount ',
			  },
			  {
				title: '状态',
				dataIndex: 'status',
				render: (text, record) => {
				    return (<span className="span_btn_group">
						{
							record.status===1&& <span className="span_btn pointer default_color">提现中</span>
						}
						{
							record.status===2 && <span className="span_btn pointer pass_color">提现成功</span>
						}
						{
							record.status===3 &&<span className="span_btn pointer return_color">提现失败</span>
						}
						{
							record.status===4 && <span className="span_btn pointer default_color">已过期</span>
						}
				    </span>)
				}
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
		}
    }

	componentDidMount(){
		this.getLogs()
	}
	
	onPaginationChange = (current, pageSize)=> {
		let pagination = this.state.pagination
		pagination.current = current
		pagination.pageSize = pageSize
		this.setState({
			pagination: pagination
		})
		this.getLogs()
	}
	
	getLogs = () => {
		let params = {
			pageNum: this.state.pagination.current,
			pageSize: this.state.pagination.pageSize
		}
		this.setState({
			loading: true
		})
		let { pagination, tableList } = this.state
		getWithdrawLogs(params).then(res=> {
			if(res.code===1){
				pagination.total = res.data.total
				tableList = res.data.list.map((item, index)=> {
					item['key'] = item.id
					item.createTime = item.createTime.replace(/T/g, " ").replace(/\.000\+0000/g, "")
					return item
				})
				this.setState({
					loading: false,
					pagination,
					tableList
				})
			}
		})
	}
	
    render(){
        return(
            <div className="container_wrap">
				<BreadCrumb breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				{
					this.state.loading&&(
						<div className="srcoll_box loading_box">
							<Spin spinning={true}></Spin>
						</div>
					)
				}
				{
					!this.state.loading&&(
						<div className="srcoll_box">
							<div className="srcoll_box_inner">
								<div className="inner_top_title flex_box flex_between">
									<span className="default_title">操作记录</span>
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
				
            </div>  
        )
    }
}