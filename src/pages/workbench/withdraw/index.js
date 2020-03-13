import React, { Component } from 'react';
import { InputNumber, Button, Icon } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import ModalWithdraw from '@/components/modalWithdraw';
 import message from '@/utils/message';
import { Base64 } from 'js-base64';
import { onWithdraw, getWithMessage } from '@/http/api';
import { trim, testNum } from '@/utils/tool';
import './index.css';

export default class Withdraw extends Component{
	constructor(props){
        super(props);
		this.state = {
			visible: false,
			withdrawStatus: 0,
			breadcrumbList: [
				{
					path: '/index/workbench',
					title: '工作台'
				},
				{
					title: '我的账户'
				}
			],
			withdrawalAmount: '',
			cardNumber: '',
			verifyCode: '',
			openBank: '',
			balance: '',
			errorAmount: false,
			errorText: '',
		}
    }

	componentDidMount(){
		let balance = Base64.decode(sessionStorage.getItem('balance'))
		
		let bankInfo = Base64.decode(sessionStorage.getItem('bank'));
		bankInfo = JSON.parse(bankInfo);
		
		let openBank = bankInfo.openBank
		let cardNumber = bankInfo.cardNumber.replace(/(.{4})/g, "$1 ")
		this.setState({
			balance,
			openBank,
			cardNumber
		})
		
	}
	
	hideModal = () => {
		this.setState({
			visible: false
		})
	}
	
	submitEvent = verifyCode => {
		const that = this
		onWithdraw({
			withdrawalAmount: this.state.withdrawalAmount,
			cardNumber: this.state.cardNumber,
			verifyCode: verifyCode,
			openBank: this.state.openBank
		}).then(res=> {
			if(res.code===1){
				message.success('成功！')
				that.setState({
					visible: false,
					withdrawStatus: 1
				})
			}else{
				message.error(res.msg)
				
			}
			
		})
	}
	
	withDrawEvent = ()=> {
		if(!testNum(this.state.withdrawalAmount)){
			this.setState({
				errorAmount: true,
				errorText: '请输入提现金额'
			})
			return
		}
		if(Number(this.state.withdrawalAmount)>Number(this.state.balance)){
			this.setState({
				errorAmount: true,
				errorText: '输入金额不可大于可提现金额'
			})
			return
		}
		getWithMessage()
		this.setState({
			visible: true,
			// withdrawStatus: 1
		})
	}
	
	onInputChange = e => {
		console.log(e)
		if(isNaN(e)&&e!=="")return
		
		this.setState({
			errorAmount: false,
			withdrawalAmount: e
		})
	}
	
	routeEvent = path => {
		this.props.history.replace({pathname: path})
	}

    render(){
        return(
            <div className="container_wrap">
				<BreadCrumb breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				<div className="srcoll_box">
					<div className="srcoll_box_inner">
						<div className="inner_top_title flex_box flex_between">
							<span className="default_title">提现</span>
							<div></div>
						</div>
						{
							this.state.withdrawStatus===0 && (
								<div className="withdraw_box">
									<div className="withdraw_box_item flex_box flex_center">
										<span>提现银行卡:</span>
										<span>{this.state.cardNumber}</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>开户银行:</span>
										<span>{this.state.openBank}</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>可提现:</span>
										<span>{this.state.balance}元</span>
									</div> 
									<div className="withdraw_box_item flex_box flex_center align_items_center">
										<span>提现金额:</span>
										<span style={{position: "relative"}}>
											<div className="input_money" style={{width: '300px'}}>
												<InputNumber 
													min={0.01}
													placeholder="请输入"
													value={this.state.withdrawalAmount}
													onChange={this.onInputChange}/>
												<font className="unit">元</font>
											</div>
											{
												this.state.errorAmount&&(
													<b className="tips_b dangerous_color">{this.state.errorText}</b>
												)
											}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span></span>
										<span>预计24小时到账</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span></span>
										<span>
											<Button onClick={this.withDrawEvent} type="primary">确认提现</Button>
										</span>
									</div>
								</div>
							)
						}
						{
							this.state.withdrawStatus===1 && (
								<div className="withdraw_box">
									<div className="status_icon">
										<div><Icon type="check-circle" theme="filled" /></div>
										<div className="large_title">操作成功</div>
										<div className="withdraw_notice">
											<span>您已经操作成功，预计48小时内到达指定账</span>
										</div>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>收款账户:</span>
										<span>
											{this.state.cardNumber} {this.state.openBank}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>提现金额:</span>
										<span>{this.state.withdrawalAmount}元</span>
									</div>
									<div className="withdraw_bottom flex_box flex_center">
										<span>
											<Button onClick={this.routeEvent.bind(this, '/index')} type="primary">返回工作台</Button>
										</span>
										<span>
											<Button onClick={this.routeEvent.bind(this, '/index/workbench/record')}>查看记录</Button>
										</span>
									</div>
								</div>
							)
						}
					</div>
				</div>
				<ModalWithdraw 
					visible={this.state.visible}
					hideModal={this.hideModal}
					confirm={this.submitEvent}></ModalWithdraw>
            </div>  
        )
    }
}