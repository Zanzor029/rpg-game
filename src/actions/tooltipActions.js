import { SHOW_TOOLTIP, HIDE_TOOLTIP } from './types'

export const showTooltip = (tooltipProps, tooltipType) => dispatch => {
    dispatch({
      type: SHOW_TOOLTIP,
      tooltipProps,
      tooltipType
    });
  }
  
  export const hideTooltip = () => dispatch => {
    dispatch({
      type: HIDE_TOOLTIP
    });
  }