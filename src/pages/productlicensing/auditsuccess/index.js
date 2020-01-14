import React, { Component } from 'react';
import { InputNumber, Button, Icon, Steps } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import './index.css';

const { Step } = Steps;

export default class AuditSuccess extends Component{
	constructor(props){
        super(props);
		this.state = {
			title: '短信验证',
			dialog: 'withdraw',
			visible: false,
			withdrawStatus: 0,
			breadcrumbList: [
				{
					title: '产品授权',
					path: '/index/productlicensing/authorizations',
				},
				{
					title: '授权管理',
					path: '/index/productlicensing/authorizations',
				},
				{
					title: '分布表单',
				}
			],
		}
    }

	componentDidMount(){
		
	}
	
	hideModal = () => {
		this.setState({
			visible: false,
			withdrawStatus: 1,
		})
	}
	
	withDrawEvent = ()=> {
		this.setState({
			visible: true,
		})
	}

    render(){
        return(
            <div className="container_wrap">
				<BreadCrumb 
					isRight={true}
					breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				<div className="srcoll_box">
					<div className="srcoll_box_inner">
						<div className="inner_top_title inner_top_title_withbom">
							<span className="default_title">麦泊停车授权</span>
							<div className="grey_color">请按照产品步骤,提交产品授权必要的信息</div>
						</div>
						<div className="withdraw_box">
							<div className="step_box">
								<Steps current={3}  size="small">
								  <Step title="Finished" title="Step 1"/>
								  <Step title="Finished" title="Step 2"/>
								  <Step title="Finished" title="Step 3"/>
								</Steps>
							</div>
							
							<div className="status_icon">
								<div><Icon type="check-circle" theme="filled" /></div>
								<div className="large_title">操作成功</div>
								<div className="withdraw_notice">
									<span>您已经操作成功，预计48小时内到达指定账</span>
								</div>
							</div>
							<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
								<span>收款账户:</span>
								<span>1234 5678 9087 1243交通银行储蓄卡</span>
							</div>
							<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
								<span>提现金额:</span>
								<span>9999.00元</span>
							</div>
							<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
								<span>付款人姓名:</span>
								<span>王三春</span>
							</div>
							<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
								<span style={{lineHeight: '34px'}}>付款金额:</span>
								<span>
									<span className="large_title">5000,000,00</span>
									<span className="grey_color">(五万元整)</span>
								</span>
							</div>
							<div className="withdraw_bottom flex_box flex_center">
								<span>
									<Button type="primary">继续授权</Button>
								</span>
								<span>
									<Button>返回</Button>
								</span>
							</div>
						</div>
					</div>
				</div>
            </div>  
        )
    }
}