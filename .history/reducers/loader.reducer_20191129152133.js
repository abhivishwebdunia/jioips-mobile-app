import { loaderConstants } from '../Constants'

export function loader(state = { loading: false }, action) {
  switch (action.type) {
    case loaderConstants.SHOW_LOADER:
      return {
        loading: true,
      }
    case loaderConstants.HIDE_LOADER:
      return {
        loading: false,
      }
    default:
      return state
  }
}
