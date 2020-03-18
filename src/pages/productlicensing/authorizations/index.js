import React, { Component } from 'react';
import { Row, Col, Button, Icon, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BreadCrumb from '@/components/breadcrumb';
import ItemNavMenu from '@/components/itemNavMenu';
import TableComponent from '@/components/tableComponent';
import { getProductBill, getContractorTree, getBaseProduct } from '@/http/api';
import { updateProduct, updateLoading, updateContractorList } from '@/store/reducer/action';
import { trim } from '@/utils/tool'; 
import './index.css';
const { Option } = Select;

class Authorizations extends Component{
	constructor(props){
        super(props);
		this.state = {
			itemnavmenu: [
				{
					title: '审核中',
					num: 44,
					id: 1,
				},{
					title: '已审核',
					num: 25,
					id: 2,
				},{
					title: '已过期',
					num: 15,
					id: 4,
				},{
					title: '已驳回',
					num: 15,
					id: 3,
				}
			],
			currentnavmenu: 1,
			columns: [
			  {
				title: '产品',
				dataIndex: 'productName',
			  },
			  {
				title: '项目名称', 
				dataIndex: 'projectName',
			  },
			  {
				title: '项目编号',
				dataIndex: 'projectNo',
			  },
			  {
				title: '客户姓名',
				dataIndex: 'customerName',
			  },
			  {
				title: '授权工程商',
				dataIndex: 'contractorName',
			  },
			  {
				title: '创建时间',
				dataIndex: 'createTime',
			  },
 			  {
				title: '总额',
				dataIndex: 'tradAmount',
			  },
			  {
				title: '操作',
				dataIndex: 'action',
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
			searchBoxFold: false,
			breadcrumbList: [
				{
					title: '产品授权',
					path: '/index/productlicensing/authorizations'
				},
				{
					title: '授权管理',
				}
			],
			productList: [],
			contractorList: [],
			productId: 0,
			contractorId: 0,
			customerName: '',
			projectNo: '',
			projectName: ''
		}
		this.fetchProduct()
		this.fetchAllOrder(true)
    }
	
	static propTypes = {
		productList: PropTypes.array,
		contractorList: PropTypes.array,
		updateLoading: PropTypes.func,
		updateProduct: PropTypes.func,
		updateContractorList: PropTypes.func,
	}
	
	routeEvent = (saleOrderId) => {
		this.props.history.push({pathname: "/index/productlicensing/inaudit", state: {id: saleOrderId}})
	}

	componentDidMount(){
		this.fetchSelectOptions()
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
	}
	
	fetchProduct = () => {
		if(this.props.productList&&this.props.productList.length){
			this.state.productList = this.props.productList
		}else{
			getBaseProduct().then(res=> {
				if(res.code===1){
					let productList = res.data
					this.state.productList = productList
					this.props.updateProduct(productList)
				}
			})
		}
	}
	
	switchNavMenu = (id)=> {
		this.setState({
			currentnavmenu: id
		})
		this.fetchAllOrder()
	}
	
	toggleFoldSearch = (bool)=> {
		this.setState({
			searchBoxFold: bool
		})
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
	
	onPaginationChange = (current, pageSize)=> {
		let pagination = this.state.pagination
		pagination.current = current
		pagination.pageSize = pageSize
		this.setState({
			pagination: pagination
		})
		this.fetchAllOrder()
	}
	
	routePageEvent = (pathname, id)=> {
		this.props.history.push({pathname: pathname, state: {id: id}})
	}
	
	resetSearchForm = () => {
		this.setState({
			customerName: '',
			projectNo: '',
			customerName: '',
			contractorId: 0,
			productId: 0,
		})
		this.fetchAllOrder()
	}
	
	fetchAllOrder = (init=false) => {
		let params = {
			auditState: this.state.currentnavmenu,
			pageNum: this.state.pagination.current,
			pageSize: this.state.pagination.pageSize
		}

		if(trim(this.state.projectNo)!=='')params['projectNo'] = this.state.projectNo
		if(trim(this.state.projectName)!=='')params['projectName'] = this.state.projectName
		if(trim(this.state.customerName)!=='')params['customerName'] = this.state.customerName
		if(this.state.contractorId)params['contractorId'] = this.state.contractorId
		if(this.state.productId)params['productId'] = this.state.productId
		
		let loading = true
		this.props.updateLoading(loading)
		getProductBill(params).then(res=> {
			if(res.code===1){
				let { pagination } = this.state
				let tableList = res.data.list.map((item, index)=> {
					item["key"] = item.saleOrderId;
					item['createTime'] = item.createTime?item.createTime.replace(/T/g, " ").replace(/\.000\+0000/g, ""):'';
					item['tradAmount'] = item.tradAmount + '元';
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
			console.log(';')
			this.props.updateLoading(loading)
		}).catch(err=> {
			loading = false
			console.log(';')
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
						<div className="pro_box flex_box flex_between">
							{
								productList.length&&productList.map(item=> {
									return (
										<div className="pro_item" key={item.id}>
											<div className="item_part flex_box flex_between align_items_center">
												<div className="medium_title">
													<span>{item.name}</span>
												</div>
												<div>
													<div><span className="grey_color">已授权</span></div>
													<div className="num_xlarge">{item.authedCount}</div>
												</div>
												<div>
													<div><span className="grey_color">审核中</span></div>
													<div className="num_xlarge">{item.authingCount}</div>
												</div>
											</div>
											<div className="authorize_btn pointer" onClick={this.routePageEvent.bind(this, '/index/productlicensing/authorizationsteps', item.id)}>
												<span className="theme_color">授权产品</span>
											</div>
										</div>
									)
								})
							}
							<div className="pro_item" style={{background: 'transparent'}}>
							</div>
						</div>
						<div className="table_content">
							<ItemNavMenu
								switchNavMenu={this.switchNavMenu}
								currentnavmenu={this.state.currentnavmenu}
								itemnavmenu={this.state.itemnavmenu}></ItemNavMenu>
							{
								this.state.searchBoxFold && (
									<div className="search_box">
										<Row>
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
												  <span>项目名称:</span>
												  <span>
													  <Input 
														value={this.state.projectName}
														onChange={this.onInputChange.bind(this, 'projectName')}
														placeholder="请输入" 
														allowClear/>
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>项目编号:</span>
												  <span>
													  <Input 
														value={this.state.projectNo}
														onChange={this.onInputChange.bind(this, 'projectNo')}
														placeholder="请输入" 
														allowClear/>
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
												  <span>项目名称:</span>
												  <span>
													  <Input 
														value={this.state.projectName}
														onChange={this.onInputChange.bind(this, 'projectName')}
														placeholder="请输入" 
														allowClear/>
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
)(Authorizations);







