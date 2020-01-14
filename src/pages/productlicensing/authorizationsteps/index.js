import React, { Component } from 'react';
import { InputNumber, Input, Button, Icon, Steps, Select, Cascader, Radio, Upload } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import options from '@/utils/city';
import './index.css';

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

 function onChange(value) {
   console.log(value);
 }

export default class AuthorizationSteps extends Component{
	constructor(props){
        super(props);
		this.state = {
			current: 0,
			fileList: [
			  {
				uid: '-1',
				name: 'image.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			  },
			  {
				uid: '-2',
				name: 'image.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			  }
			],
			breadcrumbList: [
				{
					title: '产品授权',
					path: '/index/productlicensing',
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
	
	nextStep = () => {
		
		this.setState(preState => ({
			current: preState.current + 1
		}))
	}
	
	handlePreview = (e) => {
		console.log(e)
	}
	
	handleChange = ({ fileList }) => this.setState({ fileList })
	
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
						<div className="step_box">
							<Steps current={this.state.current} size="small">
							  <Step title="Step 1"/>
							  <Step title="Step 2"/>
							  <Step title="Step 3"/>
							</Steps>
						</div>
						{
							this.state.current===0 && (
								<div className="withdraw_box">
									<div className="withdraw_box_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>*车场名称:</span>
										<span>
											<div className="input_box">
												<Input type="text" placeholder="请输入"/>
											</div>
										</span>
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>*车场位置:</span>
										<span>
											<div className="input_box" id="citySelect">
												<Cascader
													options={options} onChange={onChange} placeholder="请选择" />
											</div>
										</span>
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span></span>
										<span>
											<div className="input_box">
												<TextArea placeholder="请输入详细地址" rows={4}/>
											</div>
										</span>
										<span></span>
									</div> 
									<div className="withdraw_box_item flex_box flex_center">
										<span>*车场属性:</span>
										<span>
											<div className="input_box">
												<Select
													onChange={onChange}>
														<Option value="jack">Jack</Option>
														<Option value="lucy">Lucy</Option>
														<Option value="tom">Tom</Option>
												</Select>
											</div>
										</span>
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>*所属客户:</span>
										<span>
											<div className="input_box" style={{ paddingRight: '100px' }}>
												<Select
													onChange={onChange}>
													<Option value="jack">Jack</Option>
													<Option value="lucy">Lucy</Option>
													<Option value="tom">Tom</Option>
												</Select>
												<div className="add_btn">快速添加</div>
											</div>
										</span>
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>经纬度:</span>
										<span>
											<div className="input_box">
												<Select
													onChange={onChange}>
														<Option value="jack">Jack</Option>
														<Option value="lucy">Lucy</Option>
														<Option value="tom">Tom</Option>
												</Select>
											</div>
										</span>
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>单选:</span>
										<span>
											<div className="input_box">
												<Radio.Group name="radiogroup" defaultValue={1}>
												  <Radio value={1}>不含岗亭(纯云端)</Radio>
												  <Radio value={2}>含岗亭版</Radio>
												</Radio.Group>
											</div>
										</span>
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span></span>
										<span>
											<div className="input_box button_group">
												<Button onClick={this.nextStep} type="primary">下一步</Button>
												<Button>取消授权</Button>
											</div>
										</span>
										<span></span>
									</div>
								</div>
							)
						}
						{
							this.state.current===1 && (
								<div className="step2_box">
									<div className="form_item flex_box flex_center align_items_center">
										<span>是否使用呼叫中心：</span>
										<span>
											<Radio.Group name="radiogroup" defaultValue={1}>
											  <Radio value={1}>呼叫至麦泊呼叫中心</Radio>
											  <Radio value={2}>呼叫至车场呼叫中心</Radio>
											</Radio.Group>
										</span>
										<span className="theme_color">报价93324元/年</span>
									</div>
									<div className="form_item flex_box flex_center align_items_center">
										<span>是否使用优惠卷功能：</span>
										<span>
											<Radio.Group name="radiogroup" defaultValue={1}>
											  <Radio value={1}>呼叫至麦泊呼叫中心</Radio>
											  <Radio value={2}>呼叫至车场呼叫中心</Radio>
											</Radio.Group>
										</span>
										<span className="theme_color">报价93324元/年</span>
									</div>
									<div className="form_item flex_box flex_center align_items_center">
										<span>相机数量：</span>
										<span>
											<InputNumber min={1}/> 个
										</span>
										<span className="theme_color">报价:800/个/年</span>
									</div>
									<div className="form_item flex_box flex_center align_items_center with_border">
										<span>首次充值时间：</span>
										<span>
											<InputNumber min={1}/> 年
										</span>
										<span></span>
									</div>
									<div className="setting_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>配置详情：</span>
										<span>
											<div className="option_item flex_box flex_between">
												<span>1、呼叫中心</span>
												<span>已选呼叫至麦泊中心×2年</span>
											</div>
											<div className="option_item flex_box flex_between">
												<span>2、车道数量</span>
												<span>已选呼叫至麦泊中心×2年</span>
											</div>
										</span>
										<span></span>
									</div>
									<div className="setting_item flex_box flex_center">
										<span>实付金额：</span>
										<span>
											<span className="large_title">20000</span> 元
										</span>
										<span></span>
									</div>
									<div className="setting_item flex_box flex_center btn_item">
										<span>
											<Radio>已同意奥是否按时缴费条款</Radio>
										</span>
										<span></span>
										<span></span>
									</div>
									<div className="setting_item flex_box flex_center btn_item">
										<span>
											<Button type="primary" onClick={this.nextStep}>提交</Button>
										</span>
										<span></span>
										<span></span>
									</div>
								</div>
							)
						}
						{
							this.state.current===2 && (
								<div className="step3_box">
									<div className="code_box flex_box flex_between">
										<span>
											<img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
										</span>
										<span>
											结算账户：545415415415415415
										</span>
									</div>
									<div className="step3_box_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>*输入支付流水号:</span>
										<span>
											<div className="input_box">
												<Input type="text" placeholder="请输入"/>
											</div>
										</span>
									</div>
									<div className="step3_box_item flex_box flex_center">
										<span>*输入支付流水号:</span>
										<span>
											<div className="upload_outter_box">
												<Upload
												  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
												  listType="picture-card"
												  fileList={this.state.fileList}
												  onPreview={this.handlePreview}
												  onChange={this.handleChange}
												>
												  {this.state.fileList.length >= 4 ? null : (
														<div>
															<Icon type="plus" />
															<div className="ant-upload-text">上传照片</div>
														 </div>
												  )}
												</Upload>
												<div className="upload_notice">格式要求: 原件照片,扫描件或加公章的复印件, 支持jpg,bmp,gif,png.</div>
											</div>
										</span>
									</div>
									<div className="step3_box_item flex_box flex_center">
										<span></span>
										<span>
											<div className="input_box button_group">
												<Button type="primary" onClick={this.nextStep} style={{width: '130px'}}>提交支付凭证</Button>
												<Button>等一等</Button>
											</div>
										</span>
									</div>
								</div>
							)
						}
						{
							this.state.current===3 && (
								<div className="withdraw_box">
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
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
										<span>提现金额:</span>
										<span>9999.00元</span>
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
										<span>付款人姓名:</span>
										<span>王三春</span>
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
										<span style={{lineHeight: '34px'}}>付款金额:</span>
										<span>
											<span className="large_title">5000,000,00</span>
											<span className="grey_color">(五万元整)</span>
										</span>
										<span></span>
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
							)
						}
					</div>
				</div>
            </div>  
        )
    }
}