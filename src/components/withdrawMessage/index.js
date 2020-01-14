import React, { Component } from 'react';
import { InputNumber } from 'antd';
import './index.css';

export default class WithdrawMessage extends Component{
	constructor(props){
        super(props);
    }
	
	onChange = e=> {
		console.log(e)
	}

    render(){
        return(
            <div className="box_withdraw">
				<div className="withdraw_notice">系统已发送短信验证码至131****00</div>
				<div>
					<div className="withdraw_title"><span>验证码:</span></div>
					<div>
						<InputNumber placeholder="请输入手机验证码"/>
					</div>
				</div>
			</div>  
        )
    }
}