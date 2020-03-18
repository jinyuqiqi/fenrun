import React, { Component } from 'react';
import { Modal, Button, Input, Cascader, Select, Radio } from 'antd';
import { addStaff, getAllRoles, resetPasswod} from '@/http/api';
import { trim, testSpace, testPhone, testNumber } from '@/utils/tool';
import message from '@/utils/message';
import './index.css';

const { TextArea } = Input;
const { Option } = Select;
const staffSpace = '人员名称不能包含空格'
const staffEmpty ='人员名称不能为空'

export default class ModalStaff extends Component{
	constructor(props){
        super(props);
		this.state = {
			roleId: null,
			staffName: '',
			linkPhone: '',
			disabled: false,
			error_staff: false,
			error_staff_tip: '',
			error_roleId: false,
			error_phone: false,
			newPassword: '',
			confirmPassword: '',
			error_pass: false,
			error_confirm: false,
			
		}
    }
	
	onChange = e => {
		this.setState({
			roleId: e
		})
		if(this.state.error_roleId){
			this.setState({
				error_roleId: false
			})
		}
	}
	
	onInputChange = (id, e) => {
		e.persist();
		if(id==="linkPhone"&&!testNumber(e.target.value)&&e.target.value!=='')return
		this.setState({
			[id]: e.target.value
		})
		this.resetErrorStatus(this.props.affairId)
		
	}
	
	resetErrorStatus = affairId => {
		if(affairId===0){
			if(this.state.error_pass||this.state.error_confirm){
				this.setState({
					error_pass: false,
					error_confirm: false
				})
			}
		}
		if(affairId===1){
			if(this.state.error_staff||this.state.error_phone){
				this.setState({
					error_phone: false,
					error_staff: false
				})
			}
		}
	}
	
	hideModal = (e) => {
		e.persist()
		this.props.hideModal()
	}
	
	submitEvent = (e) => {
		e.persist()
		const that = this
		const verify = this.verifyParams()
		if(!verify) return
		that.setState({
			disabled: true
		})
		if(this.props.affairId===0)this.passwordRequest(verify)
		
		if(this.props.affairId===1)this.staffRequest(verify)
	}
	
	staffRequest = params => {
		const that = this
		addStaff(params)
		.then(that.requestCallback)
		.catch(error=> {
			that.setState({
				disabled: false
			})
		})
	}
	
	passwordRequest = params => {
		const that = this
		resetPasswod(params)
		.then(that.requestCallback)
		.catch(error=> {
			that.setState({
				disabled: false
			})
		})
	}
	
	requestCallback = res => {
		const that = this
		if(res.code===1){
			that.clearForm()
			that.props.hideModal(1)
			message.success('成功')
			that.setState({
				disabled: false
			})
		}else{
			that.setState({
				disabled: false
			})
		}
	}
	
	verifyParams(){
		if(this.props.affairId===0){
			if(this.state.newPassword===""){
				this.setState({
					error_pass: true
				})
				return false
			}
			if(this.state.newPassword.length<6){
				this.setState({
					error_pass: true
				})
				return false
			}
			if(testSpace(this.state.newPassword)){
				this.setState({
					error_pass: true
				})
				return false
			}
			if(this.state.confirmPassword!==this.state.newPassword){
				this.setState({
					error_confirm: true
				})
				return false
			}
			return {
				userId: this.props.userId,
				password: this.state.newPassword
			}
		}
		if(this.props.affairId===1){
			if(this.state.staffName===""){
				this.setState({
					error_staff: true,
					error_staff_tip: staffEmpty
				})
				return false
			}
			if(testSpace(this.state.staffName)){
				this.setState({
					error_staff: true,
					error_staff_tip: staffSpace
				})
				return false
			}
			if(!this.state.roleId){
				this.setState({
					error_roleId: true
				})
				return false
			}
			if(trim(this.state.linkPhone)!==''&&!testPhone(this.state.linkPhone)){
				this.setState({
					error_phone: true
				})
				return false
			}
			return {
				userName: this.state.staffName,
				roleId: this.state.roleId,
				linkPhone: this.state.linkPhone
			}
		}
	}
	
