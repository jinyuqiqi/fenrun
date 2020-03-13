import React, { Component } from 'react';
import { InputNumber, Input, Button, Icon, Steps, Select, Cascader, Upload, Checkbox } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import { Base64 } from 'js-base64';
import { getProductList, getCustomerList, uploadUrl, onAuthLyb, getPAyAccount } from '@/http/api';
import options from '@/utils/city';
import message from '@/utils/message';
import { trim, testSpace, testPhone, testNumber, TransformToChinese } from '@/utils/tool'; 
const token = sessionStorage.getItem('token'); 
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

const error_sapce_company = '企业名称不能包含空格';
const error_empty_company = '企业名称不能为空';
const error_sapce_project = '项目名称不能包含空格';
const error_empty_project = '项目名称不能为空';
const error_sapce_projectbody = '项目负责人不能包含空格';
const error_empty_projectbody = '项目负责人不能为空';
const error_sapce_linkphone = '联系方式格式错误';
const error_empty_linkphone = '联系方式不能为空';

export default class AuthorizationSteps extends Component{
	constructor(props){
        super(props);
		this.state = {
			current: 0,
			payInfo: null,
			productId: null,
			productName: '',
			years: 1,
			totalPrice: 0,
			disabled: false,
			tradNumber: '',
			chineseNum: '',
			submitInfo: null,
			fileList: [],
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
			customerList: [],
			childrenProList: [],
			orderDetailList: [],
			productCompanyInfoForm: {
				cityId: [],
				cityName: '',
				location: '',
				companyName: '',
				projectName: '',
				projectStatus: 1,
				projectMainName: '',
				linkPhone: ''
			},
			verifyProduct: {
				parkingName: false,
				cityId: false,
				parkingLocation: false,
				parkingAttribute: false,
				customerId: false,
				companyName: false,
				projectName: false,
				location: false,
				linkPhone: false,
				projectMainName: false,
			},
			companyErrorText: '',
			projectErrorText: '',
			projectMainNameErrorText: '',
			linkPhoneErrorText: '',
			agree: false,
			isAgree: false,
			lybPrice: 0
		}
		if(props.location.state){
			this.state.productId = props.location.state.id
			sessionStorage.setItem('productId', String(props.location.state.id))
		}else{
			this.state.productId = parseInt(sessionStorage.getItem('productId'))
		}
    }

	componentDidMount(){
		this.getInitData()
	}
	
	componentWillUnmount(){
		sessionStorage.removeItem('productId')
	}
	
	lastStep = () => {
		this.setState(preState => ({
			current: preState.current - 1
		}))
	}
	
	nextStep = () => {
		let {current} = this.state
		if(current===0){
			let result = this.verifyStepOne()
			if(result) return
			
			this.setState(preState => ({
				current: preState.current + 1
			}))
		}
		if(current===1){
			if(!this.state.agree){
				this.setState({
					isAgree: true
				})
				return
			}
			this.setState(preState => ({
				current: preState.current + 1
			}))
		}
		if(current===2){
			if(trim(this.state.tradNumber)===""){
				this.setState({
					testTradNumber: true
				})
				return
			}
			let params = this.takeParams()
			onAuthLyb(params).then(res=> {
				if(res.code===1){
					let chineseNum = isNaN(res.data.tradAmount) ?'':TransformToChinese(res.data.tradAmount)
					this.setState(preState => ({
						chineseNum,
						submitInfo: res.data,
						current: preState.current + 1
					}))
				}
			})
		}
		
	}
	
