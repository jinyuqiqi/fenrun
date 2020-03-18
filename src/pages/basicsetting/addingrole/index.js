import React, { Component } from 'react';
import { Button, Input, Checkbox } from 'antd';
import BreadCrumb from '@/components/breadcrumb';
import { selectAuthorization, getOneRole, addRole, updateRole } from '@/http/api';
import { testSpace } from '@/utils/tool';
import message from '@/utils/message';
import './index.css';

const CheckboxGroup = Checkbox.Group;
const empty_text = '请输入角色名称';
const space_text = '角色名称不能包含空格';

export default class AddingRole extends Component{
	constructor(props){
        super(props);
		const roleId = props.location.state ? props.location.state.id : null
		this.state = {
			roleId,
			checkAll: false,
			breadcrumbList: [
				{
					title: '基础设置',
					path: '/index/basicsetting/roles'
				},
				{
					title: '角色管理'
				}
			],
			roleName: '',
			authorizationMenus: [],
			error_role_text: '',
			error_role: false,
			error_authorization: false,
			disabled: false
		}
		this.selectAllMenus(roleId)
    }

	componentDidMount(){
	}
	
	selectAllMenus(id=null){
		selectAuthorization().then(res=> {
			if(res.code===1){
				let arr = res.data
				let arr2 = this.handleHermission(arr)
				this.setState({
					authorizationMenus: arr2
				})
				if(id)this.selectRoleMenus(id)
			}
		})
	}
	
	selectRoleMenus = id => {
		getOneRole({roleId: id}).then(res=> {
			if(res.code===1){
				let authorizationMenus = this.state.authorizationMenus.map(item=> {
					if(res.data.menuIdList.includes(item.menuId))item.checked = true
					let parent = item.children.map(child=> {
						if(res.data.menuIdList.includes(child.menuId)){
							child.checked = true
							let son = child.children.map(grand=> {
								if(res.data.menuIdList.includes(grand.menuId)){
									return grand.menuId
								}else{
									return null
								}
							}).filter(dd=> dd!==null)
							child.selectList = son
						}
						return child
					})
					return item
				}) 
				this.setState({
					authorizationMenus,
					roleName: res.data.roleName,
				})
			}
		})
	}
	 
	handleHermission(menus){ 
		const that = this
		if(Object.prototype.toString.call(menus)==='[object Array]'&&menus.length){
			menus.forEach((item, index)=> {
				that.handleHermission(item)
			})
		}
		if(Object.prototype.toString.call(menus)==='[object Object]'){
			for(let key in menus){
				that.handleHermission(menus[key])
			}
			menus['checked'] = false
			menus['selectList'] = []
			menus['value'] = menus.menuId
			menus['label'] = menus.menuName
		}
		return menus
	}
	
	onChange = (index, child, checkedList) => {
		let authorizationMenus = this.state.authorizationMenus
		let childLength = authorizationMenus[index].children[child].children.length
		let selectLength = checkedList.length
		let checked = selectLength > 0 ? true : false
		
		this.clearErrorTip(checked)
		
		authorizationMenus[index].children[child].checked = checked
		authorizationMenus[index].children[child].selectList= checkedList
		
		let checkAll = authorizationMenus[index].children.some((item, idx)=> {
			return item.selectList.length > 0
		})
		authorizationMenus[index].checked = checkAll
	    this.setState({
			authorizationMenus: authorizationMenus
		})
	}
	
	onChangeParent = (index, e) => {
		let authorizationMenus = this.state.authorizationMenus 
		authorizationMenus[index].checked = e.target.checked
		
		this.clearErrorTip(e.target.checked)
		
		if(!e.target.checked){
			authorizationMenus[index].children.forEach(val=> {
				val.checked = false
				val.selectList = [] 
			})
		}
		this.setState({
			authorizationMenus: authorizationMenus
		})
	} 
	
	onChangeChild = (index, child, e) => {
		let authorizationMenus = this.state.authorizationMenus 
		authorizationMenus[index].children[child].checked = e.target.checked
		
		this.clearErrorTip(e.target.checked)
		
		if(!e.target.checked){
			authorizationMenus[index].children[child].selectList = []
		}
		
		let checkAll = authorizationMenus[index].children.some((item, idx)=> {
			return item.checked
		})
		
		if(checkAll)authorizationMenus[index].checked = checkAll
		
		this.setState({
			authorizationMenus: authorizationMenus
		})
	}
	
	clearErrorTip = err => {
		if(err&&this.state.error_authorization){
			this.setState({
				error_authorization: false
			})
		}
	}
	
	authoityCalculate = (listMenus) => {
		let menus = []
		
		listMenus.forEach(item=> {
			if(item.checked)menus.push(item.menuId)
			
			if(item.children.length){
				item.children.forEach(child=> {
					if(child.checked){
						menus.push(child.menuId)
						if(child.selectList.length)menus = menus.concat(child.selectList)
					}
				})
			}
		})
		
		return menus
	}
	
	getRoleName = e => {
		e.persist();
		this.setState({
			error_role: false,
			roleName: e.target.value
		})
	}
	
	submit = ()=> {
		let menus = this.authoityCalculate(this.state.authorizationMenus)
		let verify = this.verifyParams(menus)
		if(verify){
			this.setState({
				disabled: true
			})
			let params = {
				roleName: this.state.roleName,
				menuIdList: menus
			}
			if(this.state.roleId){
				params['roleId'] = this.state.roleId
				
				updateRole(params)
				.then(this.handleCallback)
				.catch(err=> {
					this.setState({
						disabled: false
					})
				})
				return
			}
			addRole(params)
			.then(this.handleCallback)
			.catch(err=> {
				this.setState({
					disabled: false
				})
			})
		}
	}
	
	handleCallback = res => {
		const that = this
		if(res.code===1){
			message.success('成功')
			setTimeout(()=> {
				that.setState({
					authorizationMenus: []
				})
				that.props.history.replace({pathname: '/index/basicsetting/roles'})
			}, 1000)
		}else{
			that.setState({
				disabled: false
			})
		}
	}
	
	cancelAction = () => {
		this.props.history.replace({pathname: '/index/basicsetting/roles'})
	}
	
	verifyParams = menus => {
		if(this.state.roleName===""){
			this.setState({
				error_role: true,
				error_role_text: empty_text
			})
			return false
		}
		if(testSpace(this.state.roleName)){
			this.setState({
				error_role: true,
				error_role_text: space_text
			})
			return false
		}
		if(menus.length===0){
			this.setState({
				error_authorization: true
			})
			return false
		}
		return true
	}
	
    render(){
		const createNode = (list)=> {
			const that = this
			return list.map((item, index)=> {
				return (
					<div className="role_item" key={item.menuId}>
						<div className="role_module_title">
							<Checkbox
								onChange={(e)=> that.onChangeParent(index, e)}
								checked={item.checked}
							>
								{item.menuName}
							</Checkbox>
							{
								index===0&&this.state.error_authorization&& (
									<span className="error_text dangerous_color">请为角色选择权限</span>
								)
							}
							
						</div>
						<div className="self_table" >
						{
							item.children.length && item.children.map((value, child)=> {
								return (
									
										<div className="self_table_cell flex_box" key={value.menuId}>
											<div className="self_table_tr">
												<Checkbox
													onChange={(e)=> that.onChangeChild(index, child, e)}
													checked={value.checked}
												>
													{value.menuName}
												</Checkbox>
											</div>
											<div className="self_table_td">
												{
													value.children.length > 0 && (
														<CheckboxGroup
														  options={value.children}
														  value={value.selectList}
														  onChange={(e) => that.onChange(index, child, e)}
														/>
													)
												}
												
											</div>
										</div>
								)
							})
						}
						</div>
					</div>
				)
			})
		}
        return(
            <div className="container_wrap">
            	<BreadCrumb 
            		isRight={true}
            		breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
            	<div className="srcoll_box">
            		<div className="srcoll_box_inner">
						<div className="inner_top_title flex_box flex_between">
							{
								this.state.roleId&&(
									<span className="default_title">编辑角色</span>
								)
							}
							{
								!this.state.roleId&&(
									<span className="default_title">添加角色</span>
								)
							}
							
							<div className="inner_top_title_btns">
								<Button disabled={this.state.disabled} onClick={this.submit} type="primary">确认</Button>
								<Button onClick={this.cancelAction}>取消</Button>
							</div>
							
						</div>
						<div className="inner_top_input flex_box align_items_center">
							<span className="top_btn">*角色名称: </span>
							<div className="input_outer">
								<Input 
									value={this.state.roleName} 
									onChange={this.getRoleName}
									placeholder="请输入" />
							</div>
							{
								this.state.error_role && (
									<span className="error_text dangerous_color">{this.state.error_role_text}</span>
								)
							}
						</div>
						<div className="role_box">
							{ createNode(this.state.authorizationMenus) }
						</div>
            		</div>
            	</div>
            </div>
        )
    }
}