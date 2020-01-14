import React, { Component } from 'react'
import {  NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
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
		}
	}

	componentDidMount(){
		console.log('mount')
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
            	<div className="admin_icon">
            		<i className="iconfont icon-yonghu"></i>&nbsp;
            		<span> admin</span>
            	</div>
				{/*
				<div className="tip_set">
					<div className="pointer">修改密码</div>
					<div className="pointer">退出登录</div>
				</div>
				*/}
            </Header>  
        )
    }
}