	clearForm = () => {
		this.setState({
			roleId: null,
			staffName: '',
			linkPhone: '',
			newPassword: '',
			confirmPassword: ''
		})
	}

    render(){
        return(
            <Modal
			  centered
			  title={this.props.affairId?'添加人员':'重置密码'}
			  visible={this.props.visible}
			  onCancel={this.hideModal}
			  footer={[
				  <Button 
					key="cancel" 
					onClick={this.hideModal}>
					取消
				  </Button>,
				  <Button 
					key="confirm" 
					type="primary" 
					disabled={this.state.disabled}
					onClick={this.submitEvent}>
					确定
				  </Button>
			  ]}
			>
				{
					this.props.affairId===1&&(
						<div className="modal_content">
						   <div className="item_box">
								<div>
									<div className="item_txt flex_box flex_between">
										<span>*人员名称:</span>
										{
											this.state.error_staff&&(
												<span className="dangerous_color">{this.state.error_staff_tip}</span>
											)
										}
									</div>
									<div>
										<span>
											<Input
												value={this.state.staffName}
												onChange={(e) => this.onInputChange('staffName', e)}
												maxLength={12}
												placeholder="请输入"/>
										</span>
									</div>
								</div>
						   </div>
						   <div className="item_box">
								<div>
									<div className="item_txt flex_box flex_between">
										<span>*角色:</span>
										{
											this.state.error_roleId&&(
												<span className="dangerous_color">请选择角色</span>
											)
										}
									</div>
									<div>
										<span>
											<Select 
												value={this.state.roleId}
												onChange={this.onChange}>
												{
													this.props.roleList.length && this.props.roleList.map(item=> {
														return (
															<Option key={item.roleId} value={item.roleId}>{item.roleName}</Option>
														)
													})
												}
											</Select>
										</span>
									</div>
								</div>
						   </div>
						   <div className="item_box">
								<div>
									<div className="item_txt flex_box flex_between">
										<span>*联系方式:</span>,
										{
											this.state.error_phone&&(
												<span className="dangerous_color">请输入正确的联系方式</span>
											)
										}
									</div>
									<div>
										<span>
											<Input 
												value={this.state.linkPhone}
												onChange={(e) => this.onInputChange('linkPhone', e)}
												placeholder="请输入"/>
										</span>
									</div>
								</div>
						   </div>
						   <div className="item_box">
								<div className="text_wrap">
									<p>账号及密码：添加人员成功后，该人员的账号系统自动生成. 初始密码：123456, 请提示员工及时修改密码</p>
								</div>
						   </div>
						</div>
					)
				}
				{
					this.props.affairId===0&&(
						<div className="modal_content">
						   <div className="item_box">
								<div>
									<div className="item_txt flex_box flex_between">
										<span>*请输入新密码:</span>,
										{
											this.state.error_pass&&(
												<span className="dangerous_color">请输入6-18位新密码(不能包含空格)</span>
											)
										}
									</div>
									<div>
										<span>
											<Input.Password 
												value={this.state.newPassword}
												onChange={(e) => this.onInputChange('newPassword', e)}
												maxLength={18}
												placeholder="请输入"/>
										</span>
									</div>
								</div>
						   </div>
						   <div className="item_box">
								<div>
									<div className="item_txt flex_box flex_between">
										<span>*请确认新密码:</span>
										{
											this.state.error_confirm&&(
												<span className="dangerous_color">两次密码不一致</span>
											)
										}
									</div>
									<div>
										<span>
											<Input.Password 
												value={this.state.confirmPassword}
												onChange={(e) => this.onInputChange('confirmPassword', e)} 
												maxLength={18}
												placeholder="请输入"/>
										</span>
									</div>
								</div>
						   </div>
						   <div className="item_box">
								<div className="text_wrap">
									<p>账号及密码：添加人员成功后，该人员的账号系统自动生成. 初始密码：123456, 请提示员工及时修改密码</p>
								</div>
						   </div>
						</div>
					)
				}
			</Modal>  
        )
    }
}