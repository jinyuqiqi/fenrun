
import React, { Component } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import { getCustomerInfo, getCustomerParking } from '@/http/api';
import { Row, Col, Table, Spin } from 'antd';
import './index.css';

export default class CustomerInfo extends Component{
	constructor(props){
        super(props);
		this.state = {
			title: '授权信息',
			visible: false,
			details: null,
			loading: false,
			columns: [
			  {
				title: '车场名称',
				dataIndex: 'parkingName',
			  },
			  {
				title: '道口数量',
				dataIndex: 'parkingLaneNum',
			  },
			  {
				title: '车位总数',
				dataIndex: 'parkingSpace',
			  },
			  {
				title: '地址',
				dataIndex: 'parkingLocation',
			  },
			  {
				title: '版本',
				dataIndex: 'parkType',
			  },
			  {
				title: '启用时间',
				dataIndex: 'reviewTime',
			  },
			  {
				  title: '操作',
				  key: 'action',
				  render: (text, record) => (
					<span className="span_btn_group">
						<span 
							onClick={this.routeContent.bind(this, record.saleOrderId)} 
							className="span_btn pointer">详情</span>
						<span 
							onClick={this.deleteParking.bind(this, record.parkingId)} 
							className="span_btn return_color pointer">删除</span>
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
			tableList: [],
			breadcrumbList: [
				{
					title: '产品授权',
					path: '/index/productlicensing/authorizations',
				},
				{
					title: '授权管理',
					path: '/index/productlicensing/customer'
				},
				{
					title: '详情' 
				}
			],
		}
    }
	
	componentWillMount(){
		if(this.props.location.state){
			this.takeCustomerInfo(this.props.location.state.id)
			sessionStorage.setItem('customerId', String(this.props.location.state.id))
		}else{
			let id = sessionStorage.getItem('customerId')
			this.takeCustomerInfo(parseInt(id))
		}
	}
	
	componentWillUnmount(){
		sessionStorage.removeItem('customerId')
	}
	
	takeCustomerInfo = id => {
		this.setState({
			loading: true
		})
		getCustomerInfo({customerId: id}).then(res=> {
			if(res.code===1){
				this.setState({
					details: res.data,
					loading: false
				})
			}else{
				this.setState({
					loading: true
				})
			}
		}).catch(err=> {
			this.setState({
				loading: true
			})
		})
		this.takeParking(id)
	}
	
	takeParking = id => {
		let { pagination, tableList } = this.state
		getCustomerParking({
			customerId: id,
			pageNum: pagination.current,
			pageSize: pagination.pageSize
		}).then(res=> {
			if(res.code===1){
				pagination.total = res.data.total
				tableList = res.data.list.map(item=> {
					item["key"] = item.parkingId;
					item["parkType"] = item.parkType===1?'含岗亭版':'纯云端';
					item["parkingSpace"] = item.parkingSpace?item.parkingSpace:0;
					item['reviewTime'] = item.reviewTime?item.reviewTime.replace(/T/g, " ").replace(/\.000\+0000/g, ""):'';
					return item
				})
				this.setState({
					tableList,
					pagination,
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
	}
	
	routeContent = id => {
		this.props.history.replace({pathname: '/index/productlicensing/inaudit', state: {id: id}})
	}
	
	deleteParking = id => {
		
	}
	
	hideModal = () => {
		this.setState({
			visible: false
		})
	}

    render(){
		const { details } = this.state
        return(
            <div className="container_wrap">
            	<BreadCrumb 
            		isRight={true}
            		breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				{
					this.state.loading&&(
						<div className="srcoll_box loading_box">
							<Spin spinning={true}></Spin>
						</div>
					)
				}
				{
					!this.state.loading&&(
						<div className="srcoll_box" style={{background: '#EFF2F7'}}>
							<div className="srcoll_box_inner" style={{background: '#FFFFFF'}}>
								<div className="inner_top_title flex_box flex_between">
									<span className="default_title">客户信息</span>
									<div></div>
								</div>
								{
									details&&(
										<div className="audit_inner">
											<div className="audit_inner_module">
												<div className="audit_inner_module_content">
													<Row>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
														<div className="audit_info_item flex_box">
															<span className="base_span">管理员名称: </span>
															<span>{details.customerName}</span>
														</div>	
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
														<div className="audit_info_item flex_box">
															<span className="base_span">联系方式: </span>
															<span>{details.linkPhone}</span>
														</div>	
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
														<div className="audit_info_item flex_box">
															<span className="base_span">身份证号: </span>
															<span>{details.cardNo}</span>
														</div>	
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
														<div className="audit_info_item flex_box">
															<span className="base_span">公司名称: </span>
															<span>{details.companyName}</span>
														</div>
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
														<div className="audit_info_item flex_box">
															<span className="base_span">公司地址: </span>
															<span>{details.address}</span>
														</div>	
													  </Col>
													</Row>
												</div>
											</div>
										</div>
									)
								}
							</div>
							<div className="srcoll_box_inner" style={{background: '#FFFFFF',marginTop: '15px'}}>
								<div className="inner_top_title flex_box flex_between">
									<span className="default_title">车场信息</span>
									<div></div>
								</div>
								<div className="audit_inner">
									<div className="audit_inner_module">
										<div className="audit_inner_module_content" style={{marginTop: '12px',marginBottom: '8px'}}>
											<Table
												columns={this.state.columns}
												dataSource={this.state.tableList}
												bordered
												pagination={this.state.pagination}
											  />
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				}
            	
            </div>  
        )
    }
}

