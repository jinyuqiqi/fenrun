 import React, { Component } from 'react';
 import { Radio, Upload, Icon, Input, Button, Select, Cascader } from 'antd';
 import BreadCrumb from '@/components/breadcrumb';
 import options from '@/utils/city';
 import './index.css';
 
 // const { Option } = Select;
 
 function onChange(value) {
   console.log(value);
 }
 
 function getBase64(file) {
   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = error => reject(error);
   });
 }
 
 export default class BankCard extends Component{
 	constructor(props){
        super(props);
 		this.state = {
			fileList: [
			  {
				uid: '-1',
				name: 'image.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			  },
			  {
				uid: '-2',
				name: 'image.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			  }
			],
 			breadcrumbList: [
 				{
 					path: '/index/workbench',
 					title: '工作台'
 				},
 				{
 					title: '银行卡'
 				}
 			],
 		}
     }
 
 	componentDidMount(){
	
 	}
	
	handlePreview = (e) => {
		console.log(e)
	}
	
	handleChange = ({ fileList }) => this.setState({ fileList })
 
     render(){
         return(
             <div className="container_wrap">
 				<BreadCrumb breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
 				<div className="srcoll_box">
 					<div className="srcoll_box_inner">
 						<div className="inner_top_title flex_box flex_between">
 							<span className="default_title">添加银行卡</span>
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
										<Radio.Group name="radiogroup" defaultValue={1}>
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
											  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
											  listType="picture-card"
											  fileList={this.state.fileList}
											  onPreview={this.handlePreview}
											  onChange={this.handleChange}
											>
											  {this.state.fileList.length >= 4 ? null : (
													<div>
														<Icon type="plus" />
														<div className="ant-upload-text">上传照片</div>
													 </div>
											  )}
											</Upload>
											<div className="upload_notice">格式要求: 原件照片,扫描件或加公章的复印件, 支持jpg,bmp,gif,png.</div>
										</div>
									</span>
								</div>
								<div className="bank_card_form_item flex_box flex_center align_items_center">
									<span>*企业名称:</span>
									<span>
										<div style={{width: '300px'}}>
											<Input placeholder="请输入" />
										</div>
									</span>
								</div>
								<div className="bank_card_form_item flex_box flex_center align_items_center" style={{paddingBottom: '22px'}}>
									<span>*企业执照编号:</span>
									<span>
										<div className="input_outter_box" style={{width: '300px'}}>
											<Input placeholder="请输入" />
											<div className="input_notice">三证合一企业填统一信用代码</div>
										</div>
									</span>
								</div>
							</div>
							<div className="bank_card_form">
								<div className="bank_card_form_item flex_box flex_center align_items_center">
									<span className="mini_title">银行对私账户信息</span>
									<span></span>
								</div>
								<div className="bank_card_form_item flex_box flex_center">
									<span>*营业执照:</span>
									<span>
										<div className="upload_outter_box">
											<Upload
											  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
											  listType="picture-card"
											  fileList={this.state.fileList}
											  onPreview={this.handlePreview}
											  onChange={this.handleChange}
											>
											  {this.state.fileList.length >= 4 ? null : (
													<div>
														<Icon type="plus" />
														<div className="ant-upload-text">上传照片</div>
													 </div>
											  )}
											</Upload>
											<div className="upload_notice">格式要求: 原件照片,扫描件或加公章的复印件, 支持jpg,bmp,gif,png.</div>
										</div>
									</span>
								</div>
								<div className="bank_card_form_item flex_box flex_center align_items_center">
									<span>*卡号:</span>
									<span>
										<div style={{width: '300px'}}>
											<Input placeholder="请输入" />
										</div>
									</span>
								</div>
								<div className="bank_card_form_item flex_box flex_center align_items_center">
									<span>*开户城市:</span>
									<span>
										<div style={{width: '300px'}} id="citySelect">
											<Cascader 
												options={options} onChange={onChange} placeholder="请选择" />
											{/*<Input placeholder="请输入" />
											
											<Select
											    showSearch
											    placeholder="Select a person"
											    optionFilterProp="children"
											    onChange={onChange}
											    onFocus={onFocus}
											    onBlur={onBlur}
											    onSearch={onSearch}
												name="province"
											    filterOption={(input, option) =>
											      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
											    }
											  >
											    <Option value="jack">Jack</Option>
											    <Option value="lucy">Lucy</Option>
											    <Option value="tom">Tom</Option>
											  </Select>
											  <select class="ui-select" name="province"></select>
											  <select class="ui-select" name="city"></select>
											  <select class="ui-select" name="area"></select>*/}
										</div>
									</span>
								</div>
								<div className="bank_card_form_item flex_box flex_center align_items_center">
									<span>*开户银行:</span>
									<span>
										<div style={{width: '300px'}}>
											<Input placeholder="请输入" />
										</div>
									</span>
								</div>
							</div>
							<div className="bank_card_form">
								<div className="bank_card_form_item flex_box flex_center align_items_center">
									<span></span>
									<span className="submit_btns">
										<Button type="primary">提交</Button>
										<Button>返回</Button>
									</span>
								</div>
							</div>
						</div>
 					</div>
 				</div>
             </div>  
         )
     }
 }