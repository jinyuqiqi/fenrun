import React, { Component } from 'react';
import { Button, Modal } from 'antd';
<<<<<<< HEAD
=======
import { Base64 } from 'js-base64';
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
import { getContractorInfo, delContractor } from '@/http/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus, updateContractorForm } from '@/store/reducer/action';
import message from '@/utils/message';
import './index.css'; 
let requesting = false
class DetailInfo extends Component{
	constructor(props){
        super(props);
		
		this.state = {
			contractorInfo: null,
			myAuth: {}
		}
		
		if(props.contractorId){
			this.fetchContractorInfo(props.contractorId)
		}
    }
	
	static propTypes = {
		contractorId: PropTypes.number,
		updateStatus: PropTypes.func,
		updateContractorForm: PropTypes.func,
<<<<<<< HEAD
=======
	}
	
	componentWillMount(){
		let contractorAuthInfo = JSON.parse(Base64.decode(sessionStorage.getItem('contractorAuthInfo')))
		this.setState({
			myAuth: contractorAuthInfo
		})
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
	}
	
	componentWillReceiveProps(nextProps){
		if(requesting) return
		let pid = nextProps.contractorId
		let sid = this.state.contractorInfo?this.state.contractorInfo.id:null
		if(pid&&(String(pid)!==String(sid))){
			this.fetchContractorInfo(pid)
		}
	}

	
	removeEvent = () => {
		const that = this
		Modal.confirm({
			width: 360,
			title: '提示!',
			content: '删除后该工程商将无法登录,请确认是否继续?',
			onOk() {
			  delContractor({id: that.props.contractorId}).then(res=> {
			  	if(res.code===1){
					message.success('成功!')
			  		let willUpdate = true
			  		that.props.updateStatus(willUpdate)
			  	}
			  })
			},
			onCancel() {
			  
			},
		});
		
	}

	editEvent = () => {
		const contractorForm = this.state.contractorInfo
		this.props.updateContractorForm(contractorForm)
		this.props.history.push({pathname: "/index/projectcontractor/updateinfo"})
	}
	
	fetchContractorInfo = id => {
		requesting = true
		getContractorInfo({id: id}).then(res=> {
			if(res.code===1){
				let contractorInfo = res.data
				contractorInfo['filterstatus'] = contractorInfo.status?'已开通':'未开通'
				contractorInfo['filtercstatus'] = contractorInfo.cstatus?'是':'否'
				contractorInfo['createTime'] = contractorInfo.createTime.substr(0, 10)
				this.setState({
					contractorInfo: res.data
				})
				
			}
			requesting = false
		}).catch(error=> {
			requesting = false
		})
	}
	
    render(){
		const { contractorInfo } = this.state
        return(
            <div className="right_wraper">
				<div className="inner_top_title flex_box flex_between">
					<span className="default_title">工程商基本信息</span>
					{
						contractorInfo&&contractorInfo.delStatus===1&& (
							<div className="inner_top_title_btns">
								{
									this.state.myAuth.update&&(<Button onClick={this.editEvent} type="primary">编辑</Button>)
								}
								{
									this.state.myAuth.del&&(<Button onClick={this.removeEvent}>删除</Button>)
								}
								
							</div>
						)
					}
					
				</div>
				{
					contractorInfo!==null&&(
						<div className="contractor_box">
							<div className="contractor_item">
								<div className="item_title flex_box flex_between">
									<span className="mini_title">基本信息</span>
									<span>创建日期：{contractorInfo.createTime}</span>
								</div>
								<div className="self_table">
									<div className="self_table_cell flex_box">
										<div className="self_table_tr">编号:</div>
										<div className="self_table_td">{contractorInfo.number}</div>
									</div>
									<div className="self_table_cell flex_box">
										<div className="self_table_tr">名称:</div>
										<div className="self_table_td">{contractorInfo.name}</div>
									</div>
									<div className="self_table_cell flex_box">
										<div className="self_table_tr">上级分销商:</div>
										{
											contractorInfo.pname&&(
												<div className="self_table_td">{contractorInfo.pname}</div>
											)
										}
										{
											!contractorInfo.pname&&(
												<div className="self_table_td">无</div>
											)
										}
									</div> 
									<div className="self_table_cell flex_box">
										<div className="self_table_tr">地址:</div>
										<div className="self_table_td">{contractorInfo.address}</div>
									</div> 
									<div className="self_table_cell flex_box">
										<div className="self_table_tr">联系电话:</div>
										<div className="self_table_td">{contractorInfo.linkPhone}</div>
									</div> 
									<div className="self_table_cell flex_box">
										<div className="self_table_tr">保密手机:</div>
										<div className="self_table_td">{contractorInfo.secretPhone}</div>
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
										<div className="self_table_td">{contractorInfo.handlingFee}%</div>
									</div>
									<div className="self_table_cell flex_box">
										<div className="self_table_tr">广告费分润:</div>
										<div className="self_table_td">{contractorInfo.advertisingFee}%</div>
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
										<div className="self_table_td">{contractorInfo.filterstatus}</div>
									</div>
									<div className="self_table_cell flex_box">
										<div className="self_table_tr">管理员帐号:</div> 
										<div className="self_table_td">{contractorInfo.accountName}</div>
									</div>
									<div className="self_table_cell flex_box">
										<div className="self_table_tr">是否可以建立下级分销商:</div>
										<div className="self_table_td">{contractorInfo.filtercstatus}</div>
									</div>
									
									{
										contractorInfo.goodsInfoList.length>0 && contractorInfo.goodsInfoList.map((item, index)=> {
											return (
												<div key={item.id}>
													<div className="self_table_cell flex_box">
														<div className="self_table_tr">是否可以授权{item.goodsName}产品:</div>
														<div className="self_table_td">
															是
														</div>
													</div>
													{
														item.clist.length > 0 && item.clist.map((val, idx)=> {
															return (
																<div className="self_table_cell flex_box" key={val.id}>
																	<div className="self_table_tr">{val.goodsName}:</div>
																	<div className="self_table_td">
																		<span style={{marginRight: '15px'}}>{val.price} 元/年</span> 
																		<span>利润 {val.profit}元</span>
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
					)
				}
				
            </div>  
        )
    }
}

export default connect(state => ({
	contractorId: state.storeState.contractorId,
 }), {
	 updateStatus,
	 updateContractorForm
 })(DetailInfo)