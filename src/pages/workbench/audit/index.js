import React, { Component } from 'react';
import BreadCrumb from '@/components/breadcrumb';
import GlobalModal from '@/components/globalModal';
import ItemNavMenu from '@/components/itemNavMenu';
import TableComponent from '@/components/tableComponent';
// import './index.css';

const data = [
  {
    key: '1',
    name: '桃田',
    age: 32,
    address: '纽约大姐34号',
  },
  {
    key: '2',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '5',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '7',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '8',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
  },
  {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '10',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '11',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
  },
  {
    key: '12',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '13',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '14',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
  },
  {
    key: '15',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '16',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '17',
    name: '林水镜',
    age: 42,
    address: '文一西路水上公园',
  },
  {
    key: '18',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '19',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

const pagination = {
	size: 'small',
	showSizeChanger: true,
	showQuickJumper: true,
	total: 200,
	defaultCurrent: 1,
	showTotal: total => `共 ${total} 条`,
	onShowSizeChange: onShowSizeChange
	
}

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

export default class Audit extends Component{
	constructor(props){
        super(props);
		this.state = {
			title: '',
			dialog: '',
			visible: false,
			breadcrumbList: [
				{
					path: '/index/workbench',
					title: '工作台'
				},
				{
					title: '审核列表'
				}
			],
			itemnavmenu: [
				{
					title: '授权审核',
					num: 44,
					id: '1',
				},{
					title: '提现审核',
					num: 25,
					id: '2',
				},{
					title: '审核记录',
					num: 15,
					id: '3',
				}
			],
			currentnavmenu: '1',
			columns: [
			  {
				title: '销售单号',
				dataIndex: 'name',
			  },
			  {
				title: '产品', 
				dataIndex: 'age',
			  },
			  {
				title: '客户名称',
				dataIndex: 'address',
			  },
			  {
				  title: '操作',
				  key: 'action',
				  render: (text, record) => {
					let node = null
					if(this.state.currentnavmenu==='1'){
						node = (
							<span className="span_btn_group">
								<span className="span_btn pointer" onClick={this.routeAuditContent}>详情</span>
								<span className="span_btn pointer">审核通过</span>
							</span>
						)
					}
					if(this.state.currentnavmenu==='2'){ 
						node = (
							<span className="span_btn_group">
								<span className="span_btn pointer return_color" onClick={this.trunDownEvent}>驳回</span>
								<span className="span_btn pointer" onClick={this.remitEvent}>打款</span>
							</span>
						)
					}
					if(this.state.currentnavmenu==='3'){
						node = (
							<span className="span_btn_group">
								<span className="span_btn return_color">驳回</span>
								<span className="span_btn pass_color">通过</span>
							</span>
						)
					}
					return node
				  },
				},
			]
		}
    }

	componentDidMount(){
		
	}
	
	hideModal = () => {
		this.setState({
			visible: false
		})
	}
	
	trunDownEvent = ()=> {
		this.setState({
			title: '驳回',
			dialog: 'turndown',
			visible: true
		})
	}
	
	routeAuditContent = ()=> {
		this.props.history.push({pathname: '/index/workbench/auditcontent'})
	}
	
	switchNavMenu = (id)=> {
		this.setState({
			currentnavmenu: id
		})
	}
	
	remitEvent = ()=> {
		this.setState({
			title: '提现转账录入',
			dialog: 'remit',
			visible: true
		})
	}

    render(){
        return(
            <div className="container_wrap">
				<BreadCrumb breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				<div className="srcoll_box">
					<div className="srcoll_box_inner">
						<ItemNavMenu 
							switchNavMenu={this.switchNavMenu}
							currentnavmenu={this.state.currentnavmenu}
							itemnavmenu={this.state.itemnavmenu}></ItemNavMenu>
						<TableComponent
							columns={this.state.columns}
							data={data} 
							pagination={pagination}></TableComponent>
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