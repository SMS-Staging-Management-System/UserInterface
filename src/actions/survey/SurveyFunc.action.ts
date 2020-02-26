import * as actionTypes from './actionTypes'

export const changeField = (index: any, value: any, name: any) => (dispatch: any) => {
    dispatch({
        payload: {index, value, name},
        type: actionTypes.CHANGE_FIELD
    })
}