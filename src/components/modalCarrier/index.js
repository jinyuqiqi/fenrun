import React, { Component } from 'react';
import { Modal, Button, Input, Cascader, Select, Radio } from 'antd';
import options from '@/utils/city';
import message from '@/utils/message';
import { trim, testPhone, testNumber, testIdCard, testIdCardInput } from '@/utils/tool';
import './index.css';

const { TextArea } = Input;
const { Option } = Select;

export default class ModalCarrier extends Component{
	constructor(props){
        super(props);
		this.state = {
			customerName: '',
			linkPhone: '',
			cardNo: '',
			companyName: '',
			addressId: [],
			province: '',
			city: '',
			area: '',
			address: ''
		}
    }
	
	onCityCodeChange = (value, option) => {
		let { province, city, area, addressId } = this.state
		if(option.length){
			province = option[0].label
			city = option[1].label
			area = option[2].label
		}
		addressId = value;
		this.setState({
			province,
			city,
			area,
			addressId
		})
	}
	
	onInputChange = (name, e) => {
		e.persist()
		if(name==='linkPhone'&&!testNumber(e.target.value)&&e.target.value!=="") return 
		
		if(name==='cardNo'&&!testIdCardInput(e.target.value)&&e.target.value!=="") return
		this.setState({
			[name]: e.target.value
		})
	}
	
	onConfirm = () => {
		if(!this.verifyParams()) return
		
		let params = {
			customerName: this.state.customerName,
			linkPhone: this.state.linkPhone,
			companyName: this.state.companyName,
			province: this.state.province,
			city: this.state.city,
			area: this.state.area,
			address: this.state.address
		}
		if(this.state.cardNo!=="") params["cardNo"] = this.state.cardNo
		
		this.props.onConfirm(params)
	}
	
	verifyParams = () => {
		if(trim(this.state.customerName)===""){
			message.error('请输入管理员名称')
			return false
		}
		if(trim(this.state.linkPhone)===""){
			message.error('请输入联系方式')
			return false
		}
		if(trim(this.state.companyName)===""){
			message.error('请输入公司名称')
			return false
		}
		if(this.state.addressId.length<=0){
			message.error('请选择公司地址')
			return false
		}
		if(trim(this.state.address)===""){
			message.error('请输入公司详细地址')
			return false
		}
		if(!testPhone(this.state.linkPhone)){
			message.error('请输入正确的联系方式')
			return false
		}
		if(this.state.cardNo!==""&&!testIdCard(this.state.cardNo)){
			message.error('请输入正确身份证号码')
			return false
		}
		return true
	}

    render(){
        return(
            <Modal
			  centered
			  title='添加客户'
			  visible={this.props.visible}
			  onCancel={this.props.onCancel}
			  footer={[
				  <Button key="cancel" onClick={this.props.onCancel}>
					取消
				  </Button>,
				  <Button key="confirm" type="primary" onClick={this.onConfirm}>
					确定
				  </Button>,
			  ]}
			>
				  <div className="modal_content">
					   <div className="item_box flex_box flex_between half_item_box">
							<div>
								<div className="item_txt"><span>*管理员名称:</span></div>
								<div>
									<span>
										<Input 
											type="text" 
											value={this.state.customerName}
											onChange={this.onInputChange.bind(this, 'customerName')}
											placeholder="请输入"/>
									</span>
								</div>
							</div>
							<div>
								<div className="item_txt"><span>*联系方式:</span></div>
								<div>
									<span>
										<Input
											type="text" 
											value={this.state.linkPhone}
											onChange={this.onInputChange.bind(this, 'linkPhone')}
											placeholder="请输入"/>
									</span>
								</div>
							</div>
					   </div>
					   <div className="item_box flex_box flex_between half_item_box">
							<div>
								<div className="item_txt"><span>身份证号:</span></div>
								<div>
									<span>
										<Input
											value={this.state.cardNo}
											onChange={this.onInputChange.bind(this, 'cardNo')}
											placeholder="请输入"/>
									</span>
								</div>
							</div>
							<div>
								<div className="item_txt"><span>*公司名称:</span></div>
								<div>
									<span>
										<Input
											value={this.state.companyName}
											onChange={this.onInputChange.bind(this, 'companyName')}
											placeholder="请输入"/>
									</span>
								</div>
							</div>
					   </div>
					   <div className="item_box">
							<div>
								<div className="item_txt"><span>*公司地址:</span></div>
								<div>
									<span>
										<Cascader
											options={options}
											 value={this.state.addressId}
											 onChange={this.onCityCodeChange}
											 placeholder="请选择"/>
									</span>
								</div>
								<div style={{marginTop: '20px'}}>
									<span>
										<TextArea 
											rows={4}
											value={this.state.address}
											onChange={this.onInputChange.bind(this, 'address')}
											placeholder="请输入详细地址"/>
									</span>
								</div>
							</div>
					   </div>
					   <div className="item_box">
							<div className="text_wrap">
								<p>账号及密码：添加运营商成功后，该运营商的登录账号为管理员联系电话号码</p>
								<p>初始密码：123456</p>
								<p>请提示管理员及时修改密码</p>
							</div>
					   </div>
				  </div>
			</Modal>  
        )
    }
}