	takeParams = () => {
		let params = {
		  authProductId: this.state.productId,
		  orderDetailList: this.state.orderDetailList,
		  productId: this.state.productId,
		  productName: this.state.productName,
		  productCompanyInfoForm: {
			cityId: this.state.productCompanyInfoForm.cityId.join(","),
			companyName: this.state.productCompanyInfoForm.companyName,
			linkPhone: this.state.productCompanyInfoForm.linkPhone,
			location: this.state.productCompanyInfoForm.location,
			projectName: this.state.productCompanyInfoForm.projectName,
			projectStatus: this.state.productCompanyInfoForm.projectStatus,
			projectMainName: this.state.productCompanyInfoForm.projectMainName,
		  },
		  tradAmount: this.state.totalPrice,
		  tradNumber: this.state.tradNumber,
		  years: this.state.years
		}
	
		if(this.state.fileList.length&&this.state.fileList[0].url){
			params["tradAc"] = this.state.fileList[0].url
		}
		return params
	}
	
	handlePreview = (e) => {
		window.open(e.url)
	}
	
	handleDownload = e => {
		var a = document.createElement('a')
		var event = new MouseEvent('click')
		
		a.download = e.name
		a.href = e.url
		a.target = "_blank"
		a.dispatchEvent(event)
	}
	
	handleRemove = e => {
		
	}
	
	onCheckboxChange = e => {
		this.setState({
			isAgree: false,
			agree: e.target.checked
		})
	}
	
	fillTradNumber = e => {
		e.persist()
		this.setState({
			tradNumber: e.target.value
		})
	}
	
	onInputChange = (name, e) => {
		e.persist()
		if(name==="linkPhone"&&!testNumber(e.target.value)&&e.target.value!=="") return
		let { verifyProduct, productCompanyInfoForm } = this.state
		productCompanyInfoForm[name] = e.target.value
		this.setState({
			productCompanyInfoForm
		})
		if(verifyProduct[name]){
			verifyProduct[name] = false
			this.setState({
				verifyProduct
			})
		}
	}
	
	onCityCodeChange = (value, option) => {
		let { verifyProduct, productCompanyInfoForm } = this.state
		let cityName = ''
		if(option.length){
			cityName = option[0].label+''+option[1].label+''+option[2].label
		}
		
		productCompanyInfoForm.cityId = value;
		productCompanyInfoForm.cityName = cityName;
		this.setState({
			productCompanyInfoForm
		})
		
		if(verifyProduct.cityId){
			verifyProduct.cityId = false
			this.setState({
				verifyProduct
			})
		}
	}
	
	onSelectChange = (name, e, option) => {
		let { verifyProduct, productCompanyInfoForm } = this.state
		
		productCompanyInfoForm[name] = e
		this.setState({
			productCompanyInfoForm
		}) 
		
		if(verifyProduct[name]){
			verifyProduct[name] = false
			this.setState({
				verifyProduct
			}) 
		}
	}
	
	onNumberChange = e => {
		const that = this
		this.setState({
			years: e
		}, ()=> {
			that.calculateTotal()
		})
	}
	
	verifyStepOne = () => {
		let result = false
		let { companyErrorText, projectErrorText, projectMainNameErrorText, linkPhoneErrorText, verifyProduct, productCompanyInfoForm } = this.state
		if(trim(productCompanyInfoForm.companyName)===""){
			verifyProduct.companyName = true
			companyErrorText = error_empty_company
			result = true
		}
		if(testSpace(productCompanyInfoForm.companyName)){
			verifyProduct.companyName = true
			companyErrorText = error_sapce_company
			result = true
		}
		if(trim(productCompanyInfoForm.projectName)===""){
			verifyProduct.projectName = true
			projectErrorText = error_empty_project
			result = true
		}
		if(testSpace(productCompanyInfoForm.projectName)){
			verifyProduct.projectName = true
			projectErrorText = error_sapce_project
			result = true
		}
		if(trim(productCompanyInfoForm.projectMainName)===""){
			verifyProduct.projectMainName = true
			projectMainNameErrorText = error_empty_projectbody
			result = true
		}
		if(testSpace(productCompanyInfoForm.projectMainName)){
			verifyProduct.projectMainName = true
			projectMainNameErrorText = error_sapce_projectbody
			result = true
		}
		
		if(trim(productCompanyInfoForm.linkPhone)===""){
			verifyProduct.linkPhone = true
			linkPhoneErrorText = error_empty_linkphone
			result = true
		}
		if(!testPhone(productCompanyInfoForm.linkPhone)){
			verifyProduct.linkPhone = true
			linkPhoneErrorText = error_sapce_linkphone
			result = true
		}
		
		if(trim(productCompanyInfoForm.location)===""){
			verifyProduct.location = true
			result = true
		}
		if(!productCompanyInfoForm.cityId.length){
			verifyProduct.cityId = true
			result = true
		}
		this.setState({
			companyErrorText, 
			projectErrorText, 
			projectMainNameErrorText, 
			linkPhoneErrorText, 
			verifyProduct
		})
		return result
	}
	
