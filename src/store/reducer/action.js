// import { getContractorTree } from '@/http/api';
export const updateStatus = willUpdate => {
  return {
    type: 'UPDATE_STATUS',
    willUpdate, 
  }
}

export const updateContractorList = contractorList => {
  return {
    type: 'UPDATE_LIST',
    contractorList, 
  }
}

export const updateContractorId = contractorId => {
  return {
    type: 'UPDATE_ID',
    contractorId, 
  }
}

export const updateContractorForm = contractorForm => {
  return {
    type: 'UPDATE_FORM',
    contractorForm, 
  }
}

export const updateCurrentInfo = plyload => {
  return {
    type: 'UPDATE_CURRENT',
    plyload, 
  }
}

export const updateLoading = loading => {
  return {
    type: 'UPDATE_LOADING',
    loading, 
  }
}

export const updateProduct = productList => {
  return {
    type: 'UPDATE_PRODUCT',
    productList, 
  }
}

export const storageState = storageStates => {
  return {
    type: 'STORAGE_STATE',
    storageStates, 
  }
}

