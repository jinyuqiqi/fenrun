import React, { Component } from 'react';
import { Button, Row, Col, Table, Spin, Modal } from 'antd';
import { Base64 } from 'js-base64';
import BreadCrumb from '@/components/breadcrumb';
import GlobalModal from '@/components/globalModal';
import ModalReject from '@/components/modalReject';
import { getSaleInfo, onAuditForm } from "@/http/api";
import message from '@/utils/message';
import './index.css';

const columns = [
  {
	title: '名称',
	dataIndex: 'projectName',
  },
  {
	title: '数量/描述',
	dataIndex: 'count',
  },
  {
	title: '单价',
	dataIndex: 'price',
  },
  {
  	title: '金额',
  	dataIndex: 'projectAmount',
  },
];

export default class AuditContent extends Component{
	constructor(props){
        super(props);
		this.state = {
			myAuth: {},
			title: '驳回',
			dialog: 'turndown',
			loading: false,
			visible: false,
			productId: null,
			breadcrumbList: [
				{
					path: '/index/workbench',
					title: '工作台'
				},
				{
					path: '/index/workbench/audit',
					title: '审核列表'
				},
				{
					title: '审核'
				}
			],
			details: null,
		}
    }
	
	componentWillMount(){
		let workbenchAuths = JSON.parse(Base64.decode(sessionStorage.getItem('workbenchAuths')))
		this.setState({
			myAuth: workbenchAuths
		})
		
		if(this.props.location.state){
			this.takeSaleInfo(this.props.location.state.id)
			this.setState({
				productId: this.props.location.state.productId
			})
			sessionStorage.setItem('saleOrderId', String(this.props.location.state.id))
			sessionStorage.setItem('aCProductId', String(this.props.location.state.productId))
		}else{
			let id = sessionStorage.getItem('saleOrderId')
			let productId = sessionStorage.getItem('aCProductId')
			this.setState({
				productId: parseInt(productId)
			})
			this.takeSaleInfo(parseInt(id))
		}
	}
	
	componentWillUnmount(){
		sessionStorage.removeItem('saleOrderId')
		sessionStorage.removeItem('aCProductId')
	}
	
	enterLoading = () => {
		const that = this
		Modal.confirm({
			centered: true,
			width: 360,
			title: '提示!',
			content: '请确认是否执行授权操作?',
			onOk() {
				that.onAuditApi({
					status: 1,
					type: 1,
					sourceId: that.state.details.saleOrderId
				})
			},
			onCancel() {
			  
			},
		});
	}
	
	onAuditApi = (p, cb=null) => {
		const that = this
		onAuditForm(p).then(res=> {
			if(res.code===1){
				if(cb&&typeof cb === 'function') cb()
				message.success('成功！')
				that.props.history.replace({pathname: '/index/workbench/audit'})
			}
		})
	}
	
	takeSaleInfo = id => {
		this.setState({
			loading: true
		})
		let { details } = this.state
		getSaleInfo({saleOrderId: id}).then(res=> {
			if(res.code===1){
				details = res.data
				details["detailVoList"] = res.data.detailVoList.map(item=> {
					item["key"] = item.projectId
					item["projectName"] = item.projectName?item.projectName:''
					item["count"] = item.measUnit?item.count+"/"+item.measUnit:item.count
					item["projectAmount"] = item.projectAmount?item.projectAmount:0
					return item
				})
				
				details["tradAmount"] = details.tradAmount?details.tradAmount:0
				
				if(details.productType===2){
					let projectStatusText = '筹备'
					let projectStatus = details.productCompanyInfoForm.projectStatus
					if(projectStatus===2){
						projectStatusText = '立项'
					}
					if(projectStatus===3){
						projectStatusText = '在建'
					}
					if(projectStatus===4){
						projectStatusText = '完工'
					}
					if(projectStatus===5){
						projectStatusText = '停工'
					}
					details.productCompanyInfoForm["projectStatusText"] = projectStatusText
				}
				details["createTime"] = details.createTime.substr(0, 10)
				this.setState({
					details,
					loading: false
				})
			}
			return
			this.setState({
				loading: false
			})
		}).catch(err=> {
			this.setState({
				loading: false
			})
		})
	}
	
	hideModal = () => {
		this.setState({
			visible: false
		})
	}
	
	trunDownEvent = ()=> {
		this.setState({
			visible: true
		})
	}
	
	onCancel = () => {
		this.setState({
			visible: false
		})
	}
	
	onConfirm = remark => {
		const that = this
		this.onAuditApi({
			remark: remark,
			status: 2,
			type: 1,
			sourceId: that.state.details.saleOrderId
		}, () => {
			that.setState({
				visible: false
			})
		})
	}

    render(){
		const { details } = this.state
        return(
            <div className="container_wrap">
				<BreadCrumb breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				{
					this.state.loading&&(
						<div className="srcoll_box loading_box">
							<Spin spinning={true}></Spin>
						</div>
					)
				}
				{
					!this.state.loading&&details&&(
						<div className="srcoll_box">
							<div className="srcoll_box_inner">
								<div className="inner_top_title flex_box flex_between">
									<span className="default_title">审核内容</span>
									{
										this.state.myAuth.audit&&this.state.myAuth.audit.operate&&(
											<div className="inner_top_title_btns">
												<Button type="primary" onClick={this.enterLoading}>审核通过</Button>
												<Button type="danger" onClick={this.trunDownEvent}>驳回</Button>
											</div>
										)
									}
								</div>
								<div className="audit_inner">
									<div className="audit_inner_module">
										<div className="audit_inner_module_name">
											<span className="mini_title">基本信息</span>
										</div>
										<div className="audit_inner_module_content">
											{
												details.productId===1&&(
													<Row>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
														<div className="audit_info_item flex_box">
														    <span  className="base_span">车场名称: </span>
															<span>{details.productParkingInfoVo.parkingName}</span>
														</div>	
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
													  	<div className="audit_info_item flex_box">
													  		<span  className="base_span">车场编号: </span>
													  		<span>{details.productParkingInfoVo.parkingNo}</span>
													  	</div>	
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
													  	<div className="audit_info_item flex_box">
													  		<span  className="base_span">车场属性: </span>
													  		<span>{details.productParkingInfoVo.parkingAttribute}</span>
													  	</div>	
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
													  	<div className="audit_info_item flex_box">
													  		<span  className="base_span">车场位置: </span>
													  		<span>
																{details.productParkingInfoVo.cityName}
																{details.productParkingInfoVo.parkingLocation}
															</span>
													  	</div>
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
													  	<div className="audit_info_item flex_box">
													  		<span  className="base_span">经纬度: </span>
													  		<span>{details.productParkingInfoVo.longitudeAndLatitude}</span>
													  	</div>	
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
													  	<div className="audit_info_item flex_box">
													  		<span  className="base_span">客户名称: </span>
													  		<span>{details.productParkingInfoVo.customerName}</span>
													  	</div>	
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
													  	<div className="audit_info_item flex_box">
													  		<span  className="base_span">授权工程商: </span>
													  		<span>{details.contractorName}</span>
													  	</div>	
													  </Col>
													</Row>
												)
											}
											{
												details.productId===7&&(
													<Row>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
														<div className="audit_info_item flex_box">
														    <span  className="base_span">企业名称: </span>
															<span>{details.productCompanyInfoForm.companyName}</span>
														</div>	
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
														<div className="audit_info_item flex_box">
															<span  className="base_span">项目名称: </span>
															<span>{details.productCompanyInfoForm.projectName}</span>
														</div>	
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
													  	<div className="audit_info_item flex_box">
													  		<span  className="base_span">项目状态: </span>
													  		<span>{details.productCompanyInfoForm.projectStatusText}</span>
													  	</div>	
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
													  	<div className="audit_info_item flex_box">
													  		<span  className="base_span">项目负责人: </span>
													  		<span>
																{details.productCompanyInfoForm.projectMainName}
															</span>
													  	</div>
													  </Col>
													  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
													  	<div className="audit_info_item flex_box">
													  		<span  className="base_span">授权工程商: </span>
													  		<span>{details.contractorName}</span>
													  	</div>	
													  </Col>
													</Row>
												)
											}
										</div>
									</div>
									<div className="audit_inner_module">
										<div className="audit_inner_module_name flex_box flex_between">
											<span className="mini_title">配置信息</span>
											<span className="default_color">{details.createTime} 总计:{details.tradAmount}</span>
										</div>
										<div className="audit_inner_module_content" style={{marginTop: '12px',marginBottom: '8px'}}>
											<Table
											    columns={columns}
											    dataSource={details.detailVoList}
											    bordered
												pagination={false}
											  />
										</div>
									</div>
									<div className="audit_inner_module">
										<div className="audit_inner_module_name">
											<span className="mini_title">支付凭证</span>
										</div>
										<div className="audit_inner_module_content audit_module_pay">
											<Row>
											  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
												<div className="audit_info_item">
												    <span>应付金额: </span>
													<span>{details.tradAmount} 元</span>
												</div>	
											  </Col>
											  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
												<div className="audit_info_item">
													<span>收款账号: </span>
													<span>{details.tradAmount}</span>
												</div>	
											  </Col>
											  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
												<div className="audit_info_item">
													<span>支付流水: </span>
													<span>{details.tradNumber}</span>
												</div>	
											  </Col>
											  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
												<div className="audit_info_item flex_box">
													<span>支付凭证: </span>
													{
														details.tradAc&&(
															<span className="img_inline flex_box" style={{marginLeft: '5px'}}>
																<span>
																	<a href={details.tradAc} target="_blank">
																		<i className="iconfont icon-fangda"></i>
																	</a>
																	<img src={details.tradAc} alt=""/>
																</span>
															</span>
														)
													}
													{
														details.tradAc&&(
															<span></span>
														)
													}
												</div>	
											  </Col>
											</Row>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				}
				<ModalReject
					visible={this.state.visible}
					onCancel={this.onCancel}
					onConfirm={this.onConfirm}></ModalReject>
            </div>  
        )
    }
}


