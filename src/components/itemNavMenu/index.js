import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import './index.css';

export default class ItemNavMenu extends Component{
	constructor(props){
        super(props);
    }

	componentDidMount(){
		console.log('mount')
	}
	
	switchNavMenu = e => {
		this.props.switchNavMenu(e.key)
	}

    render(){
        return(
            <div className="item_nav_menu">
				<Menu 
					onClick={this.switchNavMenu} 
					selectedKeys={[this.props.currentnavmenu]} 
					mode="horizontal">
					{
						this.props.itemnavmenu.map((item, index)=> {
							return (
								<Menu.Item key={item.id}>
								  {item.title}{item.num}
								</Menu.Item>
							)
						})
					}
				</Menu>
            </div>  
        )
    }
}