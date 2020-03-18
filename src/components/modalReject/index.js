import React, { Component } from 'react';
import { Modal, Button, Input } from 'antd';
import { trim } from '@/utils/tool';
import message from '@/utils/message';
import './index.css';

const { TextArea } = Input;

export default class ModalReject extends Component{
	constructor(props){
        super(props);
		this.state = {
			remark: ''
		}
    }
	
	onInputChange = e => {
		e.persist()
		this.setState({
			remark: e.target.value
		})
	}
	
	onSubmit = e => {
		if(trim(this.state.remark)===""){
			message.error('请输入驳回原因')
			return
		}
		this.props.onConfirm(this.state.remark)
	}

    render(){
        return(
            <Modal
			  centered
			  title='驳回'
			  visible={this.props.visible}
			  onCancel={this.props.onCancel}
			  footer={[
				  <Button key="cancel" onClick={this.props.onCancel}>
					取消
				  </Button>,
				  <Button key="confirm" type="primary" onClick={this.onSubmit}>
					确定
				  </Button>,
			  ]}
			>
				<div className="box_textarea">
				  <div className="textarea_title"><span>原因:</span></div>
				  <div>
					<TextArea 
						value={this.state.remark}
						onChange={this.onInputChange}
						rows={4} 
						maxLength={200}
						placeholder="请输入原因"/>
				  </div>
				</div> 
			</Modal>  
        )
    }
}