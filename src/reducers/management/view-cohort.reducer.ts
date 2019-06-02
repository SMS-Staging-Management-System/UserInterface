import { ICohortModalState } from '.'
import { viewCohortTypes } from '../../actions/view-cohort/view-cohort.actions';

const initialState: ICohortModalState = {
    selectedUsers: [],
    statusDropdownActive: false,
    modalVisible: false,
    isSaved: false,
    selectedStatus: {
        statusId: 0,
        generalStatus: "",
        specificStatus: "",
        virtual: false
    },

    cohort: {
        users: [],
        cohortToken: '',
        address: {
            addressId: 0,
            street: '',
            alias: '',
            city: '',
            country: '',
            state: '',
            zip: ''
        },
        cohortDescription: '',
        cohortName: '',
        endDate: '2019-03-21',
        startDate: '2019-01-10',
        cohortId: 0,
        trainer: {
            trainingAddress: {
                addressId: 0,
                street: '',
                alias: '',
                city: '',
                country: '',
                state: '',
                zip: '',
            },
            personalAddress: {
                addressId: 0,
                street: '',
                alias: '',
                city: '',
                country: '',
                state: '',
                zip: '',
            },
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            userId: 0,
            roles: [],
            userStatus: {
                statusId: 0,
                generalStatus: '',
                specificStatus: '',
                virtual: false
            }
        }
    }
}

const {
    TOGGLE,
    TOGGLE_STATUS_DROPDOWN,
    SELECT_ONE,
    SELECT_ALL,
    DESELECT_ALL,
    DESELECT_ONE,
    GET_USERS,
    REMOVE_SELECTED,
    COHORT_SAVED,
    UPDATE_COHORT,
    HOVERED_COHORT,
} = viewCohortTypes;

export const viewCohortReducer = (state = { ...initialState, isSaved: false }, action: any): ICohortModalState => {
    switch (action.type) {
        case TOGGLE:
            return {
                ...state,
                modalVisible: !state.modalVisible
            };
        case TOGGLE_STATUS_DROPDOWN:
            return {
                ...state,
                statusDropdownActive: !state.statusDropdownActive
            };
        case SELECT_ONE:
            return {
                ...state,
                selectedUsers: [...state.selectedUsers, action.payload.user]
            };
        case SELECT_ALL:
            return {
                ...state,
                selectedUsers: [...state.cohort.users]
            };
        case DESELECT_ALL:
            return {
                ...state,
                selectedUsers: []
            };
        case DESELECT_ONE:
            return {
                ...state,
                selectedUsers: state.selectedUsers.filter(user => {
                    user.email === action.payload.user.email
                })
            };
        case GET_USERS:
            return {
                ...state
            };
        case REMOVE_SELECTED:
            return {
                ...state,
                cohort: {
                    ...state.cohort,
                    users: state.cohort.users.filter(user => {
                        return state.selectedUsers.some(userWithSameEmail => {
                            return userWithSameEmail.email === user.email
                        });
                    })
                }

            };
        case COHORT_SAVED:
            return {
                ...state,
                isSaved: true
            };
        case HOVERED_COHORT:
            //toast.success("cohort action hit reducer");
            return {
                ...state,
                cohort: action.payload.cohort
            };
        case UPDATE_COHORT:
            return {
                ...state,
                cohort: action.payload.cohort
            }
    }
    return state;

}