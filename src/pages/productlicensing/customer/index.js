import React, { Component } from 'react';
import { Button } from 'antd';
import ModalCarrier from '@/components/modalCarrier';
import BreadCrumb from '@/components/breadcrumb';
import ItemNavMenu from '@/components/itemNavMenu';
import TableComponent from '@/components/tableComponent';
import './index.css';

const data = [
  {
    key: '1',
    name: '桃田',
    age: 32,
    address: '纽约大姐34号',
  },
  {
    key: '2',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '5',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '7',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '8',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
  },
  {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '10',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '11',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
  },
  {
    key: '12',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '13',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '14',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
  },
  {
    key: '15',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '16',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '17',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
  },
  {
    key: '18',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '19',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
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

export default class Customer extends Component{
	constructor(props){
        super(props);
		this.state = {
			affairId: 0,
			visible: false,
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
				    	<span onClick={this.routePageEvent.bind(this, '/index/productlicensing/inaudit')} className="span_btn pointer">详情</span>
						<span onClick={this.modalEvent.bind(this, 0)} className="span_btn pointer">添加车场</span>
						<span onClick={this.routePageEvent.bind(this, '/index/productlicensing/inaudit')} className="span_btn return_color pointer">删除</span>
					</span>
				)
			  },
			],
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

	componentDidMount(){
		console.log('mount')
	}
	
	routePageEvent = (pathname)=> {
		this.props.history.push({pathname: pathname})
	}
	
	hideModal = () => {
		this.setState({
			visible: false
		})
	}
	
	modalEvent = (id) => {
		this.setState({
			affairId: id,
			visible: true
		})
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
								<Button onClick={this.modalEvent.bind(this, 1)} type="primary">添加车场运营商</Button>
							</span>
							<div></div>
						</div>
						<TableComponent
							columns={this.state.columns}
							data={data} 
							pagination={pagination}></TableComponent>
            		</div>
            	</div>
				<ModalCarrier 
					affairId={this.state.affairId}
					visible={this.state.visible}
					hideModal={this.hideModal}></ModalCarrier>
            </div>
        )
    }
}