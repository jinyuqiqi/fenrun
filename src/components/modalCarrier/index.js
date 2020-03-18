import React, { Component } from 'react';
import { Modal, Button, Input, Cascader, Select, Radio } from 'antd';
import options from '@/utils/city';
import './index.css';

const { TextArea } = Input;
const { Option } = Select;

function onChange(value) {
   console.log(value);
 }

export default class ModalCarrier extends Component{
	constructor(props){
        super(props);
    }

    render(){
        return(
            <Modal
			  style={{ transform: 'translateY(-50%)', top: '50%'}}
			  title={this.props.affairId?'添加客户':'添加车场'}
			  visible={this.props.visible}
			  onOk={this.props.hideModal}
			  onCancel={this.props.hideModal}
			  footer={[
				  <Button key="cancel" onClick={this.props.hideModal}>
					取消
				  </Button>,
				  <Button key="confirm" type="primary" onClick={this.props.hideModal}>
					确定
				  </Button>,
			  ]}
			>
				{
					this.props.affairId===0&&(
						<div className="modal_content">
						   <div className="item_box">
								<div>
									<div className="item_txt"><span>*车场名称:</span></div>
									<div>
										<span>
											<Input />
										</span>
									</div>
								</div>
						   </div>
						   <div className="item_box">
								<div>
									<div className="item_txt"><span>*公司地址:</span></div>
									<div>
										<span>
											<Cascader
												options={options} onChange={onChange} placeholder="请选择" />
										</span>
									</div>
									<div style={{marginTop: '20px'}}>
										<span>
											<TextArea rows={4}/>
										</span>
									</div>
								</div>
						   </div>
						   <div className="item_box flex_box flex_between half_item_box">
								<div>
									<div className="item_txt"><span>*车场属性:</span></div>
									<div>
										<span>
											<Select
												onChange={onChange}>
													<Option value="jack">Jack</Option>
													<Option value="lucy">Lucy</Option>
													<Option value="tom">Tom</Option>
											</Select>
										</span>
									</div>
								</div>
								<div>
									<div className="item_txt"><span>*经纬度:</span></div>
									<div>
										<span>
											<Input />
										</span>
									</div>
								</div>
						   </div>
						   <div className="item_box">
								<div>
									<div className="item_txt"><span>单选</span></div>
									<div>
										<span>
											<Radio.Group name="radiogroup" defaultValue={1}>
											      <Radio value={1}>不含岗亭(纯云端)</Radio>
											      <Radio value={2}>含岗亭</Radio>
											</Radio.Group>
										</span>
									</div>
								</div>
						   </div>
						</div>
					)
				}
				{
					this.props.affairId===1&&(
						  <div className="modal_content">
							   <div className="item_box flex_box flex_between half_item_box">
									<div>
										<div className="item_txt"><span>*管理员名称:</span></div>
										<div>
											<span>
												<Input />
											</span>
										</div>
									</div>
									<div>
										<div className="item_txt"><span>*管理员名称:</span></div>
										<div>
											<span>
												<Input />
											</span>
										</div>
									</div>
							   </div>
							   <div className="item_box flex_box flex_between half_item_box">
									<div>
										<div className="item_txt"><span>*管理员名称:</span></div>
										<div>
											<span>
												<Input />
											</span>
										</div>
									</div>
									<div>
										<div className="item_txt"><span>*管理员名称:</span></div>
										<div>
											<span>
												<Input />
											</span>
										</div>
									</div>
							   </div>
							   <div className="item_box">
									<div>
										<div className="item_txt"><span>*公司地址:</span></div>
										<div>
											<span>
												<Cascader
													options={options} onChange={onChange} placeholder="请选择" />
											</span>
										</div>
										<div style={{marginTop: '20px'}}>
											<span>
												<TextArea rows={4}/>
											</span>
										</div>
									</div>
							   </div>
							   <div className="item_box">
									<div className="text_wrap">
										<p>账号及密码：添加运营商成功后，该运营商的登录账号为管理员联系电话号码</p>
										<p>初始密码：123456</p>
										<p>请提示管理员及时修改密码</p>
									</div>
							   </div>
						  </div>
					)
				}
			</Modal>  
        )
    }
}