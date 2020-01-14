// const path = require("path")
import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { getHomeCount, getHomeData } from '@/http/api';
import './index.css';

export default class WorkBench extends Component{
	constructor(props){
        super(props);
		getHomeCount().then(res=> {
			console.log(res)
		})
		getHomeData().then(res=> {
			console.log(res)
		})
    }
 
	componentDidMount(){
	}
	
	routeTurns = (pathname) => {
		this.props.history.replace({pathname: `/index/workbench/${pathname}`})
	}

    render(){
        return(
            <div className="container_page">
				<Row>
				    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
				      <div className="row_module">
						  <div className="row_inner">
							 <div className="flex_box flex_between">
								<div className="customer">
									<div>杭州心爱电子科技公司</div>
									<div className="medium_title">你好, 王三春</div>
								</div>
								<div className="billling pointer" onClick={this.routeTurns.bind(this, 'audit')}>
									<div><span>待审核</span></div>
									<div className="num_large">437, 43</div>
								</div>
							 </div>
							 <div className="account_wrap">
								<div className="my_account">
									<div className="default_title">我的账户</div>
									<div className="num_giant">¥999,55</div>
								</div>
								<div className="account_log">
									<div><i className="iconfont icon-anquan"></i> 账户安全</div>
									<div className="flex_box align_items_center">
										<span className="pointer" onClick={this.routeTurns.bind(this, 'withdraw')}>提现</span>
										<span className="line"></span>
										<span className="pointer" onClick={this.routeTurns.bind(this, 'record')}>操作记录</span>
									</div>
								</div>
							 </div>
						  </div>
					  </div>
				    </Col>
				    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
				      <div className="row_module">
						  <div className="row_inner row_inner_column flex_box flex_direction_column flex_between">
							  <div className="product_box">
								 <h4 className="default_title">我的产品</h4>
								 <div className="flex_box flex_between">
									<div className="product_wrap flex_box flex_direction_column align_items_center flex_center pointer">
										<div className="default_title">麦泊停车智慧管理平台</div>
									</div>
									<div className="product_wrap flex_box flex_direction_column align_items_center flex_center pointer">
										<div className="default_title">劳易保工人管理平台</div>
									</div>
								 </div>
							  </div>
							  <div className="product_num">
								 <div className="pro_detail flex_box flex_direction_column flex_center pointer">
									<div className="default_title">已售产品数量</div>
									<div className="num_giant">4455</div>
								 </div>
							  </div>
						  </div>
					  </div>
				    </Col>
				    <Col xs={8} sm={8} md={8} lg={8} xl={8}>
				      <div className="row_module">
						  <div className="row_inner row_inner_column flex_box flex_direction_column flex_between">
							  <div className="bank_card_box">
								 <div className="bank_title flex_box flex_between">
									<span className="default_title">银行卡</span>
									<span className="default_color pointer">修改信息</span>
								 </div>
								 <div>
									{/*<div className="bank_card_wrap flex_box flex_direction_column flex_center pointer">
										<div className="large_title">交通银行</div>
										<div className="default_title">4455 4485 9987 3655 158</div>
									</div>
								 */}
									<div onClick={this.routeTurns.bind(this, 'bankcard')} className="empty_card flex_box flex_direction_column flex_center pointer">
										<Icon type="plus" />
										<div className="mini_title">添加银行卡</div>
									</div>
								</div>
							  </div>
							  <div className="bank_card_num">
								 <div className="bank_detail flex_box flex_direction_column flex_center pointer">
									<div className="default_title">工程商数量</div>
									<div className="num_giant">4455</div>
								 </div>
							  </div>
						  </div>
					  </div>
				    </Col>
				  </Row>
            </div>  
        )
    }
}