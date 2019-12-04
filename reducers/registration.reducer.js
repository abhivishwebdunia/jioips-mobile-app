import { authConstants } from '../constants';
let initialState = {
  registered: false,
  regData: null,
  success: null,
}
export function registration(state = initialState, action) {
  switch (action.type) {
    case authConstants.REGISTER_REQUEST:
      return {...state};
    case authConstants.REGISTER_SUCCESS:
      return {...state,registered:true,regData:action.data,success:true};
    case authConstants.REGISTER_FAILURE:
      return {...state,registered:true,regData:action.data,success:false};
    default:
      return state
  }
}