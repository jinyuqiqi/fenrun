import React, { Component } from 'react';
import { Modal, Button, Input, InputNumber } from 'antd';
import { trim, testNumber } from '@/utils/tool';
 import message from '@/utils/message';
import './index.css';

export default class ModalRemit extends Component{
	constructor(props){
        super(props);
		this.state = {
			amount: '',
			serialNumber: ''
		}
    }
	
	onSubmit = () => {
		if(trim(this.state.amount)===""){
			message.error('请输入实际打款金额')
			return
		}
		if(trim(this.state.serialNumber)===""){
			message.error('请输入流水号')
			return
		}
		let p = {
			amount: this.state.amount,
			serialNumber: this.state.serialNumber
		}
		this.props.onConfirm(p)
	}
	
	onInputChange = e => {
		if(isNaN(e)&&e!=="")return
		
		this.setState({
			amount: e
		})
	}
	
	onInputChange2 = e => {
		e.persist()
		if(!testNumber(e.target.value)&&e.terget.value!=="") return
		this.setState({
			serialNumber: e.target.value
		})
	}

    render(){
        return(
            <Modal
			  centered
			  width={580}
			  title='提现转账录入'
			  visible={this.props.visible}
			  onCancel={this.props.onCancel}
			  footer={[
				  <Button key="cancel" onClick={this.props.onCancel}>
					取消
				  </Button>,
				  <Button key="confirm" type="primary" onClick={this.onSubmit}>
					确定
				  </Button>,
			  ]}
			>
				<div className="box_remit">
					{
						this.props.remitInfo&&(
							<div className="list_item">
								<div className="item flex_box flex_center">
									<span>提现金额: </span>
									<span>{this.props.remitInfo.withdrawalAmount}</span>
								</div>
								<div className="item flex_box flex_center">
									<span>收款账号: </span>
									<span>{this.props.remitInfo.cardNumber}</span>
								</div>
								<div className="item flex_box flex_center">
									<span>开户行: </span>
									<span>{this.props.remitInfo.openBank}</span>
								</div>
								<div className="item flex_box flex_center">
									<span>转账类型: </span>
									<span>{this.props.remitInfo.bankTypeText}</span>
								</div>
							</div>
						)
					}
				    <div className="remit_form flex_box flex_between">
						<div className="remit_form_item">
							<div className="remit_form_tle">*实际打款金额：</div>
							<div className="input_money">
								<InputNumber 
									min={0.01} 
									precision={2} 
									value={this.state.amount}
									placeholder="请输入"
									onChange={this.onInputChange}/>
								<span className="unit">元</span>
							</div>
						</div>
						<div className="remit_form_item">
							<div className="remit_form_tle">*流水号：</div>
							<div><Input value={this.state.serialNumber} onChange={this.onInputChange2}/></div>
						</div>
					</div>
				</div>
			</Modal>  
        )
    }
}