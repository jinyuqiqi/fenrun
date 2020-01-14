import React, { Component } from 'react'
import { Button, Input, Radio } from 'antd';
import message from '@/utils/message';
import { login } from '@/http/api';
import { testSpace } from '@/utils/tool';
import './index.css';
const errorText = '请输入正确的用户名或密码'
const uesrSpace = '用户名不能包含空格'
const passSpace = '密码不能包含空格'
const passLength = '密码长度为6-18位字符'
export default class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			errorUser: false,
			errorPass: false,
			userName: '',
			password: '',
			tipUserName: '',
			tipPassword: ''
		}
	}

	loginEvent = () => {
		if(!this.verifyParams()) return
		const { userName, password } = this.state
		login({
		  userName,
		  password
		}).then(res=> {
			if(res.code===1){
				window.sessionStorage.setItem('type', String(res.data.type))
				window.sessionStorage.setItem('roleId', String(res.data.roleId))
				window.sessionStorage.setItem('token', res.data.token)
				this.props.history.replace({pathname: '/index'})
			}
			if(res.code===1006){
				this.setState({
					errorUser: true,
					errorPass: true,
					tipUserName: errorText,
					tipPassword: errorText
				})
			}
		})
	}
	
	verifyParams(){
		if(this.state.userName===""||this.state.password===""){
			this.setState({
				errorUser: true,
				errorPass: true,
				tipUserName: errorText,
				tipPassword: errorText
			})
			return false
		}
		if(testSpace(this.state.userName)){
			this.setState({
				errorUser: true,
				tipUserName: uesrSpace
			})
			return false
		}
		if(testSpace(this.state.password)){
			this.setState({
				errorPass: true,
				tipPassword: passSpace
			})
			return false
		}
		if(this.state.password.length<6){
			this.setState({
				errorPass: true,
				tipPassword: passLength
			})
			return false
		}
		return true
	}
	
	onChange(id, e){
		e.persist();
		const { errorUser, errorPass } = this.state
		if(errorUser||errorPass){
			this.setState({
				errorUser: false,
				errorPass: false,
				tipUserName: '',
				tipPassword: ''
			})
		}
		this.setState({
			[id]: e.target.value
		})
	}

    render(){
        return(
            <div className="login_wrap">
				<div className="login_form">
					<div className="project_name">
						<div className="default_title">BEGINEERING  BUSINESS  MANAGEMENT</div>
						<div className="large_title">工程商管理</div>
					</div>
					<div className="form_items">
						<div>
							<div className="item_name flex_box flex_between">
								<span>账号</span> 
								{
									this.state.errorUser && (
										<span className="dangerous_color">{this.state.tipUserName}</span>
									)
								}
							</div>
							<div>
								<Input 
									value={this.state.userName} 
									onChange={(e) => this.onChange('userName', e)}
									placeholder="请输入用户名"/>
							</div>
						</div>
						<div>
							<div className="item_name flex_box flex_between">
								<span>密码</span>
								{
									this.state.errorPass && (
										<span className="dangerous_color">{this.state.tipPassword}</span>
									)
								}
							</div>
							<div>
								<Input.Password 
									value={this.state.password} 
									onChange={(e) => this.onChange('password', e)}
									maxLength={18}
									placeholder="请输入密码"/>
							</div>
						</div>
						<div className="password_set flex_box flex_between">
						{/*
							<Radio size="small">记住密码</Radio>
							<span className="theme_color pointer">忘记密码</span>
						*/}
							
						</div>
						<div>
							<Button onClick={this.loginEvent} type="primary" block>登录</Button>
						</div>
					</div>
				</div>
            </div>  
        )
    }
}