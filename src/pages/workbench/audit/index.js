import React, { Component } from 'react';
import { Spin, Modal } from 'antd';
import { Base64 } from 'js-base64';
import BreadCrumb from '@/components/breadcrumb';
import ModalReject from '@/components/modalReject';
import ModalRemit from '@/components/modalRemit';
import ItemNavMenu from '@/components/itemNavMenu';
import TableComponent from '@/components/tableComponent';
import { getWithdrawList, getAuthList, getWithdrawListLog, getTableListCount, onAuditForm } from '@/http/api';
import message from '@/utils/message';
import './index.css'

export default class Audit extends Component{
	constructor(props){
        super(props);
		this.state = {
			title: '',
			dialog: '',
			myAuth: {},
			visible: false,
			visible1: false,
			loading: false,
			tableItem: null,
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
					num: 0,
					id: 1,
				},{
					title: '提现审核',
					num: 0,
					id: 3,
				},{
					title: '授权审核记录',
					num: 0,
					id: 2,
				},{
					title: '提现审核记录',
					num: 0,
					id: 4,
				}
			],
			currentnavmenu: 1,
			columns: [
			  {
				title: '交易单号',
				dataIndex: 'transactionNumber',
			  },
			  {
				title: '提现金额', 
				dataIndex: 'withdrawalAmount',
			  },
			  {
				title: '工程商名称名称',
				dataIndex: 'contractorsName',
			  },
			  {
				title: '客户联系方式',
				dataIndex: 'linkPhone',
			  },
			  {
				title: '银行卡号',
				dataIndex: 'cardNumber',
			  },
			  {
				title: '开户行',
				dataIndex: 'openBank',
			  },
			  {
				title: '转账类型',
				dataIndex: 'bankTypeText',
			  },
			  {
				  title: '操作',
				  key: 'action',
				  render: (text, record) => {
					return (
						<span className="span_btn_group">
							{
								this.state.myAuth.audit&&this.state.myAuth.audit.operate&&(
									<span>
										<span
											className="span_btn pointer return_color" 
											onClick={this.onReject.bind(this, record)}>驳回</span>
										<span 
											className="span_btn pointer" 
											onClick={this.remitEvent.bind(this, record)}>打款</span>
									</span>
								)
							}
						</span>
					)
				  }
			  },
			],
			columns_a: [
				{
					title: '交易单号',
					dataIndex: 'saleOrderSn',
				},
				{
					title: '产品', 
					dataIndex: 'productName',
				},
				{
					title: '客户名称',
					dataIndex: 'customerName',
				},
				{
					title: '客户联系方式',
					dataIndex: 'linkPhone',
				},
				{
					title: '授权工程商',
					dataIndex: 'contractorName',
				},
				{
					title: '提交时间',
					dataIndex: 'createTime',
				},
				{
					title: '类型',
					dataIndex: 'tradTypeText',
				},
				{
					title: '交易金额',
					dataIndex: 'tradAmount',
				},
				{
				  title: '操作',
				  key: 'action',
				  render: (text, record) => {
					 return (
						<span className="span_btn_group">
							<span 
								className="span_btn pointer" 
								onClick={this.routeAuditContent.bind(this, record.saleOrderId, record.productId)}>详情</span>
							{
								this.state.myAuth.audit&&this.state.myAuth.audit.operate&&(
									<span
										className="span_btn pointer" 
										onClick={this.auditPass.bind(this, record)}>审核通过</span>
								)
							}
						</span>
				    )
				  }
				},
			],
			columns_l: [
				{
					title: '交易单号',
					dataIndex: 'saleOrderSn',
				},
				{
					title: '产品', 
					dataIndex: 'productName',
				},
				{
					title: '客户名称',
					dataIndex: 'customerName',
				},
				{
					title: '客户联系方式',
					dataIndex: 'linkPhone',
				},
				{
					title: '授权工程商',
					dataIndex: 'contractorName',
				},
				{
					title: '提交时间',
					dataIndex: 'createTime',
				},
				{
					title: '类型',
					dataIndex: 'tradTypeText',
				},
				{
					title: '交易金额',
					dataIndex: 'tradAmount',
				},
				{
					title: '审核时间',
					dataIndex: 'reviewTime',
				},
				{
					title: '状态',
					dataIndex: 'auditState',
					render: (text, record) => {
					    return (
							<span className="span_btn_group">
								{
									record.auditState===1&& <span className="span_btn pointer default_color">审核中</span>
								}
								{
									record.auditState===2&& <span className="span_btn pointer pass_color">通过</span>
								}
								{
									record.auditState===3&& <span className="span_btn pointer return_color">驳回</span>
								}
								{
									record.auditState===4&& <span className="span_btn pointer default_color">过期</span>
								}
							</span>
						)
					}
				}
			],
			columns_w: [
				{
					title: '交易单号',
					dataIndex: 'transactionNumber',
				},
				{
					title: '提现金额', 
					dataIndex: 'withdrawalAmount',
				},
				{
					title: '工程商名称名称',
					dataIndex: 'contractorsName',
				},
				{
					title: '客户联系方式',
					dataIndex: 'linkPhone',
				},
				{
					title: '银行卡号',
					dataIndex: 'cardNumber',
				},
				{
					title: '开户行',
					dataIndex: 'openBank',
				},
				{
					title: '转账类型',
					dataIndex: 'bankTypeText',
				},
				{
					title: '审核时间',
					dataIndex: 'createTime',
				},
				{
					title: '打款金额',
					dataIndex: 'actualAmount',
				},
				{
					title: '打款流水号',
					dataIndex: 'serialNumber',
				},
				{
					title: '状态',
					dataIndex: 'statusText',
					render: (text, record) => {
					    return (
							<span className="span_btn_group">
								{
									record.status===1&& <span className="span_btn pointer default_color">审核中</span>
								}
								{
									record.status===2&& <span className="span_btn pointer pass_color">通过</span>
								}
								{
									record.status===3&& <span className="span_btn pointer return_color">驳回</span>
								}
								{
									record.status===4&& <span className="span_btn pointer default_color">过期</span>
								}
							</span>
						)
					}
				}
			],
			tableList: [],
			pagination: {
				size: 'small',
				showSizeChanger: true,
				showQuickJumper: true,
				total: 0,
				pageSize: 10, 
				current: 1,
				showTotal: total => `共 ${total} 条`,
				onChange: this.onPaginationChange,
				onShowSizeChange: this.onPaginationChange
			},
		}
    }
	
	componentWillMount(){
		let workbenchAuths = JSON.parse(Base64.decode(sessionStorage.getItem('workbenchAuths')))
		this.setState({
			myAuth: workbenchAuths
		})
	}
	
	componentDidMount(){
		this.takeTableCount()
		this.takeTableList(this.state.currentnavmenu)
	}
	
	onPaginationChange = (current, pageSize)=> {
		let pagination = this.state.pagination
		pagination.current = current
		pagination.pageSize = pageSize
		this.setState({
			pagination: pagination
		})
		this.takeTableList(this.state.currentnavmenu)
	}
	
	onCancel = () => {
		this.setState({
			visible: false
		})
	}
	
	onCancelRemit = () => {
		this.setState({
			visible1: false
		})
	}
	
	onConfirm = remark => {
		const that = this
		this.onAuditApi({
			remark: remark,
			status: 2,
			type: 3,
			sourceId: this.state.tableItem.id
		}, () => {
			that.setState({
				visible: false
			})
		})
	}
	
	onConfirmRemit = p => {
		const that = this
		let params = {
			...p,
			type: 3,
			status: 1,
			sourceId: this.state.tableItem.id,
			
		}
		console.log(params)
		this.onAuditApi(params, ()=> {
			that.setState({
				visible1: false
			})
		})
	}
	
	onReject = record => {
		this.setState({
			tableItem: record,
			visible: true
		})
	}
	
	routeAuditContent = (id, productId) => {
		this.props.history.push({pathname: '/index/workbench/auditcontent', state: {id: id, productId: productId}})
	}
	
	auditPass = record => {
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
					sourceId: record.saleOrderId
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
				that.takeTableCount()
				that.takeTableList(that.state.currentnavmenu)
			}
		})
	}
	
	takeTableCount = () => {
		let { itemnavmenu } = this.state
		getTableListCount().then(res=> {
			if(res.code===1){
				itemnavmenu[0].num = res.data.reviewListCount 
				itemnavmenu[1].num = res.data.withdrawCount
				itemnavmenu[2].num = res.data.reviewListLogCount
				itemnavmenu[3].num = res.data.withdrawLogCount
				this.setState({
					itemnavmenu
				})
			}
		})
	}
	
	switchNavMenu = (id) => {
		let { pagination, currentnavmenu } = this.state
		currentnavmenu = id
		pagination.current = 1
		pagination.pageSize = 10
		
		this.setState({
			pagination,
			currentnavmenu
		})
		this.takeTableList(id)
	}
	
	remitEvent = record => {
		this.setState({
			visible1: true,
			tableItem: record
		})
	}
	
	takeTableList = dataType => {
		let { pagination, tableList } = this.state
		this.setState({
			loading: true
		})
		if(parseInt(dataType)===3){
			getWithdrawList({
				pageNum: pagination.current,
				pageSize: pagination.pageSize
			}).then(res=> {
				if(res.code===1){
					tableList = res.data.list.map((item, index)=> {
						item['key'] = item.id
						item['bankTypeText'] = item.bankType===1?'企业对公':'企业对私'
						return item
					})
					pagination.total = res.data.total
					this.setState({
						tableList,
						pagination,
						loading: false,
					})
				}else{
					this.setState({
						loading: false,
					})
				}
			}).catch(err=> {
				this.setState({
					loading: false,
				})
			})
		}else if(parseInt(dataType)===4){
			getWithdrawListLog({
				pageNum: pagination.current,
				pageSize: pagination.pageSize
			}).then(res=> {
				if(res.code===1){
					tableList = res.data.list.map((item, index)=> {
						item['key'] = item.id
						item['bankTypeText'] = item.bankType===1?'企业对公':'企业对私'
						item["createTime"] = item.createTime.replace(/T/g, " ").replace(/\.000\+0000/g, "")
						
						return item
					})
					pagination.total = res.data.total
					this.setState({
						tableList,
						pagination,
						loading: false,
					})
				}else{
					this.setState({
						loading: false,
					})
				}
			}).catch(err=> {
				this.setState({
					loading: false,
				})
			})
		} else {
			getAuthList({
				authAudit: parseInt(dataType),
				pageNum: pagination.current,
				pageSize: pagination.pageSize
			}).then(res=> {
				if(res.code===1){
					tableList = res.data.list.map((item, index)=> {
						item['key'] = item.saleOrderId
						item['tradTypeText'] = item.tradType===1?'收入':'支出'
						if(item.createTime){
							item["createTime"] = item.createTime.replace(/T/g, " ").replace(/\.000\+0000/g, "")
						}
						if(item.reviewTime){
							item["reviewTime"] = item.reviewTime.replace(/T/g, " ").replace(/\.000\+0000/g, "")
						}
						return item
					})
					pagination.total = res.data.total
					this.setState({
						tableList,
						pagination,
						loading: false,
					})
				}else{
					this.setState({
						loading: false,
					})
				}
			}).catch(err=> {
				this.setState({
					loading: false,
				})
			})
		}
	}

    render(){
		const { currentnavmenu } = this.state
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
					!this.state.loading&&(
						<div className="srcoll_box">
							<div className="srcoll_box_inner">
								<ItemNavMenu 
									switchNavMenu={this.switchNavMenu}
									currentnavmenu={currentnavmenu}
									itemnavmenu={this.state.itemnavmenu}></ItemNavMenu>
								{
									parseInt(currentnavmenu)===3&&(
										<TableComponent
											columns={this.state.columns}
											data={this.state.tableList} 
											pagination={this.state.pagination}></TableComponent>
									)
								}
								{
									parseInt(currentnavmenu)===4&&(
										<TableComponent
											columns={this.state.columns_w}
											data={this.state.tableList} 
											pagination={this.state.pagination}></TableComponent>
									)
								}
								{
									parseInt(currentnavmenu)===1&&(
										<TableComponent
											columns={this.state.columns_a}
											data={this.state.tableList} 
											pagination={this.state.pagination}></TableComponent>
									)
								}
								{
									parseInt(currentnavmenu)===2&&(
										<TableComponent
											columns={this.state.columns_l}
											data={this.state.tableList} 
											pagination={this.state.pagination}></TableComponent>
									)
								}
							</div>
						</div>
					)
				}
				
				<ModalReject
					visible={this.state.visible}
					onCancel={this.onCancel}
					onConfirm={this.onConfirm}></ModalReject>
				<ModalRemit
					visible={this.state.visible1}
					onCancel={this.onCancelRemit}
					onConfirm={this.onConfirmRemit}
					remitInfo={this.state.tableItem}></ModalRemit>
            </div>  
        )
    }
}
