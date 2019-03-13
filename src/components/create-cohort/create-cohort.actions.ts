import { IAddress } from "../../model/address.model";
import { toast } from "react-toastify";
import { ICohort } from "../../model/cohort";
import { cohortClient } from "../../axios/sms-clients/cohort-client";

export const createCohortTypes = {  
  TOGGLE: 'TOGGLE_CREATE_COHORT_MODAL',
  TOGGLE_LOCATION_DROPDOWN: 'TOGGLE_CREATE_COHORT_MODAL_LOCATION_DROPDOWN',
  UPDATE_NEW_COHORT: 'UPDATE_NEW_COHORT',
  UPDATE_NEW_COHORT_LOCATION: 'UPDATE_NEW_COHORT_LOCATION',
  COHORT_SAVED: 'CREATE_NEW_COHORT_COHORT_SAVED'
}

export const toggleModal = () => {
  return {
    payload: {
    },
    type: createCohortTypes.TOGGLE
  }
}


export const toggleLocationDropdown = () => {
  return {
    payload: {},
    type: createCohortTypes.TOGGLE_LOCATION_DROPDOWN
  }
}

export const updateNewCohortLocation = (location: IAddress) => {
  return {
    payload: {
      location
    },
    type: createCohortTypes.UPDATE_NEW_COHORT_LOCATION
  }
}

export const updateNewCohort = (newCohort: ICohort) => {
  return {
    payload: {
      newUser: newCohort
    },
    type: createCohortTypes.UPDATE_NEW_COHORT
  }
}

export const saveCohort = (newCohort: ICohort) => (dispatch) => {
  cohortClient.save(newCohort)
    .then(resp => {
      toast.success('Cohort Created')
      dispatch({
        payload: {},
        type: createCohortTypes.COHORT_SAVED
      })
    })
    .catch(e => {
      toast.error('Failed To Save Cohort')
    })

 
}