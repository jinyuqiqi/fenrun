import React, { Component } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import TableComponent from '@/components/tableComponent';
import './index.css';

const data = [
  {
    key: '1',
    name: '桃田',
    age: 32,
    address: '纽约大姐34号',
	status: '提现中'
  },
  {
    key: '2',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
	status: '提现失败'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
	status: '提现成功'
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
	status: '提现成功'
  },
  {
    key: '5',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
	status: '提现中'
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
	status: '提现成功'
  },
  {
    key: '7',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
	status: '提现成功'
  },
  {
    key: '8',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
	status: '提现成功'
  },
  {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
	status: '提现成功'
  },
  {
    key: '10',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
	status: '提现成功'
  },
  {
    key: '11',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
	status: '提现成功'
  },
  {
    key: '12',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
	status: '提现成功'
  },
  {
    key: '13',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
	status: '提现成功'
  },
  {
    key: '14',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
	status: '提现成功'
  },
  {
    key: '15',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
	status: '提现成功'
  },
  {
    key: '16',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
	status: '提现成功'
  },
  {
    key: '17',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
	status: '提现成功'
  },
  {
    key: '18',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
	status: '提现成功'
  },
  {
    key: '19',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
	status: '提现成功'
  },
];

const pagination = {
	size: 'small',
	showSizeChanger: true,
	showQuickJumper: true,
	total: 200,
	defaultCurrent: 1,
	showTotal: total => `共 ${total} 条`,
	onShowSizeChange: onShowSizeChange
	
}

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

export default class Record extends Component{
	constructor(props){
        super(props);
		this.state = {
			title: '',
			dialog: '',
			visible: false,
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
				title: '销售单号',
				dataIndex: 'name',
			  },
			  {
				title: '产品', 
				dataIndex: 'age',
			  },
			  {
				title: '客户名称',
				dataIndex: 'address',
			  },
			  {
				title: '状态',
				dataIndex: 'status',
				render: (text, record) => (
				    <span className="span_btn_group">
				    	<span className="span_btn pointer return_color">提现失败</span>
				    	<span className="span_btn pointer pass_color">提现成功</span>
						<span className="span_btn pointer default_color">提现中</span>
				    </span>
				)
			  },
			]
		}
    }

	componentDidMount(){
		
	}
	
    render(){
        return(
            <div className="container_wrap">
				<BreadCrumb breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				<div className="srcoll_box">
					<div className="srcoll_box_inner">
						<div className="inner_top_title flex_box flex_between">
							<span className="default_title">操作记录</span>
							<div></div>
						</div>
						<TableComponent
							columns={this.state.columns}
							data={data} 
							pagination={pagination}></TableComponent>
					</div>
				</div>
            </div>  
        )
    }
}