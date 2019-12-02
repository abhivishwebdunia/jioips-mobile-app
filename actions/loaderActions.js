import { loaderConstants } from '../Constants';

export const loaderActions = {
  show,
  hide,
}

function show() {
  return { type: loaderConstants.SHOW_LOADER, loader: true }
}

function hide() {
  return { type: loaderConstants.HIDE_LOADER, loader: false }
}

export function loading(v) {
  return {
    type: v ? loaderConstants.SHOW_LOADER : loaderConstants.HIDE_LOADER,
    loading: v,
  }
}