	handleChange = ({file, fileList}) => {
		let list = []
		fileList.forEach(item=> {
			if(item.status==='done'&&item.response&&item.response.code===1){
				list.push({
					uid: item.uid,
					name: item.name,
					status: 'done',
					url: item.response.data,
					response: item.response
				})
			}else if(item.status==='done'&&item.url){
				list.push({
					uid: item.uid,
					name: item.name,
					status: 'done',
					url: item.url,
				})
			}else if(item.status==='uploading'){
				list.push({
					uid: item.uid,
					name: item.name,
					status: 'uploading',
				})
			}else if(item.status==='removed'){
				list.push({
					uid: item.uid,
					name: item.name,
					status: 'removed',
				})
			}else{
				list.push({
					uid: item.uid,
					name: item.name,
					status: 'error',
				})
			}
		})
		
		this.setState({
			fileList: list
		})
	}
	
	getInitData = () => {
		let userInfo = Base64.decode(sessionStorage.getItem('userInfo'));
		userInfo = JSON.parse(userInfo);
		let id = userInfo.contractorsBasevo.id
		getProductList({id: id}).then(res=> {
			if(res.code===1){
				let filter_data = res.data.filter(item=> item.id === this.state.productId)
				if(filter_data.length){
					let childrenProList = filter_data[0].list
					let orderDetailList = [
						{
							price: childrenProList[0].originalPrice,
							projectId: childrenProList[0].id,
							projectName: childrenProList[0].name,
							projectType: 4,
						}
					]
					let lybPrice = childrenProList[0].originalPrice
					this.setState({
						lybPrice,
						childrenProList,
						orderDetailList,
						productName: filter_data[0].name,
					})
					
					this.calculateTotal()
				}else{
					message.error('您没有此产品授权权限')
					this.setState({
						disabled: true
					})
				}
			}
		})
		getCustomerList({pageNum: 1, pageSize: 1000}).then(res=> {
			if(res.code===1){
				this.setState({
					customerList: res.data.list
				})
			}
		})
		this.takePayAccountInfo()
	}
	
	takePayAccountInfo = () => {
		getPAyAccount().then(res=> {
			if(res.code===1){
				this.setState({
					payInfo: res.data
				})
			}
		})
	}
	
	calculateTotal = () => {
		let { lybPrice, years } = this.state
		let totalPrice = lybPrice * years;
		
		this.setState({
			totalPrice
		})
	}
	
	continueAuth = () => {
		window.location.reload()
	}
	
