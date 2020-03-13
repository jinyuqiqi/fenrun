import React, { Component } from 'react';
import { Row, Col, Button, Icon, Input } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateLoading } from '@/store/reducer/action';
import BreadCrumb from '@/components/breadcrumb';
import TableComponent from '@/components/tableComponent';
import { getBusinessOrder, getBusinessAmount } from '@/http/api';
import './index.css';

class BusinessBill extends Component{
	constructor(props){
        super(props);
		this.state = {
			breadcrumbList: [
				{
					title: '对账中心',
					path: '/index/billingcenter/salesbill',
				},
				{
					title: '业务订单',
				}
			],
			columns: [
			  {
				title: '编号',
				dataIndex: 'businessOrderSn',
			  },
			  {
				title: '订单编号',
				dataIndex: 'parkingOrderSn'
			  },
			  {
			  	title: '工程商',
			  	dataIndex: 'contractorId'
			  },
			  {
				title: '支付方式',
				dataIndex: 'payTypeText',
			  },
			  {
				title: '交易流水号', 
				dataIndex: 'tradeNo',
			  },
			  {
				title: '车场',
				dataIndex: 'parkingName',
			  },
			  {
				title: '车牌',
				dataIndex: 'cardNo',
			  },
			  {
				title: '进场时间',
				dataIndex: 'parkingInTime',
			  },
			  {
				title: '出场时间',
				dataIndex: 'parkingOutTime',
			  },
			  {
				title: '停车时长',
				dataIndex: 'continueTime',
			  },
			  {
				title: '订单金额',
				dataIndex: 'amount',
			  },
			  {
				title: '分润金额',
				dataIndex: 'shareTotalAmount',
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
			searchBoxFold: true,
			amount: 0
		}
		
		this.fetchAllOrder(true)
    }
	
	static propTypes = {
		updateLoading: PropTypes.func,
	}

	componentWillMount(){
		getBusinessAmount().then(res=> {
			if(res.code===1){
				this.setState({
					amount: res.data
				})
			}
		})
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
	
	fetchAllOrder = (init=false) => {
		let loading = true
		let params = {
			pageNum: this.state.pagination.current,
			pageSize: this.state.pagination.pageSize
		}
		
		this.props.updateLoading(loading)
		getBusinessOrder(params).then(res=> {
			console.log(res)
			if(res.code===1){
				let { pagination } = this.state
				let tableList = res.data.list.map((item, index)=> {
					item["key"] = item.businessOrderId;
					item['parkingInTime'] = item.parkingInTime?item.parkingInTime.replace(/T/g, " ").replace(/\.000\+0000/g, ""):'';
					item['parkingOutTime'] = item.parkingOutTime?item.parkingOutTime.replace(/T/g, " ").replace(/\.000\+0000/g, ""):'';
					item["payTypeText"] = item.payType===1?'支付宝':(item.payType===2?'微信':'其他');
					item['amount'] = item.amount + '元';
					item['shareAdvertAmount'] = item.shareAdvertAmount + '元'; 
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
        return( 
            <div className="container_wrap">
				<BreadCrumb 
					isRight={true}
					breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				<div className="srcoll_box">
					<div className="srcoll_box_inner">
						<div>
							<div className="inner_outter">
								<div className="inner_top_title flex_box flex_between">
									<span className="default_title">总计</span>
									<span className="default_title">{this.state.amount}元</span>
								</div>
							</div>
							
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

export default connect(null,{
		updateLoading
	}
)(BusinessBill);
