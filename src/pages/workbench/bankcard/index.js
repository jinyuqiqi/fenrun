 import React, { Component } from 'react';
 import { Radio, Upload, Icon, Input, Button, Select, Cascader } from 'antd';
 import BreadCrumb from '@/components/breadcrumb';
 import { Base64 } from 'js-base64';
 import { addBackCard, uploadUrl, updateBankCardInfo } from '@/http/api';
 import { testNumber, testSpace, trim, testBankCard } from '@/utils/tool';
 import options from '@/utils/city';
 import message from '@/utils/message';
 import './index.css';
 const login_arr = [1000, 1005, 1007]
 
 export default class BankCard extends Component{
 	constructor(props){
        super(props);
 		this.state = {
			init: true,
			token: sessionStorage.getItem('token'),
 			breadcrumbList: [
 				{
 					path: '/index/workbench',
 					title: '工作台'
 				},
 				{
 					title: '银行卡'
 				}
 			],
			type: 1,
			businessNumber: "",
			cardNumber: "",
			companyName: "",
			id: 0,
			idCardList: [],
			idCardPositive: "",
			idCardReverse: "",
			openBank: "",
			openCityId: [],
			openCityName: "",
			openName: "",
			permitPhoto: "",
			permitPhotoList: [],
			verifyParam: {
				permitPhotoList: false,
				companyName: false,
				businessNumber: false,
				cardNumber: false,
				idCardList: false,
				openCityId: false,
				openBank: false,
				openName: false
			},
			allowClick: false
 		}
    }
	
	componentWillMount(){
		if(this.props.location.state||sessionStorage.getItem('bankId')){
			let bankInfo = JSON.parse(Base64.decode(sessionStorage.getItem('bank')));
			let idCardList = []
			let permitPhotoList = []
			let openCityId = bankInfo.openCity.split(',')
			idCardList.push({
				uid: '-1',
				name: 'card',
				status: 'done',
				url: bankInfo.idCardPositive,
			})
			idCardList.push({
				uid: '-2',
				name: 'card',
				status: 'done',
				url: bankInfo.idCardReverse,
			})
			permitPhotoList.push({
				uid: '-2',
				name: 'card',
				status: 'done',
				url: bankInfo.permitPhoto,
			})
			this.setState({
				init: true,
				type: bankInfo.type,
				businessNumber: bankInfo.businessNumber,
				cardNumber: bankInfo.cardNumber,
				companyName: bankInfo.companyName,
				idCardList,
				openBank: bankInfo.openBank,
				openCityId,
				openName: bankInfo.openName,
				permitPhotoList,
			})
			
			if(!sessionStorage.getItem('bankId')){
				sessionStorage.setItem('bankId', String(this.props.location.state.id))
			}
		}
	}
	
	componentWillUnmount(){
		sessionStorage.removeItem('bankId')
	}
 
 	componentDidMount(){
		this.setState({
			init: false
		})
 	}
	
	onRadioChange = e => {
		this.setState({
			type: e.target.value
		})
	}
	
	handlePreview = e => {
		window.open(e.url)
	}
	
	handleRemove = (name, e) => {
		// console.log(e)
		// let fileList = this.state[name].filter(item=> item.status!=='removed')
		// this.setState({
		// 	[name]: fileList
		// })
		// console.log(fileList)
	}
	
	onInputChange = (name, e) => {
		e.persist()
		if(name==="cardNumber"&&!testNumber(e.target.value)&&e.target.value!=="")return false
		
		let { verifyParam } = this.state
		if(verifyParam[name]) verifyParam[name] = false
		
		this.setState({
			verifyParam,
			[name]: e.target.value
		})
	}
	
	onCityCodeChange = (value, option) => {
		let openCityId = value;
		let openCityName = '';
		let { verifyParam } = this.state
		if(verifyParam.openCityId) verifyParam.openCityId = false
		
		if(option.length){
			openCityName = option[0].label+''+option[1].label+''+option[2].label
		}
		
		this.setState({
			openCityId,
			openCityName,
			verifyParam
		})
	}
	
	handleChange = (name, { file, fileList }) => {
		const that = this
		let updateState = true
		let list = []
		let { verifyParam } = this.state
		if(verifyParam[name]) verifyParam[name] = false
		
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
				if(file.response&&login_arr.includes(file.response.code)){
					message.error('登录状态错误，请重新登录')
					updateState = false
					that.props.history.replace({pathname:"/login"})
				}else{
					list.push({
						uid: item.uid,
						name: item.name,
						status: 'error',
					})
				}
			}
		})
		if(!updateState) return
		this.setState({ 
			verifyParam,
			[name]: list
		})
	}
	
	onSubmit = () => {
		const that = this
		let verify = this.verifyParams()
		if(!verify) return
		this.setState({
			allowClick: true
		})
		let params = this.takeParam()
		if(params.id){
			updateBankCardInfo(params).then(res=> {
				that.submitSuccessCb(res, that)
			}).catch(err=> {
				that.submitErrorCb(that)
			})
			return
		}
		addBackCard(params).then(res=> {
			that.submitSuccessCb(res, that)
		}).catch(err=> {
			that.submitErrorCb(that)
		})
	}
	
	submitSuccessCb = (res, that) => {
		if(res.code===1){
			message.success('成功!')
			setTimeout(()=> {
				that.props.history.replace({pathname: "/index"})
			},1500)
			return
		}
		that.setState({
			allowClick: false
		})
	}
	
	submitErrorCb = that => {
		that.setState({
			allowClick: false
		})
	}
	
	goBack = () => {
		this.props.history.replace({pathname: "/index"})
	}
	
	takeParam = () => {
		let param = {
			type: this.state.type,
			businessNumber: this.state.businessNumber,
			cardNumber: this.state.cardNumber,
			companyName: this.state.companyName,
			idCardPositive: this.state.idCardList[0].url,
			idCardReverse: this.state.idCardList[1].url,
			openBank: this.state.openBank,
			openCity: this.state.openCityId.join(","),
			openCityName: this.state.openCityName,
			openName: this.state.openName,
			permitPhoto: this.state.permitPhotoList[0].url,
		}
		if(this.props.location.state){
			param['id'] = this.props.location.state.id
		}
		return param
	}
	
	verifyParams = () => {
		let result = true
		let { verifyParam } = this.state
		if(this.state.openCityId.length<=0){
			verifyParam.openCityId = true
			result = false	
		}
		if(this.state.permitPhotoList.length<=0){
			verifyParam.permitPhotoList = true
			result = false	
		}
		if(this.state.idCardList.length<=1){
			verifyParam.idCardList = true
			result = false
		}
		if(trim(this.state.companyName)===""){
			verifyParam.companyName = true
			result = false
		}
		if(trim(this.state.businessNumber)===""){
			verifyParam.businessNumber = true
			result = false
		}
		if(trim(this.state.openBank)===""){
			verifyParam.openBank = true
			result = false
		}
		if(trim(this.state.openName)===""){
			verifyParam.openName = true
			result = false
		}
		if(!testBankCard(this.state.cardNumber)||trim(this.state.cardNumber)===""){
			verifyParam.cardNumber = true
			result = false
		}
		this.setState({
			verifyParam
		})
		return result
	}
 
    render(){
         return(
             <div className="container_wrap">
 				<BreadCrumb breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				{
					this.state.init&&(
						<div className="srcoll_box">
							<div className="srcoll_box_inner"></div>
						</div>
					)
				}
				{
					!this.state.init&&(
						<div className="srcoll_box">
							<div className="srcoll_box_inner">
								<div className="inner_top_title flex_box flex_between">
									<span className="default_title">
										{!this.props.location.state&&'添加银行卡'}
										{this.props.location.state&&'修改银行卡'}
									</span>
									<div></div>
								</div>
								<div className="bank_card_box">
									<div className="bank_card_form">
										<div className="bank_card_form_item flex_box flex_center align_items_center">
											<span className="mini_title">开通类型</span>
											<span></span>
										</div>
										<div className="bank_card_form_item flex_box flex_center align_items_center">
											<span></span>
											<span>
												<Radio.Group
													defaultValue={1}
													vale={this.state.type}
													onChange={this.onRadioChange}>
												        <Radio value={1}>企业对公</Radio>
												        <Radio value={2}>企业对私</Radio>
												</Radio.Group>
											</span>
										</div>
									</div>
									<div className="bank_card_form">
										<div className="bank_card_form_item flex_box flex_center align_items_center">
											<span className="mini_title">企业营业信息</span>
											<span></span>
										</div>
										<div className="bank_card_form_item flex_box flex_center">
											<span>*营业执照:</span>
											<span>
												<div className="upload_outter_box">
													<Upload
													  headers={{token: this.state.token}}
													  action={uploadUrl}
													  listType="picture-card"
													  fileList={this.state.permitPhotoList}
													  onRemove={this.handleRemove.bind(this, "permitPhotoList")}
													  onPreview={this.handlePreview}
													  onChange={this.handleChange.bind(this, "permitPhotoList")}
													>
													  {this.state.permitPhotoList.length >= 1 ? null : (
															<div>
																<Icon type="plus" />
																<div className="ant-upload-text">上传照片</div>
															 </div>
													  )}
													</Upload>
													<div className="upload_notice">格式要求: 原件照片,扫描件或加公章的复印件, 支持jpg,bmp,gif,png.</div>
												</div>
											</span>
											{
												this.state.verifyParam.permitPhotoList&&(
													<span className="dangerous_color">请上传营业执照照片</span>
												)
											}
											
										</div>
										<div className="bank_card_form_item flex_box flex_center align_items_center">
											<span>*企业名称:</span>
											<span>
												<div style={{width: '300px'}}>
													<Input 
														type="text" 
														maxLength={20}
														value={this.state.companyName}
														onChange={this.onInputChange.bind(this, 'companyName')}
														placeholder="请输入" />
												</div>
											</span>
											{
												this.state.verifyParam.companyName&&(
													<span className="dangerous_color">请输入企业名称</span>
												)
											}
										</div>
										<div className="bank_card_form_item flex_box flex_center align_items_center" style={{paddingBottom: '22px'}}>
											<span>*企业执照编号:</span>
											<span>
												<div className="input_outter_box" style={{width: '300px'}}>
													<Input 
														maxLength={30}
														type="text"
														value={this.state.businessNumber}
														onChange={this.onInputChange.bind(this, 'businessNumber')}
														placeholder="请输入" />
													<div className="input_notice">三证合一企业填统一信用代码</div>
												</div>
											</span>
											{
												this.state.verifyParam.businessNumber&&(
													<span className="dangerous_color">请输入企业执照编号</span>
												)
											}
										</div>
									</div>
									<div className="bank_card_form">
										<div className="bank_card_form_item flex_box flex_center align_items_center">
											<span className="mini_title">
												银行对
												{
													this.state.type===1&&'公'
												}
												{
													this.state.type===2&&'私'
												}
												账户信息
											</span>
											<span></span>
										</div>
										<div className="bank_card_form_item flex_box flex_center align_items_center">
											<span>*开户人姓名:</span>
											<span>
												<div style={{width: '300px'}}>
													<Input 
														maxLength={5}
														type="text"
														value={this.state.openName}
														onChange={this.onInputChange.bind(this, 'openName')}
														placeholder="请输入" />
												</div>
											</span>
											{
												this.state.verifyParam.openName&&(
													<span className="dangerous_color">请输入正确开户人姓名</span>
												)
											}
										</div>
										<div className="bank_card_form_item flex_box flex_center">
											<span>*开户许可证照片:</span>
											<span>
												<div className="upload_outter_box">
													<Upload
													  headers={{token: this.state.token}}
													  action={uploadUrl}
													  listType="picture-card"
													  fileList={this.state.idCardList}
													  onRemove={this.handleRemove.bind(this, "idCardList")}
													  onPreview={this.handlePreview}
													  onChange={this.handleChange.bind(this, "idCardList")}
													>
													  {this.state.idCardList.length >= 2 ? null : (
															<div>
																<Icon type="plus" />
																<div className="ant-upload-text">上传照片</div>
															 </div>
													  )}
													</Upload>
													<div className="upload_notice">格式要求: 原件照片,扫描件或加公章的复印件, 支持jpg,bmp,gif,png.</div>
												</div>
											</span>
											{
												this.state.verifyParam.idCardList&&(
													<span className="dangerous_color">请上传开户许可证照片</span>
												)
											}
										</div>
										<div className="bank_card_form_item flex_box flex_center align_items_center">
											<span>*卡号:</span>
											<span>
												<div style={{width: '300px'}}>
													<Input 
														maxLength={20}
														type="text"
														value={this.state.cardNumber}
														onChange={this.onInputChange.bind(this, 'cardNumber')}
														placeholder="请输入" />
												</div>
											</span>
											{
												this.state.verifyParam.cardNumber&&(
													<span className="dangerous_color">请输入正确的银行卡号</span>
												)
											}
										</div>
										<div className="bank_card_form_item flex_box flex_center align_items_center">
											<span>*开户城市:</span>
											<span>
												<div style={{width: '300px'}} id="citySelect">
													<Cascader 
														options={options}
														value={this.state.openCityId}
														onChange={this.onCityCodeChange} 
														placeholder="请选择" />
												</div>
											</span>
											{
												this.state.verifyParam.openCityId&&(
													<span className="dangerous_color">请选择银行卡开户城市</span>
												)
											}
										</div>
										<div className="bank_card_form_item flex_box flex_center align_items_center">
											<span>*开户银行:</span>
											<span>
												<div style={{width: '300px'}}>
													<Input 
														maxLength={15}
														type="text"
														value={this.state.openBank}
														onChange={this.onInputChange.bind(this, 'openBank')}
														placeholder="请输入" />
												</div>
											</span>
											{
												this.state.verifyParam.openBank&&(
													<span className="dangerous_color">请填写开户行</span>
												)
											}
										</div>
									</div>
									<div className="bank_card_form">
										<div className="bank_card_form_item flex_box flex_center align_items_center">
											<span></span>
											<span className="submit_btns">
												<Button disabled={this.state.allowClick} onClick={this.onSubmit} type="primary">提交</Button>
												<Button disabled={this.state.allowClick} onClick={this.goBack}>返回</Button>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				}
 				
             </div>  
         )
     }
 }