import React, { Component } from 'react';
import { Select, InputNumber, Switch, Input, Icon, Button, Radio } from 'antd';
import message from '@/utils/message';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus, updateCurrentInfo } from '@/store/reducer/action';
import { trim, testSpace, testPhone, testNum, testNumber, testMobile, getNowFormatDate } from '@/utils/tool'; 
import { getRandomNum, getProductList, addContractor } from '@/http/api';
import './index.css';

const { Option } = Select;
const createDate = getNowFormatDate()
function onChange(value) {
  console.log(`selected ${value}`);
}

class FormInfo extends Component{
	constructor(props){
        super(props);
		this.state = {
			contractor: null,
			value: 1,
			createDate,
			pname: '',
			disabled: false,
			productList: null,
			contractorsForm: {
				number: '',
				name : '',
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
		
		this.fetchRandomNum()
    }
	
	static propTypes = {
		contractorForm: PropTypes.object.isRequired,
		updateStatus: PropTypes.func,
		updateCurrentInfo: PropTypes.func,
	    // updateContractor: PropTypes.func.isRequired
	}
	
	componentWillReceiveProps(nextProps){
		let pid = nextProps.contractorForm.id
		if(pid!==this.state.contractorsForm.pid){
			this.fetchRandomNum()
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
	
	updateStateForm = contractorForm => {
		const that = this
		let live = (contractorForm&&contractorForm.live)?contractorForm.live:1
		let disabled = live+1===3?true:false
		let { contractorsForm } = that.state
		contractorsForm.pid = contractorForm.id
		that.setState({
			disabled,
			contractorsForm,
			pname: contractorForm.name
		})
		that.fetchProductList(contractorForm.id)
	}
	
	fetchRandomNum = () => {
		let { contractorsForm } = this.state 
		getRandomNum().then(res=> {
			if(res.code===1){
				contractorsForm.number = res.data
				this.setState({
					contractorsForm
				})
			}
		})
	}
	
	fetchProductList = id => {
		getProductList({id: id}).then(res=> {
			if(res.code===1){
				let productList = res.data.map(item=> {
					item['use'] = 1
					item.list.map(val=> {
						val['price'] = '';
						val['profit'] = '0';
						val['errtext'] = '';
						val['error'] = false
						return val
					})
					return item
				})
				this.setState({
					productList
				})
			}
		})
	}
	
	// componentWillUnmount(){
	// 	emitter.removeListener(this.eventEmitter)
	// }
	
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
				productList[index].list.forEach(item=> {
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
		console.log(this.props.contractorForm)
		if(!testNum(e.target.value)&&e.target.value!='') return
		if(Number(e.target.value)<=0&&e.target.value!='') return
		
		let { productList } = this.state
		let profit = Number(e.target.value) - productList[index].list[idx].originalPrice
		productList[index].list[idx].price = e.target.value
		productList[index].list[idx].profit = e.target.value===""?0:profit
		
		if(productList[index].list[idx].error){
			productList[index].list[idx].error = false
		}
		
		this.setState({
			productList
		})
		
	}
	
	submitEvent = ()=> {
		if(!this.verifyParams()) return
		let ContractorsForm = this.fetchParams()
		addContractor(ContractorsForm).then(res=> {
			if(res.code===1){
				message.success('成功')
				
				let plyload = {
					willUpdate: true,
					updateCurrentId: res.data
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
				if(item.use){
					item.list.forEach(val=> {
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
				}
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
				if(item.use&&item.list){
					goodsInfoList.push({
						cstatus: item.status,
						goodsId: item.id,
						group: item.group,
					})
					item.list.forEach(val=> {
						goodsInfoList.push({
							cstatus: val.status,
							goodsId: val.id,
							group: val.group,
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
													<div className="self_table_tr">是否可以授权{item.name}产品:</div>
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
													item.use===1&&item.list.length && item.list.map((val, idx)=> {
														return (
															<div className="self_table_cell flex_box" key={val.id}>
																<div className="self_table_tr">{val.name}:</div>
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
 })(FormInfo);