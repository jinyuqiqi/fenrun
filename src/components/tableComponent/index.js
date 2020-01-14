import React, { Component } from 'react';
import { Table, Button } from 'antd';
import './index.css';
export default class TableComponent extends Component{
	constructor(props){
        super(props);
    }

	componentDidMount(){
		
	}
	

    render(){
        return(
            <div className="table_outer">
            	<Table 
            		columns={this.props.columns} 
            		dataSource={this.props.data} 
            		pagination={this.props.pagination}/>
            </div>
        )
    }
}