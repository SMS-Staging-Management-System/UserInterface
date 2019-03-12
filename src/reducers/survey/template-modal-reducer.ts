import { templateModalTypes } from '../../actions/modal/template-modal-actions';
import { IModalTemplateState } from '.';
const initialState: IModalTemplateState= {
    showModal: false
}

export const templateModalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case templateModalTypes.HANDLE_SHOW:
        return{
            ...state,
            showModal: true
        }

        case templateModalTypes.HANDLE_CLOSE:
        return{
            ...state,
            showModal: false
        }
    }

    return state;
}