import { ICohort } from '../../model/cohort';

export const manageCohortsTypes = {
    UPDATE_COHORTS: 'MANAGE_COHORTS_UPDATE_COHORT_LIST'
}

export const updateCohorts = (cohorts: ICohort[]) => {
    console.log('updateCohorts action created')
    console.log('cohorts = ', cohorts)
    return {
        payload: {
            cohorts
        },
        type: manageCohortsTypes.UPDATE_COHORTS
    }

}