import React, { Component } from 'react';
<<<<<<< HEAD
import { InputNumber, Input, Button, Icon, Steps, Select, Cascader, Radio, Upload, Checkbox } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import { getProductList, getCustomerList, uploadUrl } from '@/http/api';
import options from '@/utils/city';
import { trim, testSpace, testPhone } from '@/utils/tool'; 
import './index.css';
=======
import { InputNumber, Input, Button, Icon, Steps, Select, Cascader, Upload, Checkbox } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import { Base64 } from 'js-base64';
import { getProductList, getCustomerList, uploadUrl, onAuthLyb, getPAyAccount } from '@/http/api';
import options from '@/utils/city';
import message from '@/utils/message';
import { trim, testSpace, testPhone, testNumber, TransformToChinese } from '@/utils/tool'; 
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
const token = sessionStorage.getItem('token'); 
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

<<<<<<< HEAD
let detailVo = new Map();

const error_space = '车场名称不能包含空格';
const error_empty = '车场名称不能为空';
=======
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
const error_sapce_company = '企业名称不能包含空格';
const error_empty_company = '企业名称不能为空';
const error_sapce_project = '项目名称不能包含空格';
const error_empty_project = '项目名称不能为空';
const error_sapce_projectbody = '项目负责人不能包含空格';
const error_empty_projectbody = '项目负责人不能为空';
const error_sapce_linkphone = '联系方式格式错误';
const error_empty_linkphone = '联系方式不能为空';
<<<<<<< HEAD
export default class AuthorizationStepsL extends Component{
=======

export default class AuthorizationSteps extends Component{
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
	constructor(props){
        super(props);
		this.state = {
			current: 0,
<<<<<<< HEAD
			productId: null,
			years: 1,
			totalPrice: 0,
=======
			payInfo: null,
			productId: null,
			productName: '',
			years: 1,
			totalPrice: 0,
			disabled: false,
			tradNumber: '',
			chineseNum: '',
			submitInfo: null,
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
			detailVoList: [],
			productInfoVo: {},
			verifyProduct: {},
			parkingErrorText: '',
			companyErrorText: '',
			projectErrorText: '',
			projectMainNameErrorText: '',
			linkPhoneErrorText: '',
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
		this.state.productId = props.location.state.id
		this.assignmentState(props.location.state.id)
		console.log(props.location.state.id)
		console.log(this.state.productInfoVo)
    }

	componentDidMount(){
		this.getInitData()
	}
	
	assignmentState = id => {
		let productInfo,
			verifyProduct;
		if(id===1){
			productInfo = {
				cityId: [],
				cityName: '',
				customerId: null,
				customerName: '',
				longitudeAndLatitude: '',
				parkType: 0,
				parkingAttribute: '',
				parkingLocation: '',
				parkingName: '',
			}
			verifyProduct = {
				parkingName: false,
				cityId: false,
				parkingLocation: false,
				parkingAttribute: false,
				customerId: false
			}
		}
		if(id===7){
			productInfo = {
=======
			orderDetailList: [],
			productCompanyInfoForm: {
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
				cityId: [],
				cityName: '',
				location: '',
				companyName: '',
				projectName: '',
				projectStatus: 1,
				projectMainName: '',
				linkPhone: ''
<<<<<<< HEAD
			}
			verifyProduct = {
				companyName: false,
				cityId: false,
=======
			},
			verifyProduct: {
				parkingName: false,
				cityId: false,
				parkingLocation: false,
				parkingAttribute: false,
				customerId: false,
				companyName: false,
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
				projectName: false,
				location: false,
				linkPhone: false,
				projectMainName: false,
<<<<<<< HEAD
			}
		}
		this.setState({
			verifyProduct,
			productInfo
		})
=======
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
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
	}
	
	nextStep = () => {
		let {current} = this.state
		if(current===0){
			let result = this.verifyStepOne()
			if(result) return
<<<<<<< HEAD
=======
			
			this.setState(preState => ({
				current: preState.current + 1
			}))
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
		}
		if(current===1){
			if(!this.state.agree){
				this.setState({
					isAgree: true
				})
				return
			}
<<<<<<< HEAD
		}
		this.setState(preState => ({
			current: preState.current + 1
		}))
=======
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
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
		let fileList = this.state.fileList.filter(item=> item.status!=='removed')
		this.setState({
			fileList
		})
	}
	
	onCheckboxChange = e => {
		let {isAgree} = this.state
=======
		
	}
	
	onCheckboxChange = e => {
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
		this.setState({
			isAgree: false,
			agree: e.target.checked
		})
	}
	
<<<<<<< HEAD
	onInputChange = (name, e) => {
		e.persist()
		let { verifyProduct, productInfoVo } = this.state
		productInfoVo[name] = e.target.value
		this.setState({
			productInfoVo
=======
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
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
		})
		if(verifyProduct[name]){
			verifyProduct[name] = false
			this.setState({
				verifyProduct
			})
		}
	}
	
	onCityCodeChange = (value, option) => {
<<<<<<< HEAD
		let { verifyProduct, productInfoVo } = this.state
=======
		let { verifyProduct, productCompanyInfoForm } = this.state
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
		let cityName = ''
		if(option.length){
			cityName = option[0].label+''+option[1].label+''+option[2].label
		}
<<<<<<< HEAD
		productInfoVo.cityId = value;
		productInfoVo.cityName = cityName;
		this.setState({
			productInfoVo
		})
=======
		
		productCompanyInfoForm.cityId = value;
		productCompanyInfoForm.cityName = cityName;
		this.setState({
			productCompanyInfoForm
		})
		
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
		if(verifyProduct.cityId){
			verifyProduct.cityId = false
			this.setState({
				verifyProduct
			})
		}
	}
	
<<<<<<< HEAD
	onSelectChange  = (name, e, option) => {
		let { verifyProduct, productInfoVo } = this.state
		productInfoVo[name] = e
		if(name==='customerId'){
			productInfoVo.customerName = option.props.children
		}
		this.setState({
			productInfoVo
		}) 
=======
	onSelectChange = (name, e, option) => {
		let { verifyProduct, productCompanyInfoForm } = this.state
		
		productCompanyInfoForm[name] = e
		this.setState({
			productCompanyInfoForm
		}) 
		
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
		if(verifyProduct[name]){
			verifyProduct[name] = false
			this.setState({
				verifyProduct
			}) 
		}
	}
	
<<<<<<< HEAD
	onRadioChange = (name, pname, e) => {
		const that = this
		if(pname){
			let { productInfoVo } = this.state
			productInfoVo[name] = e.target.value
			this.setState({
				productInfoVo
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
=======
	onNumberChange = e => {
		const that = this
		this.setState({
			years: e
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
		}, ()=> {
			that.calculateTotal()
		})
	}
	
	verifyStepOne = () => {
<<<<<<< HEAD
		if(this.state.productId===1)return this.verifyMb()
		if(this.state.productId===7)return this.verifyLyb()
	}
	
	verifyLyb = () => {
		let result = false
		let { companyErrorText, projectErrorText, projectMainNameErrorText, linkPhoneErrorText, verifyProduct, productInfoVo } = this.state
		console.log(productInfoVo)
		if(trim(productInfoVo.companyName)===""){
=======
		let result = false
		let { companyErrorText, projectErrorText, projectMainNameErrorText, linkPhoneErrorText, verifyProduct, productCompanyInfoForm } = this.state
		if(trim(productCompanyInfoForm.companyName)===""){
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
			verifyProduct.companyName = true
			companyErrorText = error_empty_company
			result = true
		}
<<<<<<< HEAD
		if(testSpace(productInfoVo.companyName)){
=======
		if(testSpace(productCompanyInfoForm.companyName)){
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
			verifyProduct.companyName = true
			companyErrorText = error_sapce_company
			result = true
		}
<<<<<<< HEAD
		if(trim(productInfoVo.projectName)===""){
=======
		if(trim(productCompanyInfoForm.projectName)===""){
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
			verifyProduct.projectName = true
			projectErrorText = error_empty_project
			result = true
		}
<<<<<<< HEAD
		if(testSpace(productInfoVo.projectName)){
=======
		if(testSpace(productCompanyInfoForm.projectName)){
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
			verifyProduct.projectName = true
			projectErrorText = error_sapce_project
			result = true
		}
<<<<<<< HEAD
		if(trim(productInfoVo.projectMainName)===""){
=======
		if(trim(productCompanyInfoForm.projectMainName)===""){
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
			verifyProduct.projectMainName = true
			projectMainNameErrorText = error_empty_projectbody
			result = true
		}
<<<<<<< HEAD
		if(testSpace(productInfoVo.projectMainName)){
=======
		if(testSpace(productCompanyInfoForm.projectMainName)){
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
			verifyProduct.projectMainName = true
			projectMainNameErrorText = error_sapce_projectbody
			result = true
		}
		
<<<<<<< HEAD
		if(trim(productInfoVo.linkPhone)===""){
=======
		if(trim(productCompanyInfoForm.linkPhone)===""){
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
			verifyProduct.linkPhone = true
			linkPhoneErrorText = error_empty_linkphone
			result = true
		}
<<<<<<< HEAD
		if(!testPhone(productInfoVo.linkPhone)){
=======
		if(!testPhone(productCompanyInfoForm.linkPhone)){
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
			verifyProduct.linkPhone = true
			linkPhoneErrorText = error_sapce_linkphone
			result = true
		}
		
<<<<<<< HEAD
		if(trim(productInfoVo.location)===""){
			verifyProduct.location = true
			result = true
		}
		if(!productInfoVo.cityId.length){
=======
		if(trim(productCompanyInfoForm.location)===""){
			verifyProduct.location = true
			result = true
		}
		if(!productCompanyInfoForm.cityId.length){
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
	
<<<<<<< HEAD
	verifyMb = () => {
		let result = false
		let { parkingErrorText, verifyProduct, productInfoVo } = this.state
		if(trim(productInfoVo.parkingName)===""){
			verifyProduct.parkingName = true
			parkingErrorText = error_empty
			result = true
		}
		if(testSpace(productInfoVo.parkingName)){
			verifyProduct.parkingName = true
			parkingErrorText = error_space
			result = true
		}
		if(trim(productInfoVo.parkingLocation)===""){
			verifyProduct.parkingLocation = true
			result = true
		}
		if(!productInfoVo.cityId.length){
			verifyProduct.cityId = true
			result = true
		}
		if(trim(productInfoVo.parkingAttribute)===""){
			verifyProduct.parkingAttribute = true
			result = true
		}
			
		if(!productInfoVo.customerId){
			verifyProduct.customerId = true
			result = true
		}
		this.setState({
			verifyProduct,
			parkingErrorText
		})
		return result
	}
	
=======
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
=======
			}else if(item.status==='done'&&item.url){
				list.push({
					uid: item.uid,
					name: item.name,
					status: 'done',
					url: item.url,
				})
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
			}else if(item.status==='uploading'){
				list.push({
					uid: item.uid,
					name: item.name,
					status: 'uploading',
				})
<<<<<<< HEAD
=======
			}else if(item.status==='removed'){
				list.push({
					uid: item.uid,
					name: item.name,
					status: 'removed',
				})
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
		let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
=======
		let userInfo = Base64.decode(sessionStorage.getItem('userInfo'));
		userInfo = JSON.parse(userInfo);
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
		let id = userInfo.contractorsBasevo.id
		getProductList({id: id}).then(res=> {
			if(res.code===1){
				let filter_data = res.data.filter(item=> item.id === this.state.productId)
<<<<<<< HEAD
				let childrenProList = filter_data[0].list
				
				childrenProList.forEach(item=> {
					detailVo.set(item.id, item)
				})
				
				if(this.state.productId === 1){
					this.handleMBPro(childrenProList)
				}
				this.setState({
					childrenProList
				})
				
=======
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
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
			}
		})
		getCustomerList({pageNum: 1, pageSize: 1000}).then(res=> {
			if(res.code===1){
				this.setState({
					customerList: res.data.list
				})
			}
		})
<<<<<<< HEAD
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
			  "productName": item.name,
			  "projectType": 1
			}
			detailVoList.push(vo)
		}
		if(couponFunc){
			let item = detailVo.get(couponFuncValue)
			let vo = {
			  "count": 1,
			  "projectId": item.id,
			  "productName": item.name,
			  "projectType": 2
			}
			detailVoList.push(vo)
		}
		if(cameraFunc&&cameraCount){
			let item = detailVo.get(cameraFunc)
			let vo = {
			  "count": cameraCount,
			  "projectId": item.id,
			  "productName": item.name,
			  "projectType": 3
			}
			detailVoList.push(vo)
		}
		this.setState({
			totalPrice,
			detailVoList
		})
		console.log(detailVoList)
	}
	
    render(){
		const { productInfoVo, customerList, verifyProduct } = this.state
		const mbStepOne = this.state.current===0&&this.state.productId===1
		const mbStepTwo = this.state.current===1&&this.state.productId===1
		const lybStepOne = this.state.current===0&&this.state.productId===7
		const lybStepTwo = this.state.current===1&&this.state.productId===7
=======
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
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
        return(
            <div className="container_wrap">
				<BreadCrumb 
					isRight={true}
					breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				<div className="srcoll_box">
					<div className="srcoll_box_inner">
						<div className="inner_top_title inner_top_title_withbom">
<<<<<<< HEAD
							<span className="default_title">
								{this.state.productId===1&&'麦泊停车授权'}
								{this.state.productId===7&&'劳易保工地实名制'}
							</span>
=======
							<span className="default_title">劳易保工地实名制</span>
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
							<div className="grey_color">请按照系统步骤,提交产品授权必要的信息</div>
						</div>
						<div className="step_box">
							<Steps current={this.state.current} size="small">
<<<<<<< HEAD
							  
							  {this.state.productId===1&&(<Step title="填写车场基本属性"/>)}
							  {this.state.productId===7&&(<Step title="填写项目基本属性"/>)}
=======
							  <Step title="填写项目基本属性"/>
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
							  <Step title="选择配置及报价"/>
							  <Step title="提交支付凭证"/> 
							</Steps>
						</div>
						{
<<<<<<< HEAD
							mbStepOne && (
								<div className="withdraw_box">
									<div className="withdraw_box_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>*车场名称:</span>
										<span>
											<div className="input_box">
												<Input 
													value={productInfoVo.parkingName}
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
													value={productInfoVo.cityId}
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
													value={productInfoVo.parkingLocation}
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
													value={productInfoVo.parkingAttribute}
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
													value={productInfoVo.customerId}
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
												<div className="add_btn">快速添加</div>
											</div>
										</span>
										<span className="dangerous_color">
											{verifyProduct.customerId && '请选择所属客户'}
										</span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>经纬度:</span>
										<span>
											<div className="input_box" style={{ paddingRight: '100px' }}>
												<Input
													value={productInfoVo.longitudeAndLatitude}
													onChange={this.onInputChange.bind(this, 'longitudeAndLatitude')}
													type="text" 
													placeholder="请输入"/>
												<div className="add_btn">
													<a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">
													快速拾取</a>
												</div>
											</div>
										</span>
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center">
										<span>单选:</span>
										<span>
											<div className="input_box">
												<Radio.Group 
													name="radiogroup" 
													value={productInfoVo.parkType}
													onChange={this.onRadioChange.bind(this, 'parkType', 'productInfoVo')} >
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
							lybStepOne && (
=======
							current===0 && (
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
								<div className="withdraw_box">
									<div className="withdraw_box_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>*企业名称:</span>
										<span>
											<div className="input_box">
												<Input 
<<<<<<< HEAD
													value={productInfoVo.companyName}
=======
													value={productCompanyInfoForm.companyName}
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
													value={productInfoVo.projectName}
=======
													value={productCompanyInfoForm.projectName}
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
													value={productInfoVo.projectStatus}
=======
													value={productCompanyInfoForm.projectStatus}
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
													value={productInfoVo.projectMainName}
=======
													value={productCompanyInfoForm.projectMainName}
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
													value={productInfoVo.cityId}
=======
													value={productCompanyInfoForm.cityId}
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
													value={productInfoVo.location}
=======
													value={productCompanyInfoForm.location}
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
													value={productInfoVo.linkPhone}
=======
													value={productCompanyInfoForm.linkPhone}
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
												<Button onClick={this.nextStep} type="primary">下一步</Button>
												<Button>取消授权</Button>
=======
												<Button disabled={this.state.disabled} onClick={this.nextStep} type="primary">下一步</Button>
												<Button onClick={this.goBack}>取消授权</Button>
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
											</div>
										</span>
										<span></span>
									</div>
								</div>
							)
						}
						{
<<<<<<< HEAD
							mbStepTwo && (
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
=======
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
									
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
										<span>
											<Button type="primary" onClick={this.nextStep}>提交</Button>
=======
										<span className="flex_box">
											<Button type="primary" onClick={this.nextStep}>提交</Button>
											<Button style={{marginLeft: '15px'}} onClick={this.lastStep}>上一步</Button>
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
										</span>
										<span></span>
										<span></span>
									</div>
								</div>
							)
						}
						{
<<<<<<< HEAD
							this.state.current===2 && (
								<div className="step3_box">
									<div className="code_box flex_box flex_between">
										<span>
											<img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
										</span>
										<span>
											<span style={{display: 'block'}}>结算账户：545415415415415415</span>
=======
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
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
											<span style={{display: 'block'}}>结算金额：<strong className="large_title">{this.state.totalPrice}</strong> 元</span> 
										</span>
									</div>
									<div className="step3_box_item flex_box flex_center" style={{marginTop: '10px'}}>
										<span>*输入支付流水号:</span>
										<span>
											<div className="input_box">
<<<<<<< HEAD
												<Input type="text" placeholder="请输入"/>
=======
												<Input 
													value={this.state.tradNumber}
													onChange={this.fillTradNumber} 
													type="text" 
													placeholder="请输入"/>
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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
<<<<<<< HEAD
												<Button>等一等</Button>
=======
												<Button onClick={this.lastStep}>等一等</Button>
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
											</div>
										</span>
									</div>
								</div>
							)
						}
						{
<<<<<<< HEAD
							this.state.current===3 && (
								<div className="withdraw_box">
									<div className="status_icon">
										<div><Icon type="check-circle" theme="filled" /></div>
										<div className="large_title">操作成功</div>
=======
							submitInfo&&current===3 && (
								<div className="withdraw_box">
									<div className="status_icon">
										<div><Icon type="check-circle" theme="filled" /></div>
										<div className="large_title">授权申请已提交成功</div>
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
										<div className="withdraw_notice">
											<span>您已经操作成功，预计48小时内到达指定账</span>
										</div>
									</div>
									<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
<<<<<<< HEAD
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
=======
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
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
										<span></span>
									</div>
									<div className="withdraw_box_item flex_box flex_center withdraw_box_sitem">
										<span style={{lineHeight: '34px'}}>付款金额:</span>
										<span>
<<<<<<< HEAD
											<span className="large_title">5000,000,00</span>
											<span className="grey_color">(五万元整)</span>
=======
											<span className="large_title">{submitInfo.tradAmount}</span>
											<span className="grey_color">({this.state.chineseNum})</span>
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
										</span>
										<span></span>
									</div>
									<div className="withdraw_bottom flex_box flex_center">
										<span>
<<<<<<< HEAD
											<Button type="primary">继续授权</Button>
										</span>
										<span>
											<Button>返回</Button>
=======
											<Button onClick={this.continueAuth} type="primary">继续授权</Button>
										</span>
										<span>
											<Button onClick={this.goBack}>返回</Button>
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
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