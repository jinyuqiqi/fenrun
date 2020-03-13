import React, { Component } from 'react';
import { Modal, Button, Input } from 'antd';
import { Base64 } from 'js-base64';
import { testNumber } from '@/utils/tool';
import './index.css';

export default class ModalWithdraw extends Component{
	constructor(props){
        super(props);
		this.state = {
			verifyCode: '',
			userPhone: ''
		}
    }
	
	componentDidMount(){
		let userInfo = JSON.parse(Base64.decode(sessionStorage.getItem('userInfo')));
		let userPhone = userInfo.secretPhone.substr(0,3) + "****" + userInfo.secretPhone.substr(7)
		this.setState({
			userPhone
		})
	}
	
	clickConfirm = () => {
		this.props.confirm(this.state.verifyCode)
	}
	
	onInputChange = e => {
		e.persist()
		if(!testNumber(e.target.value)&&e.target.value!=="") return
		
		this.setState({
			verifyCode: e.target.value
		})
	}

    render(){
        return(
            <Modal
			  centered
			  title='短信验证'
			  visible={this.props.visible}
			  onCancel={this.props.hideModal}
			  footer={[
				  <Button key="cancel" onClick={this.props.hideModal}>
					取消
				  </Button>,
				  <Button key="confirm" type="primary" onClick={this.clickConfirm}>
					确定
				  </Button>,
			  ]}
			>
				<div className="box_withdraw">
					<div className="withdraw_notice">系统已发送短信验证码至{this.state.userPhone}</div>
					<div>
						<div className="withdraw_title"><span>验证码:</span></div>
						<div>
							<Input 
								value={this.state.verifyCode}
								onChange={this.onInputChange}
								placeholder="请输入手机验证码"/>
						</div>
					</div>
				</div>  
			</Modal>  
        )
    }
}