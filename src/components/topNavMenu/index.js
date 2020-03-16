import React, { Component } from 'react'
import {  NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
 import { Base64 } from 'js-base64';
import './index.css';
const { Header } = Layout;
const funcStyle = (icon)=> {
	return {
		backgroundImage: `url(${icon})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100%'
	}
}

export default class TopNavigationBar extends Component{
	constructor(props){
	    super(props);
		this.state = {
			logoText: '工程商管理',
			setting: false,
			userName: ''
		}
		
		let userInfo = Base64.decode(sessionStorage.getItem('userInfo'))
		userInfo =JSON.parse(userInfo) 
		this.state.userName = userInfo.sysUserVo.accountName
	}
	
	showSetting = () => {
		let setting  = !this.state.setting
		this.setState({
			setting
		})
	}
	
	logout = () => {
		sessionStorage.clear()
		this.props.history.replace({pathname: '/login'})
	}
	
	resetPass = () => {
		this.setState({
			setting: false
		})
		this.props.history.replace({pathname: '/index/resetpassword'})
		
	}

    render(){
        return(
            <Header>
                <div className="logo">
            		<div className="logo_text">
            			<span>
            			{
            				this.state.logoText.split('').map((item, index)=> {
            					return <font key={index}>{item}</font>
            				})
            			}
            			</span>
            			<span>GONGCHENGSHANGGUANLI</span>
            		</div>
            	</div>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={[this.props.path]}
					selectedKeys={[this.props.path]}
                    style={{ lineHeight: '60px' }}
                >
            		{
            			this.props.menuList.map((item, index)=> {
            				return (
            					<Menu.Item key={item.path}>
									<NavLink to={item.path}>
										<div className="m_item">
											<span style={funcStyle(item.icon)}></span>
											{item.title}
										</div>
									</NavLink>
            					</Menu.Item>
            				)
            			})
            		}
                </Menu>
            	<div className="admin_icon" onClick={this.showSetting}>
            		<i className="iconfont icon-yonghu"></i>&nbsp;
            		<span> {this.state.userName}</span>
            	</div>
				{
					this.state.setting&&(
						<div className="tip_set">
							<div onClick={this.resetPass} className="pointer">修改密码</div>
							<div onClick={this.logout} className="pointer">退出登录</div>
						</div>
					)
				}
            </Header>  
        )
    }
}