import React, { Component } from 'react';
import { InputNumber, Input, Button, Icon, Steps, Select, Cascader, Radio, Upload, Checkbox } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import ModalCarrier from '@/components/modalCarrier';
import { getProductList, getCustomerList, uploadUrl, onAuthMb, addCustomer, getPAyAccount } from '@/http/api';
import options from '@/utils/city';
import { TransformToChinese, trim, testSpace, testPhone, testNumber, testLon, testLat } from '@/utils/tool'; 
import { Base64 } from 'js-base64';
import message from '@/utils/message';
const token = sessionStorage.getItem('token'); 
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

let detailVo = new Map();

const error_space = '车场名称不能包含空格';
const error_empty = '车场名称不能为空';
const error_sapce_linkphone = '联系方式格式错误';
const error_empty_linkphone = '联系方式不能为空';

export default class AuthorizationSteps extends Component{
	constructor(props){
        super(props);
		this.state = {
			submitInfo: null,
			visible: false,
			current: 0,
			payInfo: null,
			productId: null,
			productName: '',
			years: 1,
			totalPrice: 0,
			disabled: false,
			tradNumber: '',
			testTradNumber: false,
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
			detailVoList: [],
			productParkingInfoVo: {
				cityId: [],
				cityName: '',
				customerId: null,
				customerName: '', 
				longitudeAndLatitude: '',
				parkType: 0,
				parkingAttribute: '',
				parkingLocation: '',
				parkingName: '',
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
				longitudeAndLatitude: false,
			},
			parkingErrorText: '',
			callFunc: 0,
			callFuncValue: null,
			callFuncPrice: null,
			callFuncList: [],
			couponFunc: 1,
			couponFuncValue: 1,
			couponPrice: 0,
			cameraFunc: 0,
			cameraCount: 1,
			cameraPrice: 0,
			agree: false,
			isAgree: false,
		}
		if(props.location.state){
			console.log(props.location.state)
			this.state.productId = props.location.state.id
			sessionStorage.setItem('productId', String(props.location.state.id))
			if(props.location.state.customerId){
				sessionStorage.setItem('acustomerId', String(props.location.state.customerId))
				sessionStorage.setItem('acustomerName', String(props.location.state.customerName))
				this.state.productParkingInfoVo.customerId = props.location.state.customerId
				this.state.productParkingInfoVo.customerName = props.location.state.customerName
			}
			
		}else{
			this.state.productId = parseInt(sessionStorage.getItem('productId'))
			if(sessionStorage.getItem('acustomerId')){
				this.state.productParkingInfoVo.customerId = parseInt(sessionStorage.getItem('acustomerId'))
				this.state.productParkingInfoVo.customerName = sessionStorage.getItem('acustomerName')
			}
		}
    }

	componentDidMount(){
		this.getInitData()
	}
	
	componentWillUnmount(){
		sessionStorage.removeItem('productId')
		sessionStorage.removeItem('acustomerId')
		sessionStorage.removeItem('acustomerName')
	}
	
