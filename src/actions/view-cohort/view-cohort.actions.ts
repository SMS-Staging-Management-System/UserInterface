import { IUser } from "../../model/user.model";
import { ICohort } from "../../model/cohort";
import { cohortClient } from "../../axios/sms-clients/cohort-client";
import { toast } from "react-toastify";


export const viewCohortTypes = {
    TOGGLE: 'VIEW_COHORT_TOGGLE_MODAL_VISIBLE',
    TOGGLE_CLOSE: 'VIEW_COHORT_TOGGLE_CLOSE_MODAL_VISIBLE',
    TOGGLE_STATUS_DROPDOWN: 'VIEW_COHORT_TOGGLE_STATUS_DROPDOWN',
    SELECT_ONE: 'VIEW_COHORT_SELECT_ONE_USER',
    SELECT_ALL: 'VIEW_COHORT_SELECT_ALL_USERS',
    DESELECT_ONE: 'VIEW_COHORT_DESELECT_ONE_USER',
    DESELECT_ALL: 'VIEW_COHORT_DESLECT_ALL_USERS',
    GET_USERS: 'VIEW_COHORT_LOAD_USERS',
    REMOVE_SELECTED: 'VIEW_COHORT_REMOVE_SELECTED_USERS',
    COHORT_SAVED: 'VIEW_COHORT_COHORT_SAVED',
    UPDATE_COHORT: 'VIEW_COHORT_UPDATE',
    HOVERED_COHORT: 'VIEW_COHORT_CHANGE_SELECTED_COHORT',
}

// Excplicitly deconstruct to ensure that all types have a
// corresponding action
const { TOGGLE,
    TOGGLE_CLOSE,
    TOGGLE_STATUS_DROPDOWN,
    SELECT_ONE,
    SELECT_ALL,
    DESELECT_ONE,
    DESELECT_ALL,
    GET_USERS,
    REMOVE_SELECTED,
    COHORT_SAVED,
    UPDATE_COHORT,
    HOVERED_COHORT
} = viewCohortTypes;

export const toggleViewCohortModal = (cohort: ICohort)  => async (dispatch: any) => {
    const newUserList: IUser[] = await cohortClient.getUsers(cohort.cohortId);
    cohort.users = newUserList;
    dispatch({
        payload: { cohort: cohort },
        type: TOGGLE
    });
}

export const closeViewCohortModal = ()  => async (dispatch: any) => {
    dispatch({
        payload: {},
        type: TOGGLE_CLOSE
    });
}

export const getCohortUsers = () => {
    return {
        payload: {},
        type: GET_USERS
    }
}

export const selectOneUser = (user: IUser) => {
    return {
        payload: {
            user
        },
        type: SELECT_ONE
    }
}

export const hoveredCohort = (cohort: ICohort) => {
    return {
        payload: {
            cohort
        },
        type: HOVERED_COHORT
    }
}

export const deselectOneUser = (user: IUser) => {
    return {
        payload: {
            user
        },
        type: DESELECT_ONE
    }
}

export const selectAllUsers = () => {
    return {
        payload: {},
        type: SELECT_ALL
    }
}

export const deselectAllUsers = () => {
    return {
        payload: {},
        type: DESELECT_ALL
    }

}

export const removeSelectedUsers = () => {
    return {
        payload: {},
        type: REMOVE_SELECTED
    }
}

export const toggleStatusDropdown = () => {
    return {
        payload: {},
        type: TOGGLE_STATUS_DROPDOWN
    }
}

// should let you save cohorts.
export const saveCohort = (cohort: ICohort) => (dispatch: (action: any) => void) => {
    cohortClient.save(cohort)
        .then(async resp => {
            toast.success('Cohort info updated');
            const result = await resp.data;
            dispatch({
                payload: {
                    cohort: result
                },
                type: UPDATE_COHORT
            });

            dispatch({
                payload: {},
                type: COHORT_SAVED
            });
        })
        .catch(e => {
            toast.error('Failed to Save Cohort');
        })
}

export const updateCohort = (cohort: ICohort) => {
    return {
        payload: {
            cohort
        },
        type: UPDATE_COHORT
    }
}