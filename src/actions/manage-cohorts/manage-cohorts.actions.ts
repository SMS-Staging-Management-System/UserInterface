import { ICohort } from '../../model/cohort';

export const manageCohortsTypes = {
    UPDATE_COHORTS: 'MANAGE_COHORTS_UPDATE_COHORT_LIST'
}

export const updateCohorts = (cohorts: ICohort[]) => {
    console.log('updateCohorts action created')
    console.log('cohorts = ', cohorts)
    return {
        payload: {
<<<<<<< HEAD
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
=======
            cohorts
        },
        type: manageCohortsTypes.UPDATE_COHORTS
    }

>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
}