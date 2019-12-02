import { deptConstants,editDeptConstants } from '../_constants';


let initialState = { success:null,respData:null };

export function addEditDept(state = initialState, action) {
    console.log("dept action",action);
  switch (action.type) {
    case deptConstants.ADD_REQUEST:
      return {...state,
      };
    case deptConstants.ADD_SUCCESS:
      return {...state,
        success:true,
        respData: action
      };
    case deptConstants.ADD_FAILURE:
      return {...state,success:false,respData:{}};
    default:
      return state
  }
}

let initialState2 = { editData:null};
export function editDeptData(state = initialState2, action) {
  
switch (action.type) {
  case editDeptConstants.EDIT_INIT:
    return {...state,editData:action.reqData
    };
  case editDeptConstants.EDIT_CLEAR:
    return {...state,editData:null};
  default:
    return state
}
}