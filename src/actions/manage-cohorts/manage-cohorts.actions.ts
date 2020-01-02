import { ICohort } from '../../model/users/ICohort';

export const manageCohortsTypes = {
    UPDATE_COHORTS: 'MANAGE_COHORTS_UPDATE_COHORT_LIST'
}

export const updateCohorts = (cohorts: ICohort[]) => {
    console.log('updateCohorts action created')
    console.log('cohorts = ', cohorts)
    return {
        payload: {
            cohorts: cohorts,
            currentPage: 0,
            totalPages: 0
        },
        type: manageCohortsTypes.UPDATE_COHORTS
    }
}

// recieves a list of cohorts and a page number
// axios request must be made outside and prior to action
export const updateCohortsByPage = (cohortsPage, currentPage: number) => {
    console.log('updateCohorts action created');
    console.log('cohorts = ', cohortsPage);
    return {
        payload: {
            cohorts: cohortsPage.content,
            currentPage: currentPage,
            totalPages: cohortsPage.totalPages
        },
        type: manageCohortsTypes.UPDATE_COHORTS
    }
}