import { alertConstants } from '../constants';

export function alert(state = null, action) {
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
      return null;
    default:
      return state
  }
}