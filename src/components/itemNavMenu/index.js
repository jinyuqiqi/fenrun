import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import './index.css';

export default class ItemNavMenu extends Component{
	constructor(props){
        super(props);
    }

	componentDidMount(){
		
	}
	
	switchNavMenu = e => {
		this.props.switchNavMenu(e.key)
	}

    render(){
        return(
            <div className="item_nav_menu">
				<Menu 
					onClick={this.switchNavMenu} 
					selectedKeys={[String(this.props.currentnavmenu)]} 
					mode="horizontal">
					{
						this.props.itemnavmenu.map((item, index)=> {
							return (
								<Menu.Item key={String(item.id)}>
<<<<<<< HEAD
								  {item.title}{item.num}
=======
								  {item.title}({item.num})
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
								</Menu.Item>
							)
						})
					}
				</Menu>
            </div>  
        )
    }
}