import React from 'react';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
import './index.css'
//通用的过场组件
const loadingComponent =()=>{
    return (
        <div className="loadable_box">
			<Spin size="large"/>
		</div>
    ) 
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader,loading = loadingComponent)=>{
    return Loadable({
        loader,
        loading
    });
}