	lastStep = () => {
		let {current} = this.state
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
			onAuthMb(params).then(res=> {
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
		  customerId: this.state.productParkingInfoVo.customerId,
		  customerName: this.state.productParkingInfoVo.customerName,
		  detailVoList: this.state.detailVoList,
		  productId: this.state.productId,
		  productName: this.state.productName,
		  productParkingInfoVo: {
			cityId: this.state.productParkingInfoVo.cityId.join(","),
			cityName: this.state.productParkingInfoVo.cityName,
			customerId: this.state.productParkingInfoVo.customerId,
			customerName: this.state.productParkingInfoVo.customerName,
			longitudeAndLatitude: this.state.productParkingInfoVo.longitudeAndLatitude,
			parkType: this.state.productParkingInfoVo.parkType,
			parkingAttribute: this.state.productParkingInfoVo.parkingAttribute,
			parkingLocation: this.state.productParkingInfoVo.parkingLocation,
			parkingName: this.state.productParkingInfoVo.parkingName,
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
		let {isAgree} = this.state
		this.setState({
			isAgree: false,
			agree: e.target.checked
		})
	}
	
	modalEvent = () => {
		this.setState({
			visible: true
		})
	}
	
	onCancel = () => {
		this.setState({
			visible: false
		})
	}
	
	onConfirm = p => {
		const that = this
		let { productParkingInfoVo } = this.state
		addCustomer(p).then(res=> {
			if(res.code===1){
				message.success('成功！')
				that.takeCustomer()
				productParkingInfoVo.customerId = res.data
				productParkingInfoVo.customerName = p.customerName
				that.setState({
					visible: false,
					productParkingInfoVo
				})
			}
		})
	}
	
	fillTradNumber = e => {
		e.persist()
		if(!testNumber(e.target.value)&&e.target.value!=="") return
		this.setState({
			tradNumber: e.target.value
		})
		
		if(this.state.testTradNumber){
			this.setState({
				testTradNumber: false
			})
		}
	}
	
	onInputChange = (name, e) => {
		e.persist()
		let { verifyProduct, productParkingInfoVo } = this.state
		
		productParkingInfoVo[name] = e.target.value
		this.setState({
			productParkingInfoVo
		})
		
		if(verifyProduct[name]){
			verifyProduct[name] = false
			this.setState({
				verifyProduct
			})
		}
	}
	
	onCityCodeChange = (value, option) => {
		console.log(value)
		console.log(option)
		let { verifyProduct, productParkingInfoVo } = this.state
		let cityName = ''
		if(option.length){
			cityName = option[0].label+''+option[1].label+''+option[2].label
		}
		productParkingInfoVo.cityId = value;
		productParkingInfoVo.cityName = cityName;
		this.setState({
			productParkingInfoVo
		})
		
		if(verifyProduct.cityId){
			verifyProduct.cityId = false
			this.setState({
				verifyProduct
			})
		}
	}
	
	onSelectChange = (name, e, option) => {
		let { verifyProduct, productParkingInfoVo } = this.state
		
		productParkingInfoVo[name] = e
		if(name==='customerId'){
			productParkingInfoVo.customerName = option.props.children
		}
		this.setState({
			productParkingInfoVo
		}) 
		
		if(verifyProduct[name]){
			verifyProduct[name] = false
			this.setState({
				verifyProduct
			}) 
		}
	}
	
	onRadioChange = (name, pname, e) => {
		const that = this
		if(pname){
			let { productParkingInfoVo } = this.state
			productParkingInfoVo[name] = e.target.value
			this.setState({
				productParkingInfoVo
			}) 
			return
		}
		this.setState({
			[name]: e.target.value
		}, ()=> {
			that.calculateTotal()
		}) 
		if(name==="callFuncValue"){
			let item = this.state.callFuncList.filter(item=> item.id===e.target.value)
			let callFuncPrice = item[0].originalPrice
			this.setState({
				callFuncPrice
			}, ()=> {
				that.calculateTotal()
			})
		}
		// this.calculateTotal()
	}
	
	onNumberChange = (name, e) => {
		const that = this
		this.setState({
			[name]: e
		}, ()=> {
			that.calculateTotal()
		})
	}
	
	verifyStepOne = () => {
		let result = false
		let { parkingErrorText, verifyProduct, productParkingInfoVo } = this.state
		if(trim(productParkingInfoVo.parkingName)===""){
			verifyProduct.parkingName = true
			parkingErrorText = error_empty
			result = true
		}
		if(testSpace(productParkingInfoVo.parkingName)){
			verifyProduct.parkingName = true
			parkingErrorText = error_space
			result = true
		}
		if(trim(productParkingInfoVo.parkingLocation)===""){
			verifyProduct.parkingLocation = true
			result = true
		}
		if(!productParkingInfoVo.cityId.length){
			verifyProduct.cityId = true
			result = true
		}
		if(trim(productParkingInfoVo.parkingAttribute)===""){
			verifyProduct.parkingAttribute = true
			result = true
		}
		if(trim(productParkingInfoVo.longitudeAndLatitude)===""){
			verifyProduct.longitudeAndLatitude = true
			result = true
		}else{
			let arr = productParkingInfoVo.longitudeAndLatitude.split(",")
			if(arr.length!==2){
				verifyProduct.longitudeAndLatitude = true
				result = true
			}else{
				if(!testLon(arr[0])||!testLat(arr[1])){
					verifyProduct.longitudeAndLatitude = true
					result = true
				}
			}
		}
			
		if(!productParkingInfoVo.customerId){
			verifyProduct.customerId = true
			result = true
		}
		this.setState({
			verifyProduct,
			parkingErrorText
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
					
					childrenProList.forEach(item=> {
						detailVo.set(item.id, item)
					})
					
					this.handleMBPro(childrenProList)
					
					this.setState({
						productName: filter_data[0].name,
						childrenProList
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
		this.takeCustomer()
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
	
	takeCustomer = () => {
		getCustomerList({pageNum: 1, pageSize: 1000}).then(res=> {
			if(res.code===1){
				this.setState({
					customerList: res.data.list
				})
			}
		})
	}
	
	handleMBPro = (childrenProList) => {
		let { cameraPrice, cameraFunc, cameraCount, couponPrice, couponFunc, couponFuncValue, callFunc, callFuncValue, callFuncList, callFuncPrice } = this.state;
		let arr_coupon =  childrenProList.filter(item=> item.id===5);
		let arr_camera =  childrenProList.filter(item=> item.id===6);
		callFuncList = childrenProList.filter(item=> item.group);
		
		cameraFunc = arr_camera.length?6:0;
		cameraCount = arr_camera.length?1:0;
		cameraPrice = arr_camera.length?arr_camera[0].originalPrice:0;
		couponFunc = arr_coupon.length?1:0;
		couponFuncValue = arr_coupon.length?5:0;
		couponPrice = arr_coupon.length?arr_coupon[0].originalPrice:0;
		callFunc = callFuncList.length>0?1:0;
		callFuncValue = callFuncList.length>0?callFuncList[0].id:0;
		callFuncPrice = callFuncList.length>0?callFuncList[0].originalPrice:0;
		this.setState({
			callFunc,
			callFuncList,
			callFuncValue,
			callFuncPrice,
			cameraFunc,
			cameraCount,
			cameraPrice,
			couponFunc,
			couponFuncValue,
			couponPrice
		})
		this.calculateTotal()
	}
	
	calculateTotal = () => {
		let { couponFunc, couponFuncValue, couponPrice, callFunc, callFuncPrice, callFuncValue, cameraFunc, cameraPrice, cameraCount, years, detailVoList } = this.state
		let totalPrice = (couponPrice*couponFunc + callFuncPrice*callFunc + cameraPrice*cameraCount) * years;
		detailVoList = []
		if(callFunc){
			let item = detailVo.get(callFuncValue)
			let vo = {
			  "count": 1,
			  "projectId": item.id,
			  "projectName": item.name,
			  "projectType": 1
			}
			detailVoList.push(vo)
		}
		if(couponFunc){
			let item = detailVo.get(couponFuncValue)
			let vo = {
			  "count": 1,
			  "projectId": item.id,
			  "projectName": item.name,
			  "projectType": 2
			}
			detailVoList.push(vo)
		}
		if(cameraFunc&&cameraCount){
			let item = detailVo.get(cameraFunc)
			let vo = {
			  "count": cameraCount,
			  "projectId": item.id,
			  "projectName": item.name,
			  "projectType": 3
			}
			detailVoList.push(vo)
		}
		this.setState({
			totalPrice,
			detailVoList
		})
	}
	
	continueAuth = () => {
		window.location.reload()
	}
	
	goBack = () => {
		this.props.history.replace({pathname: '/index/productlicensing/authorizations'})
	}
	
    render(){
		const { current, submitInfo, productParkingInfoVo, customerList, verifyProduct } = this.state
		
        return(
            <div className="container_wrap">
				<BreadCrumb 
					isRight={true}
					breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				<div className="srcoll_box">
					<div className="srcoll_box_inner">
						<div className="inner_top_title inner_top_title_withbom">
							<span className="default_title">麦泊停车授权</span>
							<div className="grey_color">请按照系统步骤,提交产品授权必要的信息</div>
						</div>
						<div className="step_box">
							<Steps current={current} size="small">
							  <Step title="填写车场基本属性"/>
							  <Step title="选择配置及报价"/>
							  <Step title="提交支付凭证"/> 
							</Steps>
						</div>
						{
							current===0 && (
								<div className="withdraw_box">
									<div className="withdraw_box_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>*车场名称:</span>
										<span>
											<div className="input_box">
												<Input 
													value={productParkingInfoVo.parkingName}
													onChange={this.onInputChange.bind(this, 'parkingName')}
													type="text" 
													placeholder="请输入"/>
											</div>
										</span>
										<span className="dangerous_color">
											{verifyProduct.parkingName && this.state.parkingErrorText}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>*车场位置:</span>
										<span>
											<div className="input_box" id="citySelect">
												<Cascader
													options={options} 
													value={productParkingInfoVo.cityId}
													onChange={this.onCityCodeChange} 
													placeholder="请选择" />
											</div>
										</span>
										<span className="dangerous_color">
											{verifyProduct.cityId && '请填写车场地址'}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span></span>
										<span>
											<div className="input_box">
												<TextArea 
													value={productParkingInfoVo.parkingLocation}
													onChange={this.onInputChange.bind(this, 'parkingLocation')}
													placeholder="请输入详细地址" 
													rows={4}/>
											</div>
										</span>
										<span className="dangerous_color">
											{verifyProduct.parkingLocation && '请填写车场地址'}
										</span>
									</div> 
									<div className="withdraw_box_item flex_box flex_center">
										<span>*车场属性:</span>
										<span>
											<div className="input_box">
												<Select
													value={productParkingInfoVo.parkingAttribute}
													onChange={this.onSelectChange.bind(this, 'parkingAttribute')}>
														<Option value="商超">商超</Option>
														<Option value="办公">办公</Option>
														<Option value="住宅">住宅</Option>
														<Option value="医院">医院</Option>
														<Option value="酒店">酒店</Option>
														<Option value="交通枢纽">交通枢纽</Option>
														<Option value="事业单位">事业单位</Option>
														<Option value="厂库">厂库</Option>
														<Option value="其他">其他</Option>
												</Select>
											</div>
										</span>
										<span className="dangerous_color">
											{verifyProduct.parkingAttribute && '请选择车场属性'}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>*所属客户:</span>
										<span>
											<div className="input_box" style={{ paddingRight: '100px' }}>
												<Select
													value={productParkingInfoVo.customerId}
													onChange={this.onSelectChange.bind(this, 'customerId')}>
													{
														customerList.length>0 && customerList.map((item, index)=> {
															return (
																<Option 
																	key={index} 
																	value={item.customerId}>{item.customerName}</Option>
															)
														})
													}
												</Select>
												<div className="add_btn" onClick={this.modalEvent}>快速添加</div>
											</div>
										</span>
										<span className="dangerous_color">
											{verifyProduct.customerId && '请选择所属客户'}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center" style={{paddingBottom: '25px'}}>
										<span>*经纬度:</span>
										<span style={{position: 'relative'}}>
											<div className="input_box" style={{ paddingRight: '100px' }}>
												<Input
													value={productParkingInfoVo.longitudeAndLatitude}
													onChange={this.onInputChange.bind(this, 'longitudeAndLatitude')}
													type="text" 
													placeholder="请输入"/>
												<div className="add_btn">
													<a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">
													快速拾取</a>
												</div>
											</div>
											<div className="egg_lonlat">中间用逗号隔开 示例: 116.402544,39.914492</div>
										</span>
										<span className="dangerous_color">
											{
												verifyProduct.longitudeAndLatitude&&'请按示例填写经纬度'
											}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>单选:</span>
										<span>
											<div className="input_box">
												<Radio.Group 
													name="radiogroup" 
													value={productParkingInfoVo.parkType}
													onChange={this.onRadioChange.bind(this, 'parkType', 'productParkingInfoVo')} >
												  <Radio value={0}>不含岗亭(纯云端)</Radio>
												  <Radio value={1}>含岗亭版</Radio>
												</Radio.Group>
											</div>
										</span>
										<span></span>
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
										this.state.callFuncList.length>0&&(
											<div className="form_item flex_box flex_center align_items_center">
												<span>是否使用呼叫中心：</span>
												<span>
													<Radio.Group 
														name="radiogroup" 
														value={this.state.callFunc}
														onChange={this.onRadioChange.bind(this, 'callFunc', null)}>
													  <Radio value={1}>是</Radio>
													  <Radio value={0}>否</Radio>
													</Radio.Group>
												</span>
												<span className="theme_color"></span>
											</div>
										)
									}
									{
										this.state.callFunc===1&&(
											<div className="form_item flex_box flex_center align_items_center">
												<span>选择呼叫中心：</span>
												<span>
													<Radio.Group 
														name="radiogroup" 
														value={this.state.callFuncValue}
														onChange={this.onRadioChange.bind(this, 'callFuncValue', null)}>
														{
															this.state.callFuncList.map(item=> {
																return (
																	<Radio
																		key={item.id} 
																		value={item.id}>{item.name}</Radio>
																)
															})
														}
													</Radio.Group>
												</span>
												<span className="theme_color">报价{this.state.callFuncPrice}元/年</span>
											</div>
										)
									}
									{
										this.state.couponFunc===1&&(
											<div className="form_item flex_box flex_center align_items_center">
												<span>是否使用优惠卷功能：</span>
												<span>
													<Radio.Group 
														name="radiogroup" 
														value={this.state.couponFuncValue}
														onChange={this.onRadioChange.bind(this, 'couponFuncValue', null)}>
													  <Radio value={5}>是</Radio>
													  <Radio value={0}>否</Radio>
													</Radio.Group>
												</span>
												<span className="theme_color">报价{this.state.couponPrice}元/年</span>
											</div>
										)
									}
									{
										this.state.cameraFunc===6&&(
											<div className="form_item flex_box flex_center align_items_center">
												<span>相机数量：</span>
												<span>
													<InputNumber 
														value={this.state.cameraCount} 
														onChange={this.onNumberChange.bind(this, 'cameraCount')}
														min={0}/> 个
												</span>
												<span className="theme_color">报价:{this.state.cameraPrice}/个/年</span>
											</div>
										)
									}
									
									<div className="form_item flex_box flex_center align_items_center with_border">
										<span>首次充值时间：</span>
										<span>
											<InputNumber 
												value={this.state.years}
												onChange={this.onNumberChange.bind(this, 'years')}
												min={1}/> 年
										</span>
										<span></span>
									</div>
									<div className="setting_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>配置详情：</span>
										<span>
											{
												this.state.detailVoList.length>0&&this.state.detailVoList.map((item, index)=> {
													return (
														<div className="option_item flex_box flex_between" key={item.projectId}>
															<span>
																{index+1}、
																{item.projectType===1&&'呼叫功能'}
																{item.projectType===2&&'优惠券功能'}
																{item.projectType===3&&'相机功能'}
															</span>
															<span>已选{item.productName}×{this.state.years}年</span>
														</div>
													)
												})
											}
										</span>
										<span></span>
									</div>
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
										<span>
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
											{
												this.state.testTradNumber&&(
													<span className="dangerous_color check_trad_span">请输入支付流水号</span>
												)
											}
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
												  {this.state.fileList.length >= 1 ? null : (
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
				<ModalCarrier
					visible={this.state.visible}
					onCancel={this.onCancel}
					onConfirm={this.onConfirm}></ModalCarrier>
            </div>  
        )
    }
}