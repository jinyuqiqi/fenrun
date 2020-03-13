// const path = require("path")
import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
 import { Base64 } from 'js-base64';
import { getHomeCount, getBankCardInfo, getAccountBalance } from '@/http/api';
import './index.css';

export default class WorkBench extends Component{
	constructor(props){
        super(props);
		this.state = {
			userName: '',
			baseInfo: null,
			bankInfo: null,
			balance: null
		}
		let userInfo = Base64.decode(sessionStorage.getItem('userInfo'))
		userInfo =JSON.parse(userInfo) 
		this.state.userName = userInfo.sysUserVo.accountName
    }
 
	componentDidMount(){
		this.fetchBaseInfo()
	}
	
	fetchBaseInfo = () => {
		getHomeCount().then(res=> {
			if(res.code===1){
				this.setState({
					baseInfo: res.data
				})
			}
		})
		getBankCardInfo().then(res=> {
			if(res.code===1){
				if(res.data.length>0){
					if(sessionStorage.getItem('bank')){
						sessionStorage.removeItem('bank')
					}
					let bank = Base64.encode(JSON.stringify(res.data[0]));
					sessionStorage.setItem('bank', bank)
					let bankInfo = res.data[0]
					bankInfo.cardNumber = bankInfo.cardNumber.replace(/(.{4})/g, "$1 ")
					this.setState({
						bankInfo
					})
				}
			}
		})
		getAccountBalance().then(res=> {
			if(res.code===1){
				if(sessionStorage.getItem('balance')){
					sessionStorage.removeItem('balance')
				}
				let balance = Base64.encode(String(res.data));
				sessionStorage.setItem('balance', balance)
				this.setState({
					balance: res.data
				})
			}
		})
	}
	
	routeTurns = (pathname, id=null) => {
		if(id){
			this.props.history.replace({pathname: `/index/workbench/${pathname}`, state: {id: id}})
			return
		}
		this.props.history.replace({pathname: `/index/workbench/${pathname}`})
	}

    render(){
		const { baseInfo } = this.state
        return(
            <div className="container_page">
				<Row>
				    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
				      <div className="row_module">
						  <div className="row_inner">
							 <div className="flex_box flex_between">
								<div className="customer">
									<div>杭州心爱电子科技公司</div>
									<div className="medium_title">你好, {this.state.userName}</div>
								</div>
								<div className="billling pointer" onClick={this.routeTurns.bind(this, 'audit', null)}>
									<div><span>待审核</span></div>
									{
										baseInfo&&(
											<div className="num_large">{baseInfo.reviewCount} </div>
										)
									}
									{
										!baseInfo&&(
											<div className="num_large">XXX</div>
										)
									}
								</div>
							 </div>
							 <div className="account_wrap">
								<div className="my_account">
									<div className="default_title">我的账户</div>
									{
										this.state.balance!==null&&(
											<div className="num_giant">¥{this.state.balance}</div>
										)
									}
									{
										this.state.balance===null&&(
											<div className="num_giant">XXX</div>
										)
									}
								</div>
								<div className="account_log">
									<div><i className="iconfont icon-anquan"></i> 账户安全</div>
									<div className="flex_box align_items_center">
										<span className="pointer" onClick={this.routeTurns.bind(this, 'withdraw', null)}>提现</span>
										<span className="line"></span>
										<span className="pointer" onClick={this.routeTurns.bind(this, 'record', null)}>操作记录</span>
									</div>
								</div>
							 </div>
						  </div>
					  </div>
				    </Col>
				    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
				      <div className="row_module">
						  <div className="row_inner row_inner_column flex_box flex_direction_column flex_between">
							  <div className="product_box">
								 <h4 className="default_title">我的产品</h4>
								 <div className="flex_box flex_between">
									<div className="product_wrap flex_box flex_direction_column align_items_center flex_center pointer">
										<div className="default_title">麦泊停车智慧管理平台</div>
									</div>
									<div className="product_wrap flex_box flex_direction_column align_items_center flex_center pointer">
										<div className="default_title">劳益宝工人管理平台</div>
									</div>
								 </div>
							  </div>
							  <div className="product_num">
								 <div className="pro_detail flex_box flex_direction_column flex_center pointer">
									<div className="default_title">已售产品数量</div>
									{
										baseInfo&&(
											<div className="num_giant">{baseInfo.orderInfoCount}</div>
										)
									}
									{
										!baseInfo&&(
											<div className="num_giant">XXXX</div>
										)
									}
								 </div>
							  </div>
						  </div>
					  </div>
				    </Col>
				    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
				      <div className="row_module">
						  <div className="row_inner row_inner_column flex_box flex_direction_column flex_between">
							  <div className="bank_card_box">
								 <div className="bank_title flex_box flex_between">
									<span className="default_title">银行卡</span>
									{
										this.state.bankInfo&&(
											<span 
												className="default_color pointer"
												onClick={this.routeTurns.bind(this, 'bankcard', this.state.bankInfo.id)}>修改信息</span>
										)
									}
									{
										!this.state.bankInfo&&(
											<span></span>
										)
									}
								 </div>
								 <div>
									{
										this.state.bankInfo&&(
											<div onClick={this.routeTurns.bind(this, 'bankcard', this.state.bankInfo.id)} 
												className="bank_card_wrap flex_box flex_direction_column flex_center pointer">
												<div className="large_title">{this.state.bankInfo.openBank}</div>
												<div className="default_title">{this.state.bankInfo.cardNumber}</div>
											</div>
										)
									}
									{
										!this.state.bankInfo&&(
											<div onClick={this.routeTurns.bind(this, 'bankcard', null)} 
												className="empty_card flex_box flex_direction_column flex_center pointer">
												<Icon type="plus" />
												<div className="mini_title">添加银行卡</div>
											</div>
										)
									}
									
								</div>
							  </div>
							  <div className="bank_card_num">
								 <div className="bank_detail flex_box flex_direction_column flex_center pointer">
									<div className="default_title">工程商数量</div>
									{
										baseInfo&&(
											<div className="num_giant">{baseInfo.contractorsCount}</div>
										)
									}
									{
										!baseInfo&&(
											<div className="num_giant">XXXX</div>
										)
									}
								 </div>
							  </div>
						  </div>
					  </div>
				    </Col>
				  </Row>
            </div>  
        )
    }
}