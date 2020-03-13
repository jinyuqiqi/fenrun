import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storageState } from '@/store/reducer/action';
import Loadable from '@/components/loadable';
import '@/css/base.css';
import '@/css/iconfont.css';
const Index = Loadable(()=> import('@/pages/index'))
const Login = Loadable(()=> import('@/pages/login'))

class App extends Component {
	constructor(props){
	    super(props); 
		const that = this
		window.onbeforeunload = function(event){
			window.sessionStorage.setItem('storageStates', JSON.stringify(that.props.storageStates))
		}
		
		let storageStates = window.sessionStorage.getItem('storageStates')
		if(storageStates){
			this.props.storageState(JSON.parse(storageStates))
		}
	}
	
	static propTypes = {
		storageStates: PropTypes.object.isRequired,
	    storageState: PropTypes.func.isRequired
	}
	
    componentDidMount(){
      
    }
 
    render() {
		return (
		  <div className="App">
		
				<Switch>
					<Route path='/' exact component={Login} /> 
					<Route path='/index' component={Index} /> 
					<Redirect from="/*" to="/" />
				</Switch>
			
		  </div>
		)
    }
}

export default connect(state => ({
	storageStates: state.storeState
 }), {
	storageState
})(withRouter(App));

// export default ;
