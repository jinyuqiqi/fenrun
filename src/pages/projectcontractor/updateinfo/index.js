import React, { Component } from 'react';
import { Select, InputNumber, Switch, Input, Icon, Button, Radio } from 'antd';
import message from '@/utils/message';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus, updateCurrentInfo } from '@/store/reducer/action';
import { trim, testSpace, testPhone, testNum, testNumber, testMobile } from '@/utils/tool'; 
import { getRandomNum, getProductList, updateContractor } from '@/http/api';
import './index.css';

const { Option } = Select;
// const createDate = getNowFormatDate()
let handling = false

class UpdateInfo extends Component{
	constructor(props){
        super(props);
		this.state = {
			contractor: null,
			value: 1,
			createDate: null,
			pname: '',
			disabled: false,
			productList: null,
			contractorsForm: {
				number: '',
				name : '',
				id: null,
				address: '',
				linkPhone: '',
				secretPhone: '',
				handlingFee: '',
				advertisingFee: '',
				accountName: '',
				status: true,
				cstatus: 1,
				pid: null
			},
			verifyForm: {},
			errorText: {},
			verifyPro: [],
			errorPro: []
		}
    }
	
	static propTypes = {
		contractorForm: PropTypes.object.isRequired,
	    updateStatus: PropTypes.func.isRequired,
		updateCurrentInfo: PropTypes.func.isRequired,
	}
	
	componentWillReceiveProps(nextProps){
		if(handling) return
		let id = nextProps.contractorForm.id
		if(id!==this.state.contractorsForm.id){
			this.updateStateForm(nextProps.contractorForm)
		}
	}

	componentDidMount(){
		this.updateStateForm(this.props.contractorForm)
		this.assignment(this.state.contractorsForm)
		
	}
	
	assignment(obj){
		let _obj = {}
		let _objs = {}
		for(const key in obj){
			_obj[key] = false
			_objs[key] = ''
		}
		this.setState({
			verifyForm: _obj,
			errorText: _objs
		})
	}
	
	updateStateForm = _contractorForm => {
		console.log(_contractorForm)
		handling = true
		let { contractorsForm, productList, pname, createDate } = this.state
		for(const key in contractorsForm){
			if(key==='status'){
				contractorsForm.status = _contractorForm.status===1?true:false
			} else{
				contractorsForm[key] = _contractorForm[key]
			}
		}
		createDate = _contractorForm.createTime
		pname = _contractorForm.pname?_contractorForm.pname:'无'
		
		productList = _contractorForm.goodsInfoList.map(item=> {
			item['use'] = 1
			item.clist.map(val=> {
				val['errtext'] = '';
				val['error'] = false
				return val
			})
			return item
		})
		this.setState({
			pname,
			createDate,
			productList,
			contractorsForm
		})
		handling = false
	}
	
	onTextInputChange = (name, e) => {
		if(name==="linkPhone"||name==="secretPhone"){
			if(!testNumber(e.target.value)) return
		}
		let { contractorsForm, verifyForm, errorText } = this.state
		contractorsForm[name] = e.target.value
		this.setState({
			contractorsForm
		})
		if(verifyForm[name]){
			verifyForm[name] = false
			this.setState({
				verifyForm
			})
		}
	}
	
	onNumberInputChange = (name, e) => {
		if(!testNum(e.target.value)&&e.target.value!='') return
		if(Number(e.target.value)<0&&e.target.value!='') return
		if(Number(e.target.value)>100&&e.target.value!='') return
		let { verifyForm, contractorsForm } = this.state
		contractorsForm[name] = e.target.value
		this.setState({
			contractorsForm
		})
		if(verifyForm[name]){
			verifyForm[name] = false
			this.setState({
				verifyForm
			})
		}
	}
	
	onSwitchChange = e => {
		let { contractorsForm } = this.state
		contractorsForm.status = e
		this.setState({
			contractorsForm
		})
	}
	
	onRadioChange = (name, index, e) => {
		if(name==='cstatus'){
			let { contractorsForm } = this.state
			contractorsForm.cstatus = e.target.value
			this.setState({
				contractorsForm
			})
		}
		if(name==='use'){
			let { productList } = this.state
			productList[index].use = e.target.value
			if(e.target.value===0){
				productList[index].clist.forEach(item=> {
					item.error = false
				})
			}
			this.setState({
				productList
			})
		}
	}
	
	onPriceChange = (index, idx, e)=> {
		e.persist()
		if(!testNum(e.target.value)&&e.target.value!='') return
		if(Number(e.target.value)<=0&&e.target.value!='') return
		
		let { productList } = this.state
		productList[index].clist[idx].price = e.target.value
		productList[index].clist[idx].profit = e.target.value===""?0:e.target.value
		
		if(productList[index].clist[idx].error){
			productList[index].clist[idx].error = false
		}
		
		this.setState({
			productList
		})
		
	}
	
	submitEvent = ()=> {
		if(!this.verifyParams()) return
		let ContractorsForm = this.fetchParams()
		updateContractor(ContractorsForm).then(res=> {
			if(res.code===1){
				message.success('成功')
				let plyload = {
					willUpdate: true,
					updateCurrentId: this.state.contractorsForm.id
				}
				this.props.updateCurrentInfo(plyload)
				this.props.history.replace({pathname: "/index/projectcontractor/detailinfo"})
			}
		})
	}
	
	cancelEvent = () => {
		let plyload = {
			willUpdate: true,
			updateCurrentId: this.state.contractorsForm.pid
		}
		this.props.updateCurrentInfo(plyload)
		this.props.history.replace({pathname: "/index/projectcontractor/detailinfo"})
	}
	
	verifyParams = () => {
		let result = true
		let { verifyForm, contractorsForm, errorText, productList } = this.state
		for(let key in contractorsForm){
			if(key==="linkPhone"||key==="secretPhone"){
				if(!testMobile(contractorsForm.secretPhone)){
					verifyForm.secretPhone = true
					errorText.secretPhone = '请输入正确的手机号码'
					result = false
				}
				if(!testPhone(contractorsForm.linkPhone)){
					verifyForm.linkPhone = true
					errorText.linkPhone = '请输入正确的联系方式'
					result = false
				}
			}
			if(key==="name"||key==="address"||key==="accountName"){
				if(testSpace(contractorsForm[key])){
					verifyForm[key] = true
					errorText[key] = '输入内容不能包含空格'
					result = false
				}
			}
			if(trim(contractorsForm[key])===""){
				verifyForm[key] = true
				errorText[key] = '请输入'
				result = false
			}
			this.setState({
				verifyForm,
				errorText
			})
		}
		if(productList){
			productList.forEach(item=> {
				item.clist.forEach(val=> {
					if(isNaN(val.price)){
						val.error = true
						val.errtext = '请输入正确的数字金额'
						result = false
					}
					if(trim(val.price)===""){
						val.error = true
						val.errtext = '请输入'
						result = false
					}	
				})
			})
			this.setState({
				productList
			})
		}
		return result
	}
	
	fetchParams = () => {
		let ContractorsForm = {}
		let goodsInfoList = []
		let { contractorsForm, productList } = this.state
		Object.assign(ContractorsForm, contractorsForm)
		if(productList){
			productList.forEach(item=> {
				if(item.use&&item.clist){
					goodsInfoList.push({
						cstatus: item.cstatus,
						goodsId: item.goodsId,
						group: item.group,
						id: item.id,
					})
					item.clist.forEach(val=> {
						goodsInfoList.push({
							cstatus: val.cstatus,
							goodsId: val.goodsId,
							group: val.group,
							id: val.id,
							price: val.price
						})
					})
				}
			})
		}
		ContractorsForm['status'] = ContractorsForm.status?1:0
		ContractorsForm['goodsInfoList'] = goodsInfoList
		return ContractorsForm
	}
		
    render(){
		const { contractorsForm, productList, verifyForm, errorText } = this.state
        return(
            <div className="right_wraper">
				<div className="inner_top_title flex_box flex_between">
					<span className="default_title">工程商基本信息</span>
					<div className="inner_top_title_btns">
						<Button onClick={this.submitEvent} type="primary">确定</Button>
						<Button onClick={this.cancelEvent}>取消</Button>
					</div>
				</div>
				<div className="contractor_box">
					<div className="contractor_item">
						<div className="item_title flex_box flex_between">
							<span className="mini_title">基本信息</span>
							<span>创建日期：{this.state.createDate}</span>
						</div>
						<div className="self_table">
							<div className="self_table_cell flex_box">
								<div className="self_table_tr">编号:</div>
								<div className="self_table_td">
									{
										verifyForm.number&&(
											<span className="rename_icon pointer">
												<Icon onClick={this.fetchRandomNum} type="sync" />
											</span>
										)
									}
									<Input 
										value={contractorsForm.number}
										placeholder="请输入" 
										readOnly />
								</div>
							</div>
							<div className="self_table_cell flex_box">
								<div className="self_table_tr">名称:</div>
								<div className="self_table_td">
									{
										verifyForm.name&&(
											<span className="error_text dangerous_color">{errorText.name}</span>
										)
									}
									<Input 
										value={contractorsForm.name}
										onChange={this.onTextInputChange.bind(this, 'name')}
										placeholder="请输入" />
								</div>
							</div>
							<div className="self_table_cell flex_box">
								<div className="self_table_tr">上级分销商:</div>
								<div className="self_table_td">
									{
										this.state.pname===""&&(
											<span className="rename_icon pointer"><Icon type="sync" /></span>
										)
									}
									<Input
										value={this.state.pname}
										placeholder="请输入" 
										readOnly/>
								</div>
							</div> 
							<div className="self_table_cell flex_box">
								<div className="self_table_tr">地址:</div>
								<div className="self_table_td">
									{
										verifyForm.address&&(
											<span className="error_text dangerous_color">{errorText.address}</span>
										)
									}
									<Input 
										value={contractorsForm.address}
										onChange={this.onTextInputChange.bind(this, 'address')}
										placeholder="请输入" />
								</div>
							</div> 
							<div className="self_table_cell flex_box">
								<div className="self_table_tr">联系电话:</div>
								<div className="self_table_td">
									{
										verifyForm.linkPhone&&(
											<span className="error_text dangerous_color">{errorText.linkPhone}</span>
										)
									}
									<Input 
										value={contractorsForm.linkPhone}
										onChange={this.onTextInputChange.bind(this, 'linkPhone')}
										placeholder="请输入" />
								</div>
							</div>
							<div className="self_table_cell flex_box">
							 	<div className="self_table_tr">保密手机:</div>
							 	<div className="self_table_td">
									{
										verifyForm.secretPhone&&(
											<span className="error_text dangerous_color">{errorText.secretPhone}</span>
										)
									}
							 		<Input 
										value={contractorsForm.secretPhone}
										onChange={this.onTextInputChange.bind(this, 'secretPhone')}
										placeholder="请输入" />
							 	</div>
							</div>
						</div>
					</div>
					<div className="contractor_item">
						<div className="item_title">
							<span className="mini_title">分润比例</span>
						</div>
						<div className="self_table">
							<div className="self_table_cell flex_box">
								<div className="self_table_tr">手续费分润:</div>
								<div className="self_table_td">
									{
										verifyForm.handlingFee&&(
											<span className="error_text dangerous_color">{errorText.handlingFee}</span>
										)
									}
									<Input 
										value={contractorsForm.handlingFee}
										placeholder="请输入" 
										onChange={this.onNumberInputChange.bind(this, 'handlingFee')}/>%
								</div>
							</div>
							<div className="self_table_cell flex_box">
								<div className="self_table_tr">广告费分润:</div>
								<div className="self_table_td">
									{
										verifyForm.advertisingFee&&(
											<span className="error_text dangerous_color">{errorText.advertisingFee}</span>
										)
									}
									<Input 
										value={contractorsForm.advertisingFee}
										placeholder="请输入" 
										onChange={this.onNumberInputChange.bind(this, 'advertisingFee')}/>%
								</div>
							</div>
						</div>
					</div>
					<div className="contractor_item">
						<div className="item_title">
							<span className="mini_title">高级设置</span>
						</div>
						<div className="self_table">
							<div className="self_table_cell flex_box">
								<div className="self_table_tr">状态：</div>
								<div className="self_table_td">
									<Switch 
										checkedChildren="开" 
										unCheckedChildren="关" 
										checked={contractorsForm.status} 
										onChange={this.onSwitchChange}/>
								</div>
							</div>
							<div className="self_table_cell flex_box">
								<div className="self_table_tr">管理员帐号:</div>
								<div className="self_table_td">
									{
										verifyForm.accountName&&(
											<span className="error_text dangerous_color">{errorText.accountName}</span>
										)
									}
									<Input
										value={contractorsForm.accountName}
										onChange={this.onTextInputChange.bind(this, 'accountName')}
										placeholder="请输入" />
								</div>
							</div>
							<div className="self_table_cell flex_box">
								<div className="self_table_tr">是否可以建立下级分销商:</div>
								<div className="self_table_td">
									{
										this.state.disabled && (
											<Radio.Group 
												value={2}>
												<Radio value={1}>是</Radio>
												<Radio value={2}>否</Radio>
											</Radio.Group>
										)
									}
									{
										!this.state.disabled && (
											<Radio.Group 
												onChange={this.onRadioChange.bind(this, 'cstatus', null)} 
												value={contractorsForm.cstatus}>
												<Radio value={1}>是</Radio>
												<Radio value={2}>否</Radio>
											</Radio.Group>
										)
									}
								</div>
							</div>
								{
									productList && productList.map((item, index)=> {
										return (
											<div key={item.id}>
												<div className="self_table_cell flex_box">
													<div className="self_table_tr">是否可以授权{item.goodsName}产品:</div>
													<div className="self_table_td">
														<Radio.Group 
															onChange={this.onRadioChange.bind(this, 'use', index)} 
															value={item.use}>
															<Radio value={1}>是</Radio>
															<Radio value={0}>否</Radio>
														</Radio.Group>
													</div>
												</div>
												{
													item.use===1&&item.clist.length && item.clist.map((val, idx)=> {
														return (
															<div className="self_table_cell flex_box" key={val.id}>
																<div className="self_table_tr">{val.goodsName}:</div>
																<div className="self_table_td">
																	{
																		val.error&&(
																			<span className="error_text dangerous_color">{val.errtext}</span>
																		)
																	}
																	<Input
																		value={val.price}
																		onChange={this.onPriceChange.bind(this, index, idx)}
																		placeholder="请输入"/>元/年 利润: <strong className="profit_text">{val.profit}</strong>元
																</div>
															</div>
														)
													})
												}
											</div>	
										)
									})
								}
						</div>
					</div>
				</div>
            </div>  
        )
    }
}

export default connect(state => ({
	contractorForm: state.storeState.contractorForm,
 }), {
	 updateStatus,
	 updateCurrentInfo
 })(UpdateInfo);