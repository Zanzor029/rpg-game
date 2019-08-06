import { SHOW_MODAL, HIDE_MODAL } from './types'

export const showModal = (modalProps, modalType) => dispatch => {
    console.log("Display Modal with redux function...")
    dispatch({
      type: SHOW_MODAL,
      modalProps,
      modalType
    });
  }
  
  export const hideModal = () => dispatch => {
    console.log("Hide Modal with redux function...")
    dispatch({
      type: HIDE_MODAL
    });
  }