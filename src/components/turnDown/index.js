import React, { Component } from 'react';
import { Input } from 'antd';
import './index.css';
const { TextArea } = Input;

export default class TurnDown extends Component{
	constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="box_textarea">
			  <div className="textarea_title"><span>原因:</span></div>
			  <div>
				<TextArea rows={4} placeholder="请输入原因"/>
			  </div>
			</div>  
        )
    }
}