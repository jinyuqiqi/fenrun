import React, { Component } from 'react';
import { InputNumber, Button, Icon } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import GlobalModal from '@/components/globalModal';
import './index.css';

export default class Withdraw extends Component{
	constructor(props){
        super(props);
		this.state = {
			title: '短信验证',
			dialog: 'withdraw',
			visible: false,
			withdrawStatus: 0,
			breadcrumbList: [
				{
					path: '/index/workbench',
					title: '工作台'
				},
				{
					title: '我的账户'
				}
			],
		}
    }

	componentDidMount(){
		
	}
	
	hideModal = () => {
		this.setState({
			visible: false,
			withdrawStatus: 1
		})
	}
	
	withDrawEvent = ()=> {
		this.setState({
			visible: true,
			// withdrawStatus: 1
		})
	}

    render(){
        return(
            <div className="container_wrap">
				<BreadCrumb breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				<div className="srcoll_box">
					<div className="srcoll_box_inner">
						<div className="inner_top_title flex_box flex_between">
							<span className="default_title">提现</span>
							<div></div>
						</div>
						{
							this.state.withdrawStatus===0 && (
								<div className="withdraw_box">
									<div className="withdraw_box_item flex_box flex_center">
										<span>提现银行卡:</span>
										<span>1234 5678 9087 1243</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>开户银行:</span>
										<span>上海银行</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>可提现:</span>
										<span>988515.00元</span>
									</div> 
									<div className="withdraw_box_item flex_box flex_center align_items_center">
										<span>提现银行卡:</span>
										<span>
											<div className="input_money" style={{width: '300px'}}>
												<InputNumber
													min={0.01} 
													precision={2} 
													placeholder="请输入"
													onChange={this.onChange}/>
												<font className="unit">元</font>
											</div>
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span></span>
										<span>预计24小时到账</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span></span>
										<span>
											<Button onClick={this.withDrawEvent} type="primary">确认提现</Button>
										</span>
									</div>
								</div>
							)
						}
						{
							this.state.withdrawStatus===1 && (
								<div className="withdraw_box">
									<div className="status_icon">
										<div><Icon type="check-circle" theme="filled" /></div>
										<div className="large_title">操作成功</div>
										<div className="withdraw_notice">
											<span>您已经操作成功，预计48小时内到达指定账</span>
										</div>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>收款账户:</span>
										<span>1234 5678 9087 1243交通银行储蓄卡</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>提现金额:</span>
										<span>9999.00元</span>
									</div>
									<div className="withdraw_bottom flex_box flex_center">
										<span>
											<Button type="primary">确认提现</Button>
										</span>
										<span>
											<Button>查看记录</Button>
										</span>
									</div>
								</div>
							)
						}
					</div>
				</div>
				<GlobalModal 
					dialog={this.state.dialog}
					title={this.state.title}
					visible={this.state.visible}
					hideModal={this.hideModal}></GlobalModal>
            </div>  
        )
    }
}