import { get, post } from './http';

export const login = p => {
	return post('/login', p)
}

export const getUsetInfo = () => {
	return get('/getLoginInSysUser')
}

export const getHomeCount = p => {
	return post('/index/getCountData', p)
}

export const getWithdrawList = p => {
	return post('/index/getReviewList', p)
}

export const getWithdrawListLog = p => {
	return post('/index/getReviewListLog', p)
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

export const updateContractor = p => {
	return post('/contractors/update', p)
}

export const getSaleOrder = p => {
	return post('/saleOrderCheck/selectall', p)
}

export const getFlowingOrder = p => {
	return post('/journalCapital/list', p)
}

export const getBusinessOrder = p => {
	return post('/businessOrderInfo/selectall', p)
}

export const getBusinessAmount = () => {
	return post('/businessOrderInfo/statistical')
}

export const getSaleInfo = p => {
	return post('/saleOrderInfo/selectone', p)
}

export const getProductBill = p => {
	return post('/saleOrderInfo/selectall', p)
}

export const getBaseProduct = () => {
	return post('/contractors/getGoodsBaseList', {id: 0})
}

export const getCustomerList = p => {
	return post('/productCustomerInfo/selectall', p)
}

export const onAuthMb = p => {
	return post('/saleOrderInfo/addMb', p)
}

export const onAuthLyb = p => {
	return post('/saleOrderInfo/addLyb', p)
}

export const getWithdrawLogs = p => {
	return post('/withdrawalsLog/queryPage', p)
}

export const addBackCard = p => {
	return post('/bankInfo/add', p)
}

export const getBankCardInfo = () => {
	return post('/bankInfo/selectBankInfo')
}

export const updateBankCardInfo = p => {
	return post('/bankInfo/update', p)
}

export const getAccountBalance = () => {
	return post('/withdrawalsLog/getAccountBalance')
}

export const getWithMessage = () => {
	return post('/withdrawalsLog/getMsgSend')
}

export const onWithdraw = p => {
	return post('/withdrawalsLog/add', p)
}

export const getAuthList = p => {
	return post('/index/getSaleOrderReviewList', p)
}

export const getTableListCount = () => {
	return post('/index/getListDataCount')
}

export const onAuditForm = p => {
	return post('/reviewInfo/add', p)
}

export const getCustomerInfo = p => {
	return post('/productCustomerInfo/selectCustomerInfo', p)
}

export const getCustomerParking = p => {
	return post('/productCustomerInfo/selectParkingPage', p)
}

export const addCustomer= p => {
	return post('/productCustomerInfo/add', p)
}

export const deleteCustomer = p => {
	return post('/productCustomerInfo/delete', p)
}

export const getPAyAccount = () => {
	return post('/saleOrderInfo/getPaymentAccount')
}

export const getSaleBillCount = () => {
	return post('/saleOrderInfo/selectCount')
}

export const getAuthPopInfo = p => {
	return post('/saleOrderInfo/getReviewAccounts', p)
}

export const getAuthPopInfoDown = p => {
	return post('/saleOrderInfo/getReviewAccountsDown', p)
}

export const updatePassWord = p => {
	return post('/updatePassword', p)
}

export const getUserAuthMenu = () => {
	return get('/sysMenu/treelist')
}

export const uploadUrl = 'http://zhcl.4000750222.com/testdivided/file/upload'