	goBack = () => {
		this.props.history.replace({pathname: '/index/productlicensing/authorizations'})
	}
	
	
    render(){
		const { submitInfo, current, childrenProList, customerList, verifyProduct, productCompanyInfoForm } = this.state
        return(
            <div className="container_wrap">
				<BreadCrumb 
					isRight={true}
					breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				<div className="srcoll_box">
					<div className="srcoll_box_inner">
						<div className="inner_top_title inner_top_title_withbom">
							<span className="default_title">劳易保工地实名制</span>
							<div className="grey_color">请按照系统步骤,提交产品授权必要的信息</div>
						</div>
						<div className="step_box">
							<Steps current={this.state.current} size="small">
							  <Step title="填写项目基本属性"/>
							  <Step title="选择配置及报价"/>
							  <Step title="提交支付凭证"/> 
							</Steps>
						</div>
						{
							current===0 && (
								<div className="withdraw_box">
									<div className="withdraw_box_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>*企业名称:</span>
										<span>
											<div className="input_box">
												<Input 
													value={productCompanyInfoForm.companyName}
													onChange={this.onInputChange.bind(this, 'companyName')}
													type="text" 
													placeholder="请输入"/>
											</div>
										</span>
										<span className="dangerous_color">
											{verifyProduct.companyName && this.state.companyErrorText}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>*项目名称:</span>
										<span>
											<div className="input_box">
												<Input 
													value={productCompanyInfoForm.projectName}
													onChange={this.onInputChange.bind(this, 'projectName')}
													type="text" 
													placeholder="请输入"/>
											</div>
										</span>
										<span className="dangerous_color">
											{verifyProduct.projectName && this.state.projectErrorText}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>*项目状态:</span>
										<span>
											<div className="input_box">
												<Select
													value={productCompanyInfoForm.projectStatus}
													onChange={this.onSelectChange.bind(this, 'projectStatus')}>
														<Option value={1}>筹备</Option>
														<Option value={2}>立项</Option>
														<Option value={3}>在建</Option>
														<Option value={4}>完工</Option>
														<Option value={5}>停工</Option>
												</Select>
											</div>
										</span>
										<span className="dangerous_color">
											
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>*项目负责人:</span>
										<span>
											<div className="input_box">
												<Input 
													value={productCompanyInfoForm.projectMainName}
													onChange={this.onInputChange.bind(this, 'projectMainName')}
													type="text" 
													placeholder="请输入"/>
											</div>
										</span>
										<span className="dangerous_color">
											{verifyProduct.projectMainName && this.state.projectMainNameErrorText}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>*项目位置:</span>
										<span>
											<div className="input_box" id="citySelect">
												<Cascader
													options={options} 
													value={productCompanyInfoForm.cityId}
													onChange={this.onCityCodeChange} 
													placeholder="请选择" />
											</div>
										</span>
										<span className="dangerous_color">
											{verifyProduct.cityId && '请填写项目地址'}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span></span>
										<span>
											<div className="input_box">
												<TextArea 
													value={productCompanyInfoForm.location}
													onChange={this.onInputChange.bind(this, 'location')}
													placeholder="请输入详细地址" 
													rows={4}/>
											</div>
										</span>
										<span className="dangerous_color">
											{verifyProduct.location && '请填写项目地址'}
										</span>
									</div> 
									<div className="withdraw_box_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>*联系方式:</span>
										<span>
											<div className="input_box">
												<Input 
													value={productCompanyInfoForm.linkPhone}
													onChange={this.onInputChange.bind(this, 'linkPhone')}
													type="text" 
													placeholder="请输入"/>
											</div>
										</span>
										<span className="dangerous_color">
											{verifyProduct.linkPhone && this.state.linkPhoneErrorText}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span></span>
										<span>
											<div className="input_box button_group">
												<Button disabled={this.state.disabled} onClick={this.nextStep} type="primary">下一步</Button>
												<Button onClick={this.goBack}>取消授权</Button>
											</div>
										</span>
										<span></span>
									</div>
								</div>
							)
						}
						{
							current===1 && (
								<div className="step2_box">
									{
										childrenProList.map((item, index)=> {
											return (
												<div 
													key={item.id} 
													className="form_item flex_box flex_center align_items_center with_border">
													<span>首次充值时间：</span>
													<span>
														<InputNumber 
															value={this.state.years}
															onChange={this.onNumberChange}
															min={1}/> 年
													</span>
													<span className="theme_color">报价{this.state.lybPrice}元/年</span>
												</div>
											)
										})
									}
									
									<div className="setting_item flex_box flex_center">
										<span>实付金额：</span>
										<span>
											<span className="large_title">{this.state.totalPrice}</span> 元
										</span>
										<span></span>
									</div>
									<div className="setting_item flex_box flex_center btn_item">
										<span>
											<Checkbox 
												checked={this.state.agree}
												onChange={this.onCheckboxChange}>已同意奥是否按时缴费条款</Checkbox>
										</span>
										<span className="dangerous_color">
											{this.state.isAgree&&'您同意缴费条款,才能操作下一步'}
										</span>
										<span></span>
									</div>
									<div className="setting_item flex_box flex_center btn_item">
										<span className="flex_box">
											<Button type="primary" onClick={this.nextStep}>提交</Button>
											<Button style={{marginLeft: '15px'}} onClick={this.lastStep}>上一步</Button>
										</span>
										<span></span>
										<span></span>
									</div>
								</div>
							)
						}
						{
							current===2 && (
								<div className="step3_box">
									<div className="code_box flex_box flex_between">
										<span>
											{
												this.state.payInfo&&(
													<img src={this.state.payInfo.qrCodeLink} alt=""/>
												)
											}
											{
												!this.state.payInfo&&(
													<img src="" alt=""/>
												)
											}
										</span>
										<span>
											{
												this.state.payInfo&&(
													<span style={{display: 'block'}}>结算账户：{this.state.payInfo.settlementAccount}</span>
												)
											}
											{
												!this.state.payInfo&&(
													<span style={{display: 'block'}}>结算账户：''</span>
												)
											}
											<span style={{display: 'block'}}>结算金额：<strong className="large_title">{this.state.totalPrice}</strong> 元</span> 
										</span>
									</div>
									<div className="step3_box_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>*输入支付流水号:</span>
										<span>
											<div className="input_box">
												<Input 
													value={this.state.tradNumber}
													onChange={this.fillTradNumber} 
													type="text" 
													placeholder="请输入"/>
											</div>
										</span>
									</div>
									<div className="step3_box_item flex_box flex_center">
										<span>上传支付凭证:</span>
										<span>
											<div className="upload_outter_box">
												<Upload
												  action={uploadUrl}
												  headers={{token: token}}
												  listType="picture-card"
												  fileList={this.state.fileList}
												  onRemove={this.handleRemove}
												  onPreview={this.handlePreview}
												  onDownload={this.handleDownload}
												  onChange={this.handleChange}
												>
												  {this.state.fileList.length >= 4 ? null : (
														<div>
															<Icon type="plus" />
															<div className="ant-upload-text">上传照片</div>
														 </div>
												  )}
												</Upload>
												<div className="upload_notice">提示：上传支付凭证截图或照片，上传更多凭证有利于加快审核速度哦！</div>
											</div>
										</span>
									</div>
									<div className="step3_box_item flex_box flex_center">
										<span></span>
										<span>
											<div className="input_box button_group">
												<Button type="primary" onClick={this.nextStep} style={{width: '130px'}}>提交支付凭证</Button>
												<Button onClick={this.lastStep}>等一等</Button>
											</div>
										</span>
									</div>
								</div>
							)
						}
						{
							submitInfo&&current===3 && (
								<div className="withdraw_box">
									<div className="status_icon">
										<div><Icon type="check-circle" theme="filled" /></div>
										<div className="large_title">授权申请已提交成功</div>
										<div className="withdraw_notice">
											<span>您已经操作成功，预计48小时内到达指定账</span>
										</div>
									</div>
									<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
										<span>付款账户:</span>
										<span>{submitInfo.payAccount}</span>
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
										<span>收款账户:</span>
										<span>{submitInfo.settlementAccount}</span>
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
										<span>收款人姓名:</span>
										<span>{submitInfo.settlementName}</span>
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
										<span style={{lineHeight: '34px'}}>付款金额:</span>
										<span>
											<span className="large_title">{submitInfo.tradAmount}</span>
											<span className="grey_color">({this.state.chineseNum})</span>
										</span>
										<span></span>
									</div>
									<div className="withdraw_bottom flex_box flex_center">
										<span>
											<Button onClick={this.continueAuth} type="primary">继续授权</Button>
										</span>
										<span>
											<Button onClick={this.goBack}>返回</Button>
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