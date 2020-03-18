let defaultState = {
	productList: [],
	contractorList: [],
	contractorId: 0,
	contractorForm: {},
	willUpdate: false,
	updateCurrentId: 0,
	loading: false,
<<<<<<< HEAD
=======
	auditContent: {},
	authorityList: null
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
}

export const storeState = (state = defaultState , action = {}) => {
  switch(action.type){
	case 'UPDATE_STATUS':
	    return {
		   ...state, 
	       ...{willUpdate: action.willUpdate},
	    };
    case 'UPDATE_LIST':
        return {
		   ...state, 
	       ...{contractorList: action.contractorList},
	    };
	case 'UPDATE_ID':
	    return {
		   ...state, 
	       ...{contractorId: action.contractorId},
	    };
	case 'UPDATE_FORM':
	    return {
		   ...state, 
	       ...{contractorForm: action.contractorForm},
	    };
	case 'UPDATE_CURRENT':
	    return {
		   ...state, 
	       ...{
			   updateCurrentId: action.plyload.updateCurrentId,
			   willUpdate: action.plyload.willUpdate
			  },
	    };
	case 'UPDATE_LOADING':
	    return {
		   ...state, 
	       ...{ loading: action.loading }
	    };
	case 'UPDATE_PRODUCT':
		state = action.storageStates
		return {
			...state,
			...{ productList: action.productList }
		}
<<<<<<< HEAD
=======
	case 'GET_AUDITINFO':
		return {
		   ...state, 
		   ...{auditContent: action.auditContent},
		};
>>>>>>> 992f6c1e4e5032cedd463105ad61c99dd7894c76
	case 'STORAGE_STATE':
		state = action.storageStates
		return {
			...state
		}
	case 'CLEAR_STATE':
		state = action.storageStates
		return {
			...state
		}
    default:
        return state;
  }
}