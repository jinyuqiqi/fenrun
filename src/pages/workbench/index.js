// const path = require("path")
import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { Base64 } from 'js-base64';
import message from '@/utils/message';
import { getHomeCount, getBankCardInfo, getAccountBalance } from '@/http/api';
import './index.css';

export default class WorkBench extends Component{
	constructor(props){
        super(props);
		this.state = {
			workbenchAuthInfo: {},
			userName: '',
			baseInfo: null,
			bankInfo: null,
			balance: null
		}
		let userInfo = Base64.decode(sessionStorage.getItem('userInfo'))
		userInfo =JSON.parse(userInfo) 
		this.state.userName = userInfo.sysUserVo.accountName
		
		const that = this
		let myAuthMenu = JSON.parse(Base64.decode(window.sessionStorage.getItem('myAuthMenu')))
		let workbenchAuth = myAuthMenu.filter(item => item.menuId === 1)
		let { workbenchAuthInfo } = this.state
		if(workbenchAuth.length){
			workbenchAuth[0].children.forEach(item=> {
				if(item.menuId===46){
					workbenchAuthInfo['audit'] = {}
					item.children.forEach(value=> {
						if(value.menuId===47)workbenchAuthInfo.audit['view'] = true
						if(value.menuId===6)workbenchAuthInfo.audit['operate'] = true
					})
				}
				if(item.menuId===39){
					workbenchAuthInfo['account'] = {}
					item.children.forEach(value=> {
						if(value.menuId===42)workbenchAuthInfo.account['withdraw'] = true
						if(value.menuId===43)workbenchAuthInfo.account['record'] = true
					})
				}
				if(item.menuId===40){
					workbenchAuthInfo['bankcard'] = {}
					item.children.forEach(value=> {
						if(value.menuId===44)workbenchAuthInfo.bankcard['add'] = true
						if(value.menuId===45)workbenchAuthInfo.bankcard['update'] = true
					})
				}
				if(item.menuId===41)workbenchAuthInfo['product'] = true
			})
		}
		let workbenchAuths = Base64.encode(JSON.stringify(workbenchAuthInfo))
		window.sessionStorage.setItem('workbenchAuths', workbenchAuths)
		this.state.workbenchAuthInfo = workbenchAuthInfo
    }
	
	componentWillMount(){
		const that = this
		that.fetchBaseInfo(that)
	}
 
	fetchBaseInfo = that => {
		if(that.state.workbenchAuthInfo.audit){
			getHomeCount().then(res=> {
				if(res.code===1){
					that.setState({
						baseInfo: res.data
					})
				}
			})
		}
		if(that.state.workbenchAuthInfo.bankcard){
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
						that.setState({
							bankInfo
						})
					}
				}
			})
		}
		if(that.state.workbenchAuthInfo.account){
			getAccountBalance().then(res=> {
				if(res.code===1){
					if(sessionStorage.getItem('balance')){
						sessionStorage.removeItem('balance')
					}
					let balance = Base64.encode(String(res.data));
					sessionStorage.setItem('balance', balance)
					that.setState({
						balance: res.data
					})
				}
			})
		}
	}
	
	routeTurns = (pathname, id=null) => {
		if(pathname==="withdraw"&&!this.state.bankInfo){
			message.error('请先添加银行卡')
			return
		}
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
								{
									this.state.workbenchAuthInfo.audit&&!this.state.workbenchAuthInfo.audit.view&&(
										<div className="billling pointer">
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
									)
								}
								{
									this.state.workbenchAuthInfo.audit&&this.state.workbenchAuthInfo.audit.view&&(
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
									)
								}
								{
									!this.state.workbenchAuthInfo.audit&&(<div className="billling pointer"></div>)
								}
							 </div>
							 {
								this.state.workbenchAuthInfo.account&&(
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
												{
													this.state.workbenchAuthInfo.account.withdraw&&(
														<span className="pointer" onClick={this.routeTurns.bind(this, 'withdraw', null)}>提现</span>
													)
												}
												{
													this.state.workbenchAuthInfo.account.withdraw&&this.state.workbenchAuthInfo.account.record&&(
														<span className="line"></span>
													)
												}
												{
													this.state.workbenchAuthInfo.account.record&&(
														<span className="pointer" onClick={this.routeTurns.bind(this, 'record', null)}>操作记录</span>
													)
												}
												
											</div>
										</div>
									</div>
								)
							 }
							 {
								!this.state.workbenchAuthInfo.account&&(
									<div className="account_wrap"></div>
								) 
							 }
						  </div>
					  </div>
				    </Col>
				    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
				      <div className="row_module">
						  <div className="row_inner row_inner_column flex_box flex_direction_column flex_between">
							  {
								  this.state.workbenchAuthInfo.product&&(
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
								  )
							  }
							  {
								 !this.state.workbenchAuthInfo.product&&(
									<div className="product_box" style={{background: 'transparent'}}></div>
								 )
							  }
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
							{
								this.state.workbenchAuthInfo.bankcard&&(
									<div className="bank_card_box">
										 <div className="bank_title flex_box flex_between">
											<span className="default_title">银行卡</span>
											{
												this.state.workbenchAuthInfo.bankcard.update&&this.state.bankInfo&&(
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
												this.state.bankInfo&&this.state.workbenchAuthInfo.bankcard.update&&(
													<div onClick={this.routeTurns.bind(this, 'bankcard', this.state.bankInfo.id)} 
														className="bank_card_wrap flex_box flex_direction_column flex_center pointer">
														<div className="large_title">{this.state.bankInfo.openBank}</div>
														<div className="default_title">{this.state.bankInfo.cardNumber}</div>
													</div>
												)
											}
											{
												this.state.bankInfo&&!this.state.workbenchAuthInfo.bankcard.update&&(
													<div className="bank_card_wrap flex_box flex_direction_column flex_center pointer">
														<div className="large_title">{this.state.bankInfo.openBank}</div>
														<div className="default_title">{this.state.bankInfo.cardNumber}</div>
													</div>
												)
											}
											{
												!this.state.bankInfo&&this.state.workbenchAuthInfo.bankcard.add&&(
													<div onClick={this.routeTurns.bind(this, 'bankcard', null)} 
														className="empty_card flex_box flex_direction_column flex_center pointer">
														<Icon type="plus" />
														<div className="mini_title">添加银行卡</div>
													</div>
												)
											}
										</div>
									</div>
								)
							}
							{
								!this.state.workbenchAuthInfo.bankcard&&(
									<div className="bank_card_box" style={{background: 'transparent'}}></div>
								)
							}
							  
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