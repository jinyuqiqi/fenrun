import React, { Component } from 'react';
import { Row, Col, Button, Icon, Input, Select, DatePicker  } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateLoading } from '@/store/reducer/action';
import BreadCrumb from '@/components/breadcrumb';
import TableComponent from '@/components/tableComponent';
import { getFlowingOrder } from '@/http/api';
import moment from 'moment';
import { trim } from '@/utils/tool'; 
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import './index.css';
moment.locale('zh-cn');
const { Option } = Select;
const { RangePicker } = DatePicker;

class FlowingWater extends Component{
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
				title: '订单编号/销量编号',
				dataIndex: 'tradNo',
			  },
			  {
				title: '财务类型', 
				dataIndex: 'tradTypeText',
			  },
			  {
				title: '收支类型',
				dataIndex: 'capitalTypeText',
			  },
			  {
				title: '交易时间',
				dataIndex: 'tradDate',
			  },
			  {
				title: '金额',
				dataIndex: 'amount',
			  },
			  {
				title: '说明',
				dataIndex: 'descContext'
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
			tradeNo: '',
			tradType: 0,
			capitalType: 0,
			dateMoment: [],
			tradDate: []
		}
		
		this.fetchAllOrder()
    }
	
	static propTypes = {
		updateLoading: PropTypes.func,
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
	
	onPaginationChange = (current, pageSize)=> {
		let pagination = this.state.pagination
		pagination.current = current
		pagination.pageSize = pageSize
		this.setState({
			pagination: pagination
		})
		this.fetchAllOrder()
	}
	
	resetSearchForm = () => {
		this.setState({
			tradeNo: '',
			tradType: 0,
			capitalType: 0,
			tradDate: [],
			dateMoment: []
		})
		this.fetchAllOrder()
	}
	
	fetchAllOrder = () => {
		let loading = true
		let params = {
			pageNum: this.state.pagination.current,
			pageSize: this.state.pagination.pageSize
		}
		if(trim(this.state.tradeNo)!=='')params['tradeNo'] = this.state.tradeNo
		if(this.state.tradType)params['tradType'] = this.state.tradType
		if(this.state.capitalType)params['capitalType'] = this.state.capitalType
		if(this.state.tradDate.length){
			params['tradeDateSt'] = this.state.tradDate[0]
			params['tradeDateEn'] = this.state.tradDate[1]
		}
		this.props.updateLoading(loading)
		getFlowingOrder(params).then(res=> {
			if(res.code===1){
				let pagination = this.state.pagination
				let tableList = res.data.list.map((item, index)=> {
					item['key'] = index+'x';
					item['amount'] = item.amount+'元';
					item['tradTypeText'] = item.tradType===1?'收入':'支出';
					item['capitalTypeText'] = item.capitalType===1?'订单交易':(item.capitalType===2?'产品销售':'提现');
					item['tradDate'] = item.tradDate?item.tradDate.replace(/T/g, " ").replace(/\.000\+0000/g, ""):'';
					return item
				})
				pagination.total = res.data.total
				this.setState({
					tableList,
					pagination
				})
			}
			loading = false
			this.props.updateLoading(loading)
		}).catch(err=> {
			loading = false
			this.props.updateLoading(loading)
		})
	}
	
	onSelectChange = (name, e) => {
		this.setState({
			[name]: e
		})
	}
	
	onTimeChange = (moment, dateString) => {
		this.setState({
			dateMoment: moment,
			tradDate: dateString
		})
	}
	
	onInputChange = e => {
		e.persist()
		this.setState({
			tradeNo: e.target.value
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
												  <span>订单编号:</span>
												  <span>
													  <Input 
														value={this.state.tradeNo}
														onChange={this.onInputChange}
														placeholder="请输入" 
														allowClear/>
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
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>账务类型:</span>
												  <span>
													  <Select 
														value={this.state.capitalType} 
														onChange={this.onSelectChange.bind(this, 'capitalType')}>
														<Option value={0}>全部</Option>
														<Option value={1}>订单交易</Option>
														<Option value={2}>产品销售</Option>
														<Option value={2}>提现</Option>
													  </Select>
												  </span>
											  </div>
											</Col>
											<Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={6}>
											  <div className="search_item flex_box align_items_center">
												  <span>选择日期:</span>
												  <span>
													  <RangePicker 
														locale={locale} 
														value={this.state.dateMoment}
														onChange={this.onTimeChange} />
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
												  <span>订单编号:</span>
												  <span>
													  <Input 
														value={this.state.tradeNo}
														onChange={this.onInputChange}
														placeholder="请输入" 
														allowClear/>
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

export default connect(
	null, 
	{
		updateLoading
	}
)(FlowingWater);