

export const templateTypes = {
    HANDLE_SHOW: 'HANDLE_SHOW',
    HANDLE_CREATE_CLOSE: 'HANDLE_CREATE_CLOSE',
    HANDLE_CLOSE: 'HANDLE_CLOSE'
}

export const handleShow = () => {
    return {
        payload: {

        },
        type: templateTypes.HANDLE_SHOW
    }
}
export const handleClose = () => {
    return {
        payload: {

        },
        type: templateTypes.HANDLE_CLOSE
    }
}
export const handleCreateClose = (surveyId: number) => {
    return {
        payload: {
            redirectTo: `/surveys/build/${surveyId}`
        },
        type: templateTypes.HANDLE_CREATE_CLOSE
    }
}