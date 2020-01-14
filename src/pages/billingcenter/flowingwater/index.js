import React, { Component } from 'react';
import { Row, Col, Button, Icon, Input } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
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

export default class FlowingWater extends Component{
	constructor(props){
        super(props);
		this.state = {
			breadcrumbList: [
				{
					title: '对账中心',
					path: '/index/billingcenter/salesbill',
				},
				{
					title: '资金流水',
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
				    	<span className="span_btn pointer">详情</span>
				    </span>
				)
			  },
			],
			searchBoxFold: true,
		}
    }

	componentDidMount(){
		
	}
	
	hideModal = () => {
		this.setState({
			visible: false,
			withdrawStatus: 1,
		})
	}
	
	withDrawEvent = ()=> {
		this.setState({
			visible: true,
		})
	}
	
	toggleFoldSearch = (bool)=> {
		this.setState({
			searchBoxFold: bool
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
						<div>
							{
								this.state.searchBoxFold && (
									<div className="search_box">
										<Row>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>筛选产品:</span>
												  <span>
													  <Input placeholder="请输入" />
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>筛选产品:</span>
												  <span>
													  <Input placeholder="请输入" />
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>筛选产品:</span>
												  <span>
													  <Input placeholder="请输入" />
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>筛选产品:</span>
												  <span>
													  <Input placeholder="请输入" />
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>筛选产品:</span>
												  <span>
													  <Input placeholder="请输入" />
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>筛选产品:</span>
												  <span>
													  <Input placeholder="请输入" />
												  </span>
											  </div>
											</Col>
										</Row>
										<div className="search_btn_group flex_box align_items_center">
											<div onClick={this.toggleFoldSearch.bind(this, false)} className="icon_up_down flex_box align_items_center theme_color pointer">
												<Icon type="up" />
												<span>收起</span>
											</div>
											<Button type="primary">搜索</Button>
											<Button>重置</Button>
										</div>
									</div>
								)
							}
							{
								!this.state.searchBoxFold && (
									<div className="search_box">
										<Row>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>筛选产品:</span>
												  <span>
													  <Input placeholder="请输入" />
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>筛选产品:</span>
												  <span>
													  <Input placeholder="请输入" />
												  </span>
											  </div>
											</Col>
											
										</Row>
										<div className="search_btn_group flex_box align_items_center open_search_box">
											<div onClick={this.toggleFoldSearch.bind(this, true)} className="icon_up_down flex_box align_items_center theme_color pointer">
												<Icon type="down" />
												<span>展开</span>
											</div>
											<Button type="primary">搜索</Button>
											<Button>重置</Button>
										</div>
									</div>
								)
							}
							
							<TableComponent
								columns={this.state.columns}
								data={data} 
								pagination={pagination}></TableComponent>
						</div>
					</div>
				</div>
            </div>  
        )
    }
}