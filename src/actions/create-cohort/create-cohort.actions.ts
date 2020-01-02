import { IAddress } from "../../model/users/IAddress";
import { toast } from "react-toastify";
import { ICohort } from "../../model/users/ICohort";
import { cohortClient } from "../../axios/sms-clients/cohort-client";
import { userClient } from "../../axios/sms-clients/user-client";
import { ICognitoUser } from "../../model/ICognitoUser";

export const createCohortTypes = {  
  TOGGLE: 'TOGGLE_CREATE_COHORT_MODAL',
  TOGGLE_LOCATION_DROPDOWN: 'TOGGLE_CREATE_COHORT_MODAL_LOCATION_DROPDOWN',
  TOGGLE_TRAINER_DROPDOWN: 'TOGGLE_CREATE_COHORT_MODAL_TRAINER_DROPDOWN',
  UPDATE_NEW_COHORT: 'UPDATE_NEW_COHORT',
  UPDATE_NEW_COHORT_LOCATION: 'UPDATE_NEW_COHORT_LOCATION',
  UPDATE_NEW_COHORT_TRAINER: 'UPDATE_NEW_COHORT_TRAINER',
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

export const toggleTrainerDropdown = () => {
  return {
    payload: {},
    type: createCohortTypes.TOGGLE_TRAINER_DROPDOWN
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

export const updateNewCohortTrainer = (trainer: ICognitoUser) => async (dispatch: (action: any) => void) => {
  try {
    const response = await userClient.findOneByEmail(trainer.email)
    dispatch( {
      payload: {
        trainer: response.data
      },
      type: createCohortTypes.UPDATE_NEW_COHORT_TRAINER
    })
  } catch (e) {
    toast.warn('Unable to retrieve trainer')
    dispatch({
      payload: {
      },
      type: ''
    })
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

export const saveCohort = (newCohort: ICohort) => async (dispatch: (action: any)=> void) => {
    //saving the cohort on the database
    await cohortClient.save(newCohort)
    .then(async resp => {
      toast.success('Cohort Created')
      //updating the trainer's training address
      newCohort.trainer.trainingAddress = newCohort.address;
      //updating the trainer on the database
      await userClient.updateSMSUserInfo(newCohort.trainer);
      const createdCohort = await resp.data
      dispatch({
        payload: {
          newUser: createdCohort
        },
        type: createCohortTypes.UPDATE_NEW_COHORT
      })
      dispatch({
        payload: {},
        type: createCohortTypes.COHORT_SAVED
      })

    })
    .catch(e => {
      toast.error('Failed To Save Cohort')
    })

 
}