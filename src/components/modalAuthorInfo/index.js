import React, { Component } from 'react';
import { Modal, Button, Icon } from 'antd';
import './index.css';

export default class ModalAuthorInfo extends Component{
	constructor(props){
        super(props);
    }

    render(){
        return(
			<Modal
			  style={{ transform: 'translateY(-50%)', top: '50%'}}
			  title='授权信息'
			  visible={this.props.visible}
			  onOk={this.props.hideModal}
			  onCancel={this.props.hideModal}
			  footer={[
				  <Button key="confirm" type="primary" onClick={this.props.hideModal}>
					知道了
				  </Button>
			  ]}
			>
				<div className="audit_info">
				   <div className="info_item flex_box flex_between align_items_center">
						<div>
							<span className="mini_title">麦泊停车</span>
						</div>
						<div>
							<div className="with_padding"><span>账号: 2345645</span></div>
							<div className="with_padding"><span>密码: 54156465</span></div>
						</div>
				   </div>
				   <div className="info_item flex_box flex_between align_items_center">
						<div>
							<span className="mini_title">呼叫中心</span>
						</div>
						<div>
							<div className="with_padding"><span>账号: 2345645</span></div>
							<div className="with_padding"><span>密码: 54156465</span></div>
						</div>
				   </div>
				   <div className="info_item flex_box flex_between align_items_center">
						<div>
							<span className="mini_title">优惠券</span>
						</div>
						<div>
							<div className="with_padding"><span>账号: 2345645</span></div>
							<div className="with_padding"><span>密码: 54156465</span></div>
						</div>
				   </div>
				   <div className="info_item flex_box flex_between align_items_center">
						<div>
							<span className="mini_title">泊涟支付-互联互通</span>
						</div>
						<div>
							<div className="with_padding"><span>账号: 2345645</span></div>
							<div className="with_padding"><span>密码: 54156465</span></div>
						</div>
				   </div>
				   <div className="info_item flex_box flex_between align_items_center">
						<div>
							<span className="grey_color">请提示用户及时登录相关模块</span>
						</div>
						<div>
							<a className="a_btn" href="https://www.baidu.com" target="_blank">
								<Icon type="download" />下载授权详情
							</a>
						</div>
				   </div>
				</div> 
			</Modal>  
        )
    }
}