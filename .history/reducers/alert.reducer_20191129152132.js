import { alertConstants } from '../Constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'success',
        heading:(action.heading)?action.heading:'Success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'error',
        heading:(action.heading)?action.heading:'Error',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}