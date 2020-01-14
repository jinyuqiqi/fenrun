import React, { Component } from 'react';
import { Input, InputNumber } from 'antd';
import './index.css';

export default class RemitEntry extends Component{
	constructor(props){
        super(props);
    }
	
	onChange = e=> {
		console.log(e)
	}

    render(){
        return(
            <div className="box_remit">
				<div className="list_item">
					<div className="item flex_box flex_center">
						<span>提现银行卡: </span>
						<span>1234 5678 9087 1243</span>
					</div>
					<div className="item flex_box flex_center">
						<span>开户银行: </span>
						<span>中国人民银行</span>
					</div>
					<div className="item flex_box flex_center">
						<span>开户行: </span>
						<span>中国人民银行文三路支行</span>
					</div>
					<div className="item flex_box flex_center">
						<span>转账类型: </span>
						<span>对公</span>
					</div>
				</div>
			    <div className="remit_form flex_box flex_between">
					<div className="remit_form_item">
						<div className="remit_form_tle">*实际打款金额：</div>
						<div className="input_money">
							<InputNumber 
								min={0.01} 
								precision={2} 
								placeholder="请输入"
								onChange={this.onChange}/>
							<span className="unit">元</span>
						</div>
					</div>
					<div className="remit_form_item">
						<div className="remit_form_tle">*流水号：</div>
						<div><Input /></div>
					</div>
				</div>
			</div>  
        )
    }
}