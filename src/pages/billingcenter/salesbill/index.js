import React, { Component } from 'react';
import { Spin, Row, Col, Button, Icon, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProduct, updateLoading, updateContractorList } from '@/store/reducer/action';
import BreadCrumb from '@/components/breadcrumb';
import TableComponent from '@/components/tableComponent';
import { getSaleOrder, getContractorTree, getBaseProduct } from '@/http/api';
import { trim } from '@/utils/tool'; 
import './index.css';

const { Option } = Select;

class SalesBill extends Component{
	constructor(props){
        super(props);
		this.state = {
			breadcrumbList: [
				{
					title: '对账中心',
					path: '/index/billingcenter/salesbill',
				},
				{
					title: '销售订单',
				}
			],
			columns: [
			  {
				title: '销售单号',
				dataIndex: 'saleOrderSn',
			  },
			  {
				title: '产品', 
				dataIndex: 'productName',
			  },
			  {
				title: '客户名称',
				dataIndex: 'customerName',
			  },
			  {
				title: '交易时间',
				dataIndex: 'createTime',
			  },
			  {
				title: '收支类型',
				dataIndex: 'tradTypeText',
			  },
			  {
				title: '交易金额',
				dataIndex: 'tradAmount',
			  },
			  {
				title: '分润收入',
				dataIndex: 'divideAmount',
			  },
			  {
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<span className="span_btn_group">
						<span 
							onClick={this.routeEvent.bind(this, record.saleOrderId)} 
							className="span_btn pointer" >详情</span>
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
			productList: [],
			contractorList: [],
			searchBoxFold: false,
			saleOrderSn: '',
			customerName: '',
			productId: 0,
			contractorId: 0,
			tradType: 0
		}
		this.fetchAllOrder(true)
    }
	
	static propTypes = {
		productList: PropTypes.array,
		contractorList: PropTypes.array,
		updateLoading: PropTypes.func,
		updateProduct: PropTypes.func,
		updateContractorList: PropTypes.func,
	}
	
	componentWillMount(){
		
	}

	componentDidMount(){
		this.fetchSelectOptions()
	}
	
	hideModal = () => {
		this.setState({
			visible: false,
			withdrawStatus: 1,
		})
	}
	
	routeEvent = (saleOrderId) => {
		this.props.history.push({pathname: "/index/billingcenter/salebillinfo", state: {id: saleOrderId}})
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
	
	onPaginationChange = (current, pageSize)=> {
		let pagination = this.state.pagination
		pagination.current = current
		pagination.pageSize = pageSize
		this.setState({
			pagination: pagination
		})
		this.fetchAllOrder()
	}
	
	onInputChange = (name, e) => {
		e.persist()
		this.setState({
			[name]: e.target.value
		})
	}
	
	onSelectChange = (name, e) => {
		this.setState({
			[name]: e
		})
	}
	
	handleContrancorList = menus => {
		let contractorList = this.state.contractorList
		if(Object.prototype.toString.call(menus)==='[object Array]'&&menus.length){
			menus.forEach((item, index)=> {
				this.handleContrancorList(item)
			})
		}
		if(Object.prototype.toString.call(menus)==='[object Object]'){
			for(let key in menus){
				this.handleContrancorList(menus[key])
			}
			contractorList.push({
				id: menus.id,
				name: menus.name
			})
		}
		this.setState({
			contractorList
		})
	}
	
	fetchSelectOptions = () => {
		if(this.props.contractorList&&this.props.contractorList.length){
			this.handleContrancorList(this.props.contractorList)
		}else{
			getContractorTree().then(res=> {
				if(res.code===1){
					if(res.data.length){
						let contractorList = res.data
						this.handleContrancorList(contractorList)
						this.props.updateContractorList(contractorList)
					}
				}
			})
		}
		if(this.props.productList&&this.props.productList.length){
			this.setState({
				productList: this.props.productList
			})
		}else{
			getBaseProduct().then(res=> {
				if(res.code===1){
					let productList = res.data
					this.setState({
						productList
					})
					this.props.updateProduct(productList)
				}
			})
		}
	}
	
	resetSearchForm = () => {
		this.setState({
			customerName: '',
			saleOrderSn: '',
			tradType: 0,
			contractorId: 0,
			productId: 0,
		})
		this.fetchAllOrder()
	}
	
	fetchAllOrder = (init=false) => {
		let loading = true
		let params = {
			pageNum: this.state.pagination.current,
			pageSize: this.state.pagination.pageSize
		}
		if(trim(this.state.customerName)!=='')params['customerName'] = this.state.customerName
		if(trim(this.state.saleOrderSn)!=='')params['saleOrderSn'] = this.state.saleOrderSn
		if(this.state.tradType)params['tradType'] = this.state.tradType
		if(this.state.contractorId)params['contractorId'] = this.state.contractorId
		if(this.state.productId)params['productId'] = this.state.productId
		
		this.props.updateLoading(loading)
		getSaleOrder(params).then(res=> {
			if(res.code===1){
				let { pagination } = this.state
				let tableList = res.data.list.map((item, index)=> {
					item["key"] = item.saleOrderId;
					item['createTime'] = item.createTime?item.createTime.replace(/T/g, " ").replace(/\.000\+0000/g, ""):'';
					item["tradTypeText"] = item.tradType===1?'收入':'支出';
					item['tradAmount'] = item.tradAmount + '元';
					item['divideAmount'] = item.divideAmount + '元';
					return item
				})
				pagination.total = res.data.total
				if(init){
					this.state.tableList = tableList
					this.state.pagination = pagination
				}else{
					this.setState({
						tableList,
						pagination
					})
				}
			}
			loading = false
			this.props.updateLoading(loading)
		}).catch(err=> {
			loading = false
			this.props.updateLoading(loading)
		})
	}

    render(){
		const { productList, contractorList } = this.state
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
												  <span>销售单号:</span>
												  <span>
													  <Input 
														value={this.state.saleOrderSn}
														onChange={this.onInputChange.bind(this, 'saleOrderSn')}
														placeholder="请输入" 
														allowClear/>
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>筛选产品:</span>
												  <span>
													  <Select
														value={this.state.productId} 
														onChange={this.onSelectChange.bind(this, 'productId')}>
														<Option value={0}>全部</Option>
														{
															productList.length>0 && productList.map(item=> {
																return (
																	<Option key={item.id} value={item.id}>{item.name}</Option>
																)
															})
														}
													  </Select>
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>客户名称:</span>
												  <span>
													  <Input 
														value={this.state.customerName}
														onChange={this.onInputChange.bind(this, 'customerName')}
														placeholder="请输入" 
														allowClear/>
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>授权工程商:</span>
												  <span>
													  <Select
														value={this.state.contractorId} 
														onChange={this.onSelectChange.bind(this, 'contractorId')}>
															<Option value={0}>全部</Option>
															{
																contractorList.length>0 && contractorList.map(item=> {
																	return (
																		<Option key={item.id} value={item.id}>{item.name}</Option>
																	)
																})
															}
													  </Select>
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>收支类型:</span>
												  <span>
													  <Select
														value={this.state.tradType} 
														onChange={this.onSelectChange.bind(this, 'tradType')}>
														<Option value={0}>全部</Option>
														<Option value={1}>收入</Option>
														<Option value={2}>支出</Option>
													  </Select>
												  </span>
											  </div>
											</Col>
										</Row>
										<div className="search_btn_group flex_box align_items_center">
											<div onClick={this.toggleFoldSearch.bind(this, false)} className="icon_up_down flex_box align_items_center theme_color pointer">
												<Icon type="up" />
												<span>收起</span>
											</div>
											<Button onClick={this.fetchAllOrder} type="primary">搜索</Button>
											<Button onClick={this.resetSearchForm}>重置</Button>
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
												  <span>销售单号:</span>
												  <span>
													  <Input 
														value={this.state.saleOrderSn}
														onChange={this.onInputChange.bind(this, 'saleOrderSn')}
														placeholder="请输入" 
														allowClear/>
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>筛选产品:</span>
												  <span>
													  <Select
														value={this.state.productId} 
														onChange={this.onSelectChange.bind(this, 'productId')}>
														<Option value={0}>全部</Option>
														{
															productList.length>0 && productList.map(item=> {
																return (
																	<Option key={item.id} value={item.id}>{item.name}</Option>
																)
															})
														}
													  </Select>
												  </span>
											  </div>
											</Col>
										</Row>
										<div className="search_btn_group flex_box align_items_center open_search_box">
											<div onClick={this.toggleFoldSearch.bind(this, true)} className="icon_up_down flex_box align_items_center theme_color pointer">
												<Icon type="down" />
												<span>展开</span>
											</div>
											<Button onClick={this.fetchAllOrder} type="primary">搜索</Button>
											<Button onClick={this.resetSearchForm}>重置</Button>
										</div>
									</div>
								)
							}
							
							<TableComponent
								columns={this.state.columns}
								data={this.state.tableList} 
								pagination={this.state.pagination}></TableComponent>
						</div>
					</div>
				</div>
            </div>  
        )
    }
}


export default connect(state => ({
	productList: state.storeState.productList,
	contractorList: state.storeState.contractorList,
 }),{
		updateLoading,
		updateProduct,
		updateContractorList
	}
)(SalesBill);