import React, { Component } from 'react';
import { Modal, Button, Icon } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { getAuthPopInfoDown } from '@/http/api';
import axios from 'axios';
import './index.css';

export default class ModalAuthorInfo extends Component{
	constructor(props){
        super(props);
    }
	
	downLoad = () => {
		let id = this.props.authInfo[0].id
		let type = this.props.authInfo[0].type
	// 	axios.post("http://zhcl.4000750222.com/testdivided/saleOrderInfo/getReviewAccountsDown", {id: id,type: type}).then(response=> {
	// 			var content = response;
			 
	// 			var elink = document.createElement('a');
	// 			elink.download = `授权信息.xls`;
	// 			elink.style.display = 'none';
 
	// 			var blob = new Blob([content]);
	// 			elink.href = URL.createObjectURL(blob);
 
	// 			document.body.appendChild(elink);
	// 			elink.click();
 
	// 			document.body.removeChild(elink);
	// 	})
		// var xmlResquest = new XMLHttpRequest();
		// 	    xmlResquest.open("POST", "http://zhcl.4000750222.com/testdivided/saleOrderInfo/getReviewAccountsDown", true);
		// 	    xmlResquest.setRequestHeader("Content-type", "application/json");
		// 	//     xmlResquest.setRequestHeader("Authorization", "Bearer 6cda86e3-ba1c-4737-972c-f815304932ee");
		// 		xmlResquest.send({id: id,type: type});
		// 	    xmlResquest.responseType = "blob";
		// 	    xmlResquest.onload = function (oEvent) {
		// 		    var content = xmlResquest.response;
		// 		    var elink = document.createElement('a');
		// 		    elink.download = "test.xlsx";
		// 		    elink.style.display = 'none';
		// 		    var blob = new Blob([content]);
		// 		    elink.href = URL.createObjectURL(blob);
		// 		    document.body.appendChild(elink);
		// 	        elink.click();
		// 		    document.body.removeChild(elink);
				
					
		// 	    };
		//         xmlResquest.send();
		
		getAuthPopInfoDown({id: id,type: type}).then(res=> {
			    let url = window.URL.createObjectURL(new Blob([res]))
			    let link = document.createElement('a')
			    link.style.display = 'none'
			    link.href = url
			    link.setAttribute('download', 'excel1111.xlsx')
			    document.body.appendChild(link)
			    link.click()
		})
	}

    render(){
        return(
			<Modal
			  centered
			  title='授权信息'
			  visible={this.props.visible}
			  onOk={this.props.hideModal}
			  onCancel={this.props.hideModal}
			  footer={[
				  <Button key="confirm" type="primary" onClick={this.props.hideModal}>
					知道了
				  </Button>
			  ]}
			>
				<div className="audit_info">
					{
						this.props.authInfo&&this.props.authInfo.map((item, index)=> {
							return (
								<div key={index} className="info_item flex_box flex_between align_items_center">
									<div>
										<span className="mini_title">{item.name}</span>
									</div>
									<div>
										<div className="with_padding"><span>账号: {item.account}</span></div>
										<div className="with_padding"><span>密码: {item.password}</span></div>
									</div>
								</div>
							)
						})
					}
				   <div className="info_item flex_box flex_between align_items_center">
						<div>
							<span className="grey_color">请提示用户及时登录相关模块修改密码!</span>
						</div>
						<div>
							
							<a className="a_btn" href="#!" onClick={this.downLoad}>
								<Icon type="download" />下载授权详情
							</a>
						</div>
				   </div>
				</div> 
			</Modal>  
        )
    }
}