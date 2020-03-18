import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import TurnDown from'@/components/turnDown';
import RemitEntry from'@/components/remitEntry';
import './index.css';

export default class GlobalModal extends Component{
	constructor(props){
        super(props);
    }

    render(){
        return(
            <Modal
			  centered
			  title={this.props.title}
			  visible={this.props.visible}
			  onOk={this.props.hideModal}
			  onCancel={this.props.hideModal}
			  footer={[
				  <Button key="cancel" onClick={this.props.hideModal}>
					取消
				  </Button>,
				  <Button key="confirm" type="primary" onClick={this.props.hideModal}>
					确定
				  </Button>,
			  ]}
			>
			  {
				  this.props.dialog==='turndown'&& (
					<TurnDown></TurnDown>
				  )
			  }
			  {
				  this.props.dialog==='remit'&& (
					<RemitEntry></RemitEntry>
				  )
			  }
			</Modal>  
        )
    }
}