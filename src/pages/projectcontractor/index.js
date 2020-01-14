import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Tree, Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStatus, updateContractorId, updateContractorList, updateContractorForm } from '@/store/reducer/action';
import BreadCrumb from '@/components/breadcrumb';
import Loadable from '@/components/loadable';
import { getContractorTree } from '@/http/api';
// import emitter  from '@/event';
import './index.css';

const FormInfo = Loadable(()=> import('@/pages/projectcontractor/forminfo'));
const DetailInfo = Loadable(()=> import('@/pages/projectcontractor/detailinfo'));

const { TreeNode } = Tree;
const { Search } = Input;
const dataList = [];

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }else{}
  }
  return parentKey;
};

class ProjectContractor extends Component{
	constructor(props){
        super(props);
		const that = this
		this.state = {
			height: '0px',
			breadcrumbList: [
				{
					title: '工程商管理'
				}
			],
			// dataList: [],
			expandedKeys: [],
			searchValue: '',
			autoExpandParent: true,
			treeData: [],
			selectKeys: [],
			selectid: 1
		}
		
		// window.onbeforeunload = function(event){
		// 	window.sessionStorage.setItem('contractorList', JSON.stringify(that.props.contractorList))
		// }
		
		// let contractorList = window.sessionStorage.getItem('contractorList')
		// if(contractorList){
		// 	this.props.updateContractorList(JSON.parse(contractorList))
		// }
		this.fetchContractorList(()=> {
			this.updateTreeData()
			const contractorId = this.state.treeData.length?this.state.treeData[0].id:0
			this.props.updateContractorId(contractorId)
		})
    }
	
	static propTypes = {
		willUpdate: PropTypes.bool,
		contractorList: PropTypes.array,
		updateContractorId: PropTypes.func,
	    updateContractorList: PropTypes.func,
		updateContractorForm: PropTypes.func,
	}
	
	componentWillMount(){
	}
	
	componentWillReceiveProps(nextProps){
		if(nextProps.willUpdate){
			this.fetchContractorList(()=> {
				this.updateTreeData()
				const contractorId = this.state.treeData.length?this.state.treeData[0].id:0
				this.props.updateContractorId(contractorId)
			})
		}
	} 
	
	componentDidMount(){
		let height = document.getElementsByClassName('srcoll_box')[0].offsetHeight
		this.setState({
			height: height+'px'
		})
		
	}
	
	updateTreeData = () => {
		let treeData = this.recursionContractors(this.props.contractorList)
		let selectKeys = treeData.length?[treeData[0].key]:[]
		this.setState({
			treeData,
			selectKeys,
		})
		this.generateList(treeData)
	}
	
	generateList = data => {
	  for (let i = 0; i < data.length; i++) {
	    const node = data[i];
	    const { key, title } = node;
	    dataList.push({ key, title });
	    if (node.children) {
	      this.generateList(node.children);
	    }
	  }
	}
	
	fetchContractorList = (cb=null) => {
		getContractorTree().then(res=> {
			if(res.code===1){
				let contractorList = res.data
				let willUpdate = false
				this.props.updateStatus(willUpdate)
				this.props.updateContractorList(contractorList)
				if(cb)cb()
				// if(id){
				// 	contractorId = id
				// }else{
				// 	if(contractorList.length)contractorId = contractorList[0].id
				// }
				// this.props.updateContractorId(contractorId)
			}
		})
		// let contractorList = this.props.contractorList
		// let treeData = this.recursionContractors(contractorList)
		// this.setState({
		// 	treeData
		// })
	}
	
	
	
	recursionContractors = data => {
		const that = this
		if(Object.prototype.toString.call(data)==='[object Array]'&&data.length){
			data.forEach((item, index)=> {
				that.recursionContractors(item)
			})
		}
		if(Object.prototype.toString.call(data)==='[object Object]'){
			for(let key in data){
				that.recursionContractors(data[key])
			}
			data['key'] = String(data.id)
			data['title'] = data.name
			data['children'] = data.baseList
		}
		return data
	}
	
	addContractor = (item, e) => {
		e.stopPropagation()
		const contractorForm = item ? item : {
			id: 0,
			key: '0',
			live: 1,
			name: '无'
		}
		this.props.updateContractorForm(contractorForm)
		
		let selectKeys = [contractorForm.key]
		
		this.setState({
			selectKeys
		})
		
		if(this.props.location.pathname!=='/index/projectcontractor/forminfo'){
			this.props.history.push({pathname: "/index/projectcontractor/forminfo"})
		}
	}
	
