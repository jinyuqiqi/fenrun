import React, { Component } from 'react';
import { Spin, Input, Button } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import { testNumber, testSpace, trim } from '@/utils/tool';
import { updatePassWord } from '@/http/api';
import message from '@/utils/message';
import './index.css'

export default class ResetPassword extends Component{
	constructor(props){
        super(props);
		this.state = {
			oldpass: '',
			newpass: '',
			surepass: '',
			checkParam: {
				oldpass: false,
				newpass: false,
				surepass: false,
			},
			disabled: false,
			breadcrumbList: [
				{
					title: '修改密码'
				}
			],
		}
    }
	
	componentDidMount(){
		
	}
	
	verify = () => {
		let result = true
		let { checkParam } = this.state
		if(trim(this.state.oldpass)===""||testSpace(this.state.oldpass)){
			result = false
			checkParam.oldpass = true
		}
		if(trim(this.state.newpass)===""||testSpace(this.state.newpass)){
			result = false
			checkParam.newpass = true
		}
		if(this.state.surepass!==this.state.newpass){
			result = false
			checkParam.surepass = true
		}
		this.setState({
			checkParam
		})
		return result
	}
	
	submit = () => {
		if(!this.verify()) return
		
		this.setState({
			disabled: true
		})
		
		updatePassWord({oldPassword: this.state.oldpass, password: this.state.newpass}).then(res=> {
			if(res.code===1){
				message.success('成功！')
				this.setState({
					oldpass: '',
					newpass: '',
					surepass: '',
					disabled: false
				})
				return
			}
			this.setState({
				disabled: false
			})
		}).catch(err=> {
			this.setState({
				disabled: false
			})
		})
	}
	
	onInputChange = (name, e) => {
		e.persist()
		let { checkParam } = this.state
		checkParam[name] = false
		this.setState({
			checkParam,
			[name]: e.target.value
		})
	}
	
    render(){
        return(
            <div className="container_wrap">
				<BreadCrumb
					breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				<div className="srcoll_box">
					<div className="srcoll_box_inner">
						<div className="inner_top_title flex_box flex_between">
							<span className="default_title">修改密码</span>
							<div></div>
						</div>
					</div>
					<div className="main_form">
						<div className="item_pass">
							<div className="flex_box flex_between">
								<span>请输入旧密码</span>
								<span className="dangerous_color">
									{this.state.checkParam.oldpass&&'密码长度为6-18位字符（不能包含空格）'}
								</span>
							</div>
							<div>
								<Input.Password 
									value={this.state.oldpass}
									onChange={this.onInputChange.bind(this, 'oldpass')}
									placeholder="请输入旧密码"
									maxLength={18}/>
							</div>
						</div>
						<div className="item_pass">
							<div className="flex_box flex_between">
								<span>请输入新密码</span>
								<span className="dangerous_color">
									{this.state.checkParam.newpass&&'密码长度为6-18位字符（不能包含空格）'}
								</span>
							</div>
							<div>
								<Input.Password 
									value={this.state.newpass}
									onChange={this.onInputChange.bind(this, 'newpass')}
									placeholder="请输入新密码"
									maxLength={18}/>
							</div>
						</div>
						<div className="item_pass">
							<div className="flex_box flex_between">
								<span>请确认新密码</span>
								<span className="dangerous_color">
									{this.state.checkParam.surepass&&'两次密码不一致'}
								</span>
							</div>
							<div>
								<Input.Password 
									value={this.state.surepass}
									onChange={this.onInputChange.bind(this, 'surepass')}
									placeholder="请确认新密码"
									maxLength={18}/>
							</div>
						</div>
						<div className="item_pass">
							<Button 
								style={{width: '100%', height: '36px', marginTop: '12px'}}
								type="primary" 
								block
								disabled={this.state.disabled}
								onClick={this.submit}>确认修改</Button>
						</div>
					</div>
				</div>
            </div>  
        )
    }
}


