import React, { Component } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import ModalAuthorInfo from '@/components/modalAuthorInfo';
import { Row, Col, Table, Steps } from 'antd';
import './index.css';

const { Step } = Steps

const columns = [
  {
	title: '名称',
	dataIndex: 'name',
  },
  {
	title: '数量/描述',
	dataIndex: 'amount',
  },
  {
	title: '单价',
	dataIndex: 'money',
  },
  {
  	title: '金额',
  	dataIndex: 'total',
  },
];

const data = [
  {
    key: '1',
	name: '老一包软件',
    amount: '1200',
    money: '￥300,000.00',
    total: '5000'
  }
];

export default class InAudit extends Component{
	constructor(props){
        super(props);
		this.state = {
			title: '授权信息',
			dialog: 'auditinfo',
			visible: false,
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
					title: '审核中',
				}
			],
		}
    }

	componentDidMount(){
		console.log('mount')
	}
	
	routeAuditSuccess = () => {
		this.setState({
			visible: true
		})
		// this.props.history.push({pathname: '/index/productlicensing/auditsuccess'})
	}
	
	hideModal = () => {
		this.setState({
			visible: false
		})
	}

    render(){
        return(
            <div className="container_wrap">
            	<BreadCrumb 
            		isRight={true}
            		breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
            	<div className="srcoll_box">
            		<div className="srcoll_box_inner">
            			<div className="audit_inner">
            				<div className="audit_inner_module">
            					<div className="audit_inner_module_name">
            						<span className="mini_title">基本信息</span>
            					</div>
            					<div className="audit_inner_module_content">
            						<Row>
            						  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
            							<div className="audit_info_item">
            							    <span>销售单号: </span>
            								<span>2019120913155600001</span>
            							</div>	
            						  </Col>
            						  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
            						  	<div className="audit_info_item">
            						  		<span>企业名称: </span>
            						  		<span>湖州交通医院服务管理有限公司</span>
            						  	</div>	
            						  </Col>
            						  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
            						  	<div className="audit_info_item">
            						  		<span>项目名称: </span>
            						  		<span>湖州交通医院服务管理有限</span>
            						  	</div>	
            						  </Col>
            						  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
            						  	<div className="audit_info_item">
            						  		<span>项目状态: </span>
            						  		<span>在建</span>
            						  	</div>
            						  </Col>
            						  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
            						  	<div className="audit_info_item">
            						  		<span>项目负责人: </span>
            						  		<span>Tonny</span>
            						  	</div>	
            						  </Col>
            						  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
            						  	<div className="audit_info_item">
            						  		<span>经纬度: </span>
            						  		<span>PN1ZD8728</span>
            						  	</div>	
            						  </Col>
            						  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
            						  	<div className="audit_info_item">
            						  		<span>客户名称: </span>
            						  		<span>胡三分</span>
            						  	</div>	
            						  </Col>
            						  <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
            						  	<div className="audit_info_item">
            						  		<span>授权工程商: </span>
            						  		<span>脉搏</span>
            						  	</div>	
            						  </Col>
            						</Row>
            					</div>
            				</div>
            				<div className="audit_inner_module">
            					<div className="audit_inner_module_name flex_box flex_between">
            						<span className="mini_title">基本信息</span>
            						<span className="default_color">2019-08-12 总计:25,550,30</span>
            					</div>
            					<div className="audit_inner_module_content" style={{marginTop: '12px',marginBottom: '8px'}}>
            						<Table
            						    columns={columns}
            						    dataSource={data}
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
            						<Steps size="small" progressDot current={1} direction="vertical">
									  <Step 
										status="finish"
										title="提交授权申请" 
										subTitle="2019-12-12 18:50:12" />
									  <Step 
										status="finish"
										title="正在审核" 
										subTitle="00:00:05" />
									  <Step
										onClick={this.routeAuditSuccess}
										status="finish"
										title="已通过审核" 
										subTitle="00:00:05"
										description="查看授权信息"/>
									</Steps>
            					</div>
            				</div>
            			</div>
            		</div>
            	</div>
				<ModalAuthorInfo
					visible={this.state.visible}
					hideModal={this.hideModal}></ModalAuthorInfo>
            </div>  
        )
    }
}