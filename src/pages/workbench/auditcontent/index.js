import React, { Component } from 'react';
import { Button, Row, Col, Table } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import GlobalModal from '@/components/globalModal';
import './index.css';

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
export default class AuditContent extends Component{
	constructor(props){
        super(props);
		this.state = {
			title: '驳回',
			dialog: 'turndown',
			visible: false,
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
			]
		}
    }
	
	enterLoading = ()=> {
		
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

    render(){
        return(
            <div className="container_wrap">
				<BreadCrumb breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				<div className="srcoll_box">
					<div className="srcoll_box_inner">
						<div className="inner_top_title flex_box flex_between">
							<span className="default_title">审核内容</span>
							<div className="inner_top_title_btns">
								<Button type="primary" onClick={this.enterLoading}>审核通过</Button>
								<Button type="danger" onClick={this.trunDownEvent}>驳回</Button>
							</div>
						</div>
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
									<Row>
									  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
										<div className="audit_info_item">
										    <span>销售单号: </span>
											<span>2019120913155600001</span>
										</div>	
									  </Col>
									  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
										<div className="audit_info_item">
											<span>销售单号: </span>
											<span>2019120913155600001</span>
										</div>	
									  </Col>
									  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
										<div className="audit_info_item">
											<span>销售单号: </span>
											<span>2019120913155600001</span>
										</div>	
									  </Col>
									  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
										<div className="audit_info_item flex_box">
											<span>销售单号: </span>
											<span className="img_inline flex_box" style={{marginLeft: '5px'}}>
												<span>
													<a href="https://img.alicdn.com/tps/i4/TB1UaeHieT2gK0jSZFvSutnFXXa.jpg_240x240q90.jpg" target="_blank">
														<i className="iconfont icon-fangda"></i>
													</a>
													<img src="https://img.alicdn.com/tps/i4/TB1UaeHieT2gK0jSZFvSutnFXXa.jpg_240x240q90.jpg" />
												</span>
												<span>
													<a href="https://img.alicdn.com/tps/i4/TB1UaeHieT2gK0jSZFvSutnFXXa.jpg_240x240q90.jpg" target="_blank">
														<i className="iconfont icon-fangda"></i>
													</a>
													<img src="https://img.alicdn.com/tps/i4/TB1UaeHieT2gK0jSZFvSutnFXXa.jpg_240x240q90.jpg" />
												</span>
												<span>
													<a href="https://img.alicdn.com/tps/i4/TB1UaeHieT2gK0jSZFvSutnFXXa.jpg_240x240q90.jpg" target="_blank">
														<i className="iconfont icon-fangda"></i>
													</a>
													<img src="https://img.alicdn.com/tps/i4/TB1UaeHieT2gK0jSZFvSutnFXXa.jpg_240x240q90.jpg" />
												</span>
												<span>
													<a href="https://img.alicdn.com/tps/i4/TB1UaeHieT2gK0jSZFvSutnFXXa.jpg_240x240q90.jpg" target="_blank">
														<i className="iconfont icon-fangda"></i>
													</a>
													<img src="https://img.alicdn.com/tps/i4/TB1UaeHieT2gK0jSZFvSutnFXXa.jpg_240x240q90.jpg" />
												</span>
												<span>
													<a href="https://img.alicdn.com/tps/i4/TB1UaeHieT2gK0jSZFvSutnFXXa.jpg_240x240q90.jpg" target="_blank">
														<i className="iconfont icon-fangda"></i>
													</a>
													<img src="https://img.alicdn.com/tps/i4/TB1UaeHieT2gK0jSZFvSutnFXXa.jpg_240x240q90.jpg" />
												</span>
											</span>
										</div>	
									  </Col>
									</Row>
								</div>
							</div>
						</div>
					</div>
				</div>
				<GlobalModal
					dialog={this.state.dialog}
					title={this.state.title}
					visible={this.state.visible}
					hideModal={this.hideModal}></GlobalModal>
            </div>  
        )
    }
}