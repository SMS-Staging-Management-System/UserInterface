export const templateModalTypes = {
    HANDLE_SHOW: 'HANDLE_SHOW',
    HANDLE_CLOSE: 'HANDLE_EDIT_CLOSE'
}

export const handleShow = () => {
    return {
        payload: {

        },
        type: templateModalTypes.HANDLE_SHOW
    }
}
export const handleClose = () => {
    return {
        payload: {

        },
        type: templateModalTypes.HANDLE_CLOSE
    }
}