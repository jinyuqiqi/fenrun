import { get, post } from './http';

export const login = p => {
	return post('/login', p)
}

export const getHomeCount = p => {
	return post('/index/getCountData', p)
}

export const getHomeData = p => {
	return post('/index/getReviewList', p)
}

export const addRole = p => {
	return post('/sysRole/add', p)
}

export const getAllRoles = p => {
	return post('/sysRole/selectall', p)
}

export const getOneRole = p => {
	return post('/sysRole/selectOne', p)
}

export const removeRole = p => {
	return post('/sysRole/delete', p)
}

export const updateRole = p => {
	return post('/sysRole/update', p)
}

export const selectAuthorization = p => {
	return get('/sysMenu/treelist', p)
}

export const addStaff = p => {
	return post('/userInfo/add', p)
}

export const getStaff = p => {
	return post('/userInfo/queryPage', p)
}

export const resetPasswod = p => {
	return post('/userInfo/resetPassword', p)
}

export const removeStaff = p => {
	return post('/userInfo/deletedOne', p)
}

export const getContractorTree = () => {
	return post('/contractors/query')
}

export const getContractorInfo = p => {
	return post('/contractors/selectOne', p)
}

export const getRandomNum = () => {
	return post('/contractors/getNumber')
}

export const getProductList = p => {
	return post('/contractors/getGoodsList', p)
}

export const addContractor = p => {
	return post('/contractors/add', p)
}

export const delContractor = p => {
	return post('/contractors/deletedOne', p)
}