	onChange = e => {
	    const { value } = e.target;
	    const expandedKeys = dataList.map(item => {
	        if (item.title.indexOf(value) > -1) {
	          return item.key;
	        }
	        return null;
	    }).filter((item, i, self) => item !==null );
		// console.log(expandedKeys)
	    this.setState({
	      expandedKeys: expandedKeys,
	      searchValue: value,
	      autoExpandParent: true,
	    });
	}
	
	onSelect = selectKeys => {
		if(selectKeys[0]){
			this.props.updateContractorId(Number(selectKeys[0]))
			this.setState({
				selectKeys
			})
		}
		if(this.props.location.pathname!=='/index/projectcontractor/detailinfo'){
			this.props.history.replace({pathname: "/index/projectcontractor/detailinfo"})
		}
	}
	
	onExpand = expandedKeys => {
	    this.setState({
	      expandedKeys: expandedKeys,
	      autoExpandParent: false,
	    });
	}
	
	renderTreeNodes = data => data.map((item) => {
		const index = item.title.indexOf(this.state.searchValue);
		const beforeStr = item.title.substr(0, index);
		const afterStr = item.title.substr(index + this.state.searchValue.length);
	
		  const title =
		    index > -1 ? (
		  	<span>
		  	  {beforeStr}
		  	  <span style={{ color: '#f50' }}>{this.state.searchValue}</span>
		  	  {afterStr}
			  {
				item.cstatus===1&&item.delStatus===1&& ( 
					<span className="btn_add" onClick={this.addContractor.bind(this, item)}>
					   <Icon type="plus-circle" /> 添加
					</span>
				  )
			  }
			  {
			  	item.delStatus===0&& ( 
			  		<span className="btn_remove">
			  		   已被删除
			  		</span>
			  	  )
			  }
		  	</span>
		    ) : (
		  	<span>
		  		{item.title}
		  		{
					item.cstatus===1&&item.delStatus===1&& ( 
						<span className="btn_add" onClick={this.addContractor.bind(this, item)}>
						   <Icon type="plus-circle" /> 添加
						</span>
					  )
		  		}
				{
					item.delStatus===0&& ( 
						<span className="btn_remove">
						   已被删除
						</span>
					  )
				}
		  	</span>
		    );
		
	    if (item.children) {
	      return (
	        <TreeNode className={item.delStatus===0?'del_node':''} title={title} key={item.key} dataRef={item}>
	          {this.renderTreeNodes(item.children)}
	        </TreeNode>
	      );
	    }
	    return <TreeNode className={item.delStatus===0?'del_node':''} title={title} key={item.key} dataRef={item} />;
	})
	
    render(){
        return(
            <div className="container_wrap">
				<BreadCrumb breadcrumbs={this.state.breadcrumbList}></BreadCrumb>
				<div className="srcoll_box">
					<div className="srcoll_box_inner">
						<div className="flex_box" style={{minHeight: this.state.height}}>
							<div className="tree_nav">
								<div className="tree_search">
									<Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
								</div>
								<div className="tree_content">
									<Tree
									  blockNode
									  showLine={true}
									  onSelect={this.onSelect}
									  onExpand={this.onExpand}
									  selectedKeys={this.state.selectKeys}
									  expandedKeys={this.state.expandedKeys}
									  autoExpandParent={this.state.autoExpandParent}
									>
										{this.renderTreeNodes(this.state.treeData)}
									</Tree>
									<div onClick={this.addContractor.bind(this, null)} className="add_level_btn flex_box flex_center align_items_center pointer">
										<Icon type="plus-circle" />
										<span>添加一级工程商</span>
									</div>
								</div>
							</div>
							<Switch>
								<Route path='/index/projectcontractor/detailinfo' component={DetailInfo} />
								<Route path='/index/projectcontractor/forminfo' component={FormInfo} />
								<Redirect to='/index/projectcontractor/detailinfo'  />
							</Switch>
						</div>
					</div>
				</div>
            </div>  
        )
    }
}


export default connect(state => ({
	willUpdate: state.storeState.willUpdate,
	contractorList: state.storeState.contractorList,
 }), {
	updateStatus,
	updateContractorId,
	updateContractorList,
	updateContractorForm
})(ProjectContractor);