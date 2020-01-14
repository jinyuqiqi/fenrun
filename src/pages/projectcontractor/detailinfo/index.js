import React, { Component } from 'react';
import { Button } from 'antd';
import { getContractorInfo, delContractor } from '@/http/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus } from '@/store/reducer/action';
import './index.css'; 

class DetailInfo extends Component{
	constructor(props){
        super(props);
		
		this.state = {
			contractorInfo: null
		}
		
		if(props.contractorId){
			this.fetchContractorInfo(props.contractorId)
		}
    }
	
	static propTypes = {
		contractorId: PropTypes.number,
		updateStatus: PropTypes.func,
	}
	
	componentWillReceiveProps(nextProps){
		let pid = nextProps.contractorId
		let sid = this.state.contractorInfo?this.state.contractorInfo.id:null
		if(pid&&(String(pid)!==String(sid))){
			this.fetchContractorInfo(pid)
		}
	}

	componentDidMount(){
		const that = this
		
	}
	
	removeEvent = () => {
		delContractor({id: this.props.contractorId}).then(res=> {
			if(res.code===1){
				let willUpdate = true
				this.props.updateStatus(willUpdate)
			}
		})
	}

	editEvent = () => {
		this.props.history.replace({pathname: "/index/projectcontractor/forminfo"})
	}
	
	fetchContractorInfo = id => {
		getContractorInfo({id: id}).then(res=> {
			if(res.code===1){
				let contractorInfo = res.data
				contractorInfo['status'] = contractorInfo.status?'已开通':'未开通'
				contractorInfo['cstatus'] = contractorInfo.cstatus?'是':'否'
				contractorInfo['createTime'] = contractorInfo.createTime.substr(0, 10)
				this.setState({
					contractorInfo: res.data
				})
			}
		})
	}
	
    render(){
		const { contractorInfo } = this.state
        return(
            <div className="right_wraper">
				<div className="inner_top_title flex_box flex_between">
					<span className="default_title">二级商基本信息</span>
					{
						contractorInfo&&contractorInfo.delStatus===1&& (
							<div className="inner_top_title_btns">
								<Button onClick={this.editEvent} type="primary">编辑</Button>
								<Button onClick={this.removeEvent}>删除</Button>
							</div>
						)
					}
					
				</div>
				{
					contractorInfo&&(
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
										<div className="self_table_td">{contractorInfo.pname}</div>
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
										<div className="self_table_td">{contractorInfo.status}</div>
									</div>
									<div className="self_table_cell flex_box">
										<div className="self_table_tr">管理员帐号:</div> 
										<div className="self_table_td">{contractorInfo.accountName}</div>
									</div>
									<div className="self_table_cell flex_box">
										<div className="self_table_tr">是否可以建立下级分销商:</div>
										<div className="self_table_td">{contractorInfo.cstatus}</div>
									</div>
									
									{
										contractorInfo.goodsInfoList.length>0 && contractorInfo.goodsInfoList.map((item, index)=> {
											return (
												<div key={item.id}>
													<div className="self_table_cell flex_box">
														<div className="self_table_tr">是否可以授权{item.name}产品:</div>
														<div className="self_table_td">
															是
														</div>
													</div>
													{/*
														item.use===1&&item.list.length && item.list.map((val, idx)=> {
															return (
																<div className="self_table_cell flex_box" key={val.id}>
																	<div className="self_table_tr">{val.name}:</div>
																	<div className="self_table_td">
																		455元
																	</div>
																</div>
															)
														})
													*/}
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
	 updateStatus
 })(DetailInfo)