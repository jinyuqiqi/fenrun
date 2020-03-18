let defaultState = {
	productList: [],
	contractorList: [],
	contractorId: 0,
	contractorForm: {},
	willUpdate: false,
	updateCurrentId: 0,
	loading: false,
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
	case 'STORAGE_STATE':
		state = action.storageStates
		return {
			...state
		}
    default:
        return state;
  }
}