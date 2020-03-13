
import React, { Component } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import ModalAuthorInfo from '@/components/modalAuthorInfo';
import { getSaleInfo, getAuthPopInfo, getAuthPopInfoDown } from '@/http/api';
import { Row, Col, Table, Steps, Spin } from 'antd';
import './index.css';

const { Step } = Steps

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


export default class InAudit extends Component{
	constructor(props){
        super(props);
		this.state = {
			title: '授权信息',
			loading: false,
			visible: false,
			details: null,
			tableList: [],
			breadcrumbList: [
				{
					title: '产品授权',
					path: '/index/productlicensing/authorizations',
				},
				{
					title: '授权管理',
				}
			],
			authInfo: []
		}
		// console.log(props.location.state.id)
		
    }
	
	componentWillMount(){
		if(this.props.location.state){
			this.fetchBillInfo(this.props.location.state.id)
			sessionStorage.setItem('auditId', String(this.props.location.state.id))
		}else{
			let id = sessionStorage.getItem('auditId')
			this.fetchBillInfo(parseInt(id))
		}
	}

	componentWillUnmount(){
		sessionStorage.removeItem('auditId')
	}
	
	routeAuditSuccess = () => {
		this.setState({
			visible: true
		})
	}
	
	fetchBillInfo = (id) => {
		this.setState({
			loading: true
		})
		getSaleInfo({saleOrderId: id}).then(res=> {
			if(res.code===1){
				let details = res.data
				details['tableTime'] = details.createTime?details.createTime.substr(0, 10):'';
				details['createTime'] = details.createTime?details.createTime.replace(/T/g, " ").replace(/\.000\+0000/g, ""):'';
				details['expireDate'] = details.expireDate?details.expireDate.replace(/T/g, " ").replace(/\.000\+0000/g, ""):'';
				let params = {
					id: details.authProductId,
					type: details.productId===1?1:2
				}
				this.takeAuthInfo(params)
				let tableList = details.detailVoList.map(item=> {
					item['key'] = item.projectId;
					item['count'] = item.measUnit?item.count+'/'+item.measUnit:item.count+'/无';
					item['price'] = '￥'+item.price+'/年';
					item['projectAmount'] = item.projectAmount?'￥'+item.projectAmount:'￥0';
					return item
				})
				this.setState({
					details,
					tableList,
					loading: false
				})
			}
			this.setState({
				loading: false
			})
		}).catch(err=> {
			this.setState({
				loading: false
			})
		})
	}
	
	takeAuthInfo = p => {
		getAuthPopInfo(p).then(res=> {
			if(res.code===1){
				let authInfo = res.data.map(item=> {
					Object.assign(item, p)
					return item
				})
				this.setState({
					authInfo
				})
			}
		})
	}
	
	hideModal = () => {
		this.setState({
			visible: false
		})
	}

    render(){
		const { details } = this.state
        return(
            <div className="container_wrap">
            	<BreadCrumb 
            		isRight={true}
            		breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				{
					this.state.loading&&(
						<div className="srcoll_box loading_box">
							<Spin spinning={true}></Spin>
						</div>
					)
				}
				{
					!this.state.loading&&(
						<div className="srcoll_box">
							<div className="srcoll_box_inner">
								{
									details&&(
										<div className="audit_inner">
											{
												details.productParkingInfoVo&&(
													<div className="audit_inner_module">
														<div className="audit_inner_module_name">
															<span className="mini_title">基本信息</span>
														</div>
														<div className="audit_inner_module_content">
															<Row>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">销售单号: </span>
																	<span>{details.saleOrderSn}</span>
																</div>	
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">车场名称: </span>
																	<span>{details.productParkingInfoVo.parkingName}</span>
																</div>	
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">车场编号: </span>
																	<span>{details.productParkingInfoVo.parkingNo}</span>
																</div>	
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">车场属性: </span>
																	<span>{details.productParkingInfoVo.parkingAttribute}</span>
																</div>
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">车场位置: </span>
																	<span>{details.productParkingInfoVo.parkingLocation}</span>
																</div>	
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">经纬度: </span>
																	<span>{details.productParkingInfoVo.longitudeAndLatitude}</span>
																</div>	
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">客户名称: </span>
																	<span>{details.customerName}</span>
																</div>	
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">授权工程商: </span>
																	<span>{details.contractorName}</span>
																</div>	
															  </Col>
															</Row>
														</div>
													</div>
												)
											}
											{
												details.productCompanyInfoForm&&(
													<div className="audit_inner_module">
														<div className="audit_inner_module_name">
															<span className="mini_title">基本信息</span>
														</div>
														<div className="audit_inner_module_content">
															<Row>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">销售单号: </span>
																	<span>{details.saleOrderSn}</span>
																</div>	
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">企业名称: </span>
																	<span>{details.productCompanyInfoForm.projectName}</span>
																</div>	
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">项目名称: </span>
																	<span>{details.productCompanyInfoForm.projectMainName}</span>
																</div>	
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">项目状态: </span>
																	<span>
																		{details.productCompanyInfoForm.projectStatus===1&&'筹备中'}
																		{details.productCompanyInfoForm.projectStatus===2&&'立项中'}
																		{details.productCompanyInfoForm.projectStatus===3&&'在建'}
																		{details.productCompanyInfoForm.projectStatus===4&&'完工'}
																		{details.productCompanyInfoForm.projectStatus===5&&'停工'}
																	</span>
																</div>
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">项目负责人: </span>
																	<span>{details.productCompanyInfoForm.projectMainName}</span>
																</div>	
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">经纬度: </span>
																	<span>{details.productCompanyInfoForm.projectMainName}</span>
																</div>	
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">客户名称: </span>
																	<span>{details.customerName}</span>
																</div>	
															  </Col>
															  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
																<div className="audit_info_item flex_box">
																	<span className="base_span">授权工程商: </span>
																	<span>{details.contractorName}</span>
																</div>	
															  </Col>
															</Row>
														</div>
													</div>
												)
											}
											<div className="audit_inner_module">
												<div className="audit_inner_module_name flex_box flex_between">
													<span className="mini_title">配置信息</span>
													<span className="default_color">{details.tableTime} 总计: ¥{details.tradAmount?details.tradAmount:'0'}</span>
												</div>
												<div className="audit_inner_module_content" style={{marginTop: '12px',marginBottom: '8px'}}>
													<Table
													    columns={columns}
													    dataSource={this.state.tableList}
													    bordered
														pagination={false}
													  />
												</div>
											</div>
											<div className="audit_inner_module">
												<div className="audit_inner_module_name">
													<span className="mini_title">审核状态</span>
												</div>
												<div className="audit_inner_module_content audit_module_pay">
													{
														details.auditState===1&&(
															<Steps size="small" progressDot current={1} direction="vertical">
															  <Step 
																status="finish"
																title="提交授权申请" 
																subTitle={details.createTime} />
															  <Step 
																status="finish"
																title="正在审核" />
															</Steps>
														)
													}
													{
														details.auditState===2&&(
															<Steps size="small" progressDot current={1} direction="vertical">
															  <Step 
																status="finish"
																title="提交授权申请" 
																subTitle={details.createTime} />
															  <Step
																className="success_step"
																onClick={this.routeAuditSuccess}
																status="finish"
																title={
																	<span>
																		已通过审核
																		<span className="subtitle-phone">售后电话:1022-5485-45522</span>
																	</span>
																}
																subTitle={details.createTime}
																description={<span className="click_text">查看授权信息</span>}/>
															</Steps>
														)
													}
													{
														details.auditState===3&&(
															<Steps size="small" progressDot current={1} direction="vertical">
															  <Step 
																status="finish"
																title="提交授权申请" 
																subTitle={details.createTime} />
															  <Step
																status="finish"
																title="已驳回" 
																subTitle={details.expireDate}
																description={
																	<span className="desc_group">
																		<span>原因: 没有查询到相关的财务信息</span>
																		<span className="click_text">重新提交</span>
																		<span className="tip_text">还剩1天22小时34分过期</span>
																	</span>
																}/>
															</Steps>
														)
													}
													{
														details.auditState===4&&(
															<Steps size="small" progressDot current={1} direction="vertical">
															  <Step 
																status="finish"
																title="提交授权申请" 
																subTitle={details.createTime} />
															  <Step
																className="success_step"
																onClick={this.routeAuditSuccess}
																status="finish"
																title={
																	<span>
																		已通过审核
																		<span className="subtitle-phone">售后电话:1022-5485-45522</span>
																	</span>
																}
																subTitle={details.createTime}
																description={<span className="click_text">查看授权信息</span>}/>
															  <Step
																onClick={this.routeAuditSuccess}
																status="finish"
																title="续费" 
																description={<span className="click_text">查看授权信息</span>}/>
															</Steps>
														)
													}
												</div>
											</div>
										</div>
									)
								}
								
							</div>
						</div>
					)
				}
            	
				<ModalAuthorInfo
					visible={this.state.visible}
					authInfo={this.state.authInfo}
					hideModal={this.hideModal}></ModalAuthorInfo>
            </div>  
        )
    }
}

