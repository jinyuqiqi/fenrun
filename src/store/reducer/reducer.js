let defaultState = {
	contractorList: [],
	contractorId: 0,
	contractorForm: {},
	willUpdate: false,
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
	case 'STORAGE_STATE':
		state = action.storageStates
		return {
			...state
		}
    default:
        return state;
  }
}