import { cognitoClient } from "../../axios/sms-clients/cognito-client";
import { toast } from "react-toastify";
import { ICognitoUser, cognitoRoles } from "../../model/cognito-user.model";
import { userClient } from "../../axios/sms-clients/user-client";
import { sortTypes } from "../../components/manage/manage-internal/manage-internal.component";
import { store } from "../../Store"

export const manageUsersTypes = {
    GET_USERS: 'MANAGE_GET_USERS',
    UPDATE_SEARCH_EMAIL: 'UPDATE_SEARCH_EMAIL',
    UPDATE_EMAIL_LIST: 'UPDATE_EMAIL_LIST',
    UPDATE_SEARCH_OPTION: 'UPDATE_SEARCH_OPTION',
    GET_USERS_SORTED: 'GET_USERS_SORTED',
    UPDATE_ADMIN_RESPONSE: 'UPDATE_ADMIN_RESPONSE',
    UPDATE_TRAINER_RESPONSE: 'UPDATE_TRAINER_RESPONSE',
    UPDATE_STAGING_MANAGER_RESPONSE: 'UPDATE_STAGING_MANAGER_RESPONSE',
    UPDATE_MAX_PAGE: 'UPDATE_MAX_PAGE'
}

// FUTURE WORK
// Proper sorting through server, not by current information

export const manageGetUsersByGroup = (groupName: string, email: string, page?: number) => async (dispatch: any) => {
    page || (page = 0);
    groupName || (groupName = 'all');
    groupName && (groupName = groupName.toLocaleLowerCase());
    try {
        // getting the store to be used at a later time
        const reduxStore = store.getState();
        let userMap = new Map<string, ICognitoUser>();
        let userInfoRespPromise;

        // declared here because whether they are acutally used or not varies
        let adminResponsePromise;
        let stagingManagerResponsePromise;
        let trainerResponsePromise;

        let adminResponse;
        let stagingManagerResponse;
        let trainerResponse;

        let userServiceUserList;
        let pageTotal;
        const elementsPerPage = 10;

        // storing the redux store into variables to be used as referenced
        let oldAdminResponse = reduxStore.managementState.manageUsers.adminResponse;
        let oldTrainerResponse = reduxStore.managementState.manageUsers.trainerResponse;
        let oldStagingManagerResponse = reduxStore.managementState.manageUsers.stagingManagerResponse;

        let maxPage = reduxStore.managementState.manageUsers.maxPage;
        let areMore = reduxStore.managementState.manageUsers.areMore;

        let emailList = reduxStore.managementState.manageUsers.emailList;

        // only request the groups required
        // checks if on the initial page and won't recall if they go back to the inital page
        // if caching is implemented for the cognito users this can be simplified
        if ((page + 1) === 1 && (page + 1) > maxPage) {
            if (groupName === cognitoRoles.ADMIN) {
                adminResponsePromise = cognitoClient.findUsersByGroup(cognitoRoles.ADMIN, '');
                adminResponse = await adminResponsePromise;
                emailList = adminResponse.data.Users.map(user =>
                    user.Attributes.find((attr: any) => attr.Name === 'email').Value);
            }
            else if (groupName === cognitoRoles.STAGING_MANAGER) {
                stagingManagerResponsePromise = cognitoClient.findUsersByGroup(cognitoRoles.STAGING_MANAGER, '');
                stagingManagerResponse = await stagingManagerResponsePromise;
                emailList = stagingManagerResponse.data.Users.map(user =>
                    user.Attributes.find((attr: any) => attr.Name === 'email').Value);
            }
            else if (groupName === cognitoRoles.TRAINER) {
                trainerResponsePromise = cognitoClient.findUsersByGroup(cognitoRoles.TRAINER, '');
                trainerResponse = await trainerResponsePromise;
                emailList = trainerResponse.data.Users.map(user =>
                    user.Attributes.find((attr: any) => attr.Name === 'email').Value);
            }
        }
        // checks if the page we are going to needs data to be sent from cognito server
        else if ((page + 1) % 2 === 1 && (page + 1) > maxPage) {
            if (groupName === cognitoRoles.ADMIN) {
                adminResponsePromise = cognitoClient.findUsersByGroup(cognitoRoles.ADMIN, oldAdminResponse.data.NextToken);
                adminResponse = await adminResponsePromise;
                for(let i = 0; i < adminResponse.data.Users.length; i++){
                    emailList.push(adminResponse.data.Users[i].Attributes.find((attr: any) => attr.Name === 'email').Value)
                }
            }
            else if (groupName === cognitoRoles.STAGING_MANAGER) {
                stagingManagerResponsePromise = cognitoClient.findUsersByGroup(cognitoRoles.STAGING_MANAGER, oldStagingManagerResponse.data.NextToken);
                stagingManagerResponse = await stagingManagerResponsePromise;
                for(let i = 0; i < stagingManagerResponse.data.Users.length; i++){
                    emailList.push(stagingManagerResponse.data.Users[i].Attributes.find((attr: any) => attr.Name === 'email').Value)
                }
            }
            else if (groupName === cognitoRoles.TRAINER) {
                trainerResponsePromise = cognitoClient.findUsersByGroup(cognitoRoles.TRAINER, oldTrainerResponse.data.NextToken);
                trainerResponse = await trainerResponsePromise;
                for(let i = 0; i < trainerResponse.data.Users.length; i++){
                    emailList.push(trainerResponse.data.Users[i].Attributes.find((attr: any) => attr.Name === 'email').Value)
                }
            }
        }

        // selecting only the emails needed for the page(each page has a number of emails set by (elements per page) value)
        const emailListPaginationStart = page * elementsPerPage;
        const emailListPaginationEnd = (page + 1) * elementsPerPage;
        const emailListPagination = emailList.slice(emailListPaginationStart, emailListPaginationEnd);


        // if the group is for all users, we will get all users according to the
        // parameters provided and if no parameters are provided, get all users by page
        if (groupName === 'all') {
            // if email exists then users are supposed to be filted by that email
            if (email) {
                userInfoRespPromise = userClient.findUsersByPartialEmail(email, page);
            } else {
                userInfoRespPromise = userClient.findAllUsersPage(page);
            }
            let userInfoResp = await userInfoRespPromise;
            // sets the page total to the total number of elements divided by the elements per page
            pageTotal = Math.ceil(userInfoResp.data.totalElements / elementsPerPage);
        } 
        // if the the group is any role, will use email list to find users based
        // off emails provided by cognito server
        else {
            if (email) {
                emailList = emailList.filter((currentEmail) => currentEmail.toLocaleLowerCase().includes(email));
                userInfoRespPromise = userClient.findAllByEmails(emailList);
            } else {
                userInfoRespPromise = userClient.findAllByEmails(emailListPagination);
            }
            
            // sets the page total to the total number of elements divided by the elements per page
            pageTotal = Math.ceil(emailList.length / elementsPerPage);
            // increments the max page if we have not been to that page before
            if ((page + 1) > maxPage) {
                maxPage += 1;
                updateMaxPage(maxPage)(dispatch);
            }
        }

        // if the data has been retrieved then parse it from the promises into the map
        if (adminResponsePromise || oldAdminResponse) {
            if(adminResponsePromise) {
                adminResponse = await adminResponsePromise;
            } else {
                adminResponse = await oldAdminResponse;
            }
            addUserRolesToMap(cognitoRoles.ADMIN, adminResponse && adminResponse.data.Users, userMap);
            updateAdminResponse(adminResponse)(dispatch);
        }
        if (stagingManagerResponsePromise || oldStagingManagerResponse) {
            if(stagingManagerResponsePromise) {
                stagingManagerResponse = await stagingManagerResponsePromise;
            } else {
                stagingManagerResponse = await oldStagingManagerResponse;
            }
            addUserRolesToMap(cognitoRoles.STAGING_MANAGER, stagingManagerResponse.data.Users, userMap);
            updateStagingManagerResponse(stagingManagerResponse)(dispatch);
        }
        if (trainerResponsePromise || oldTrainerResponse) {
            if(trainerResponsePromise) {
                trainerResponse = await trainerResponsePromise;
            } else {
                trainerResponse = await oldTrainerResponse;
            }
            addUserRolesToMap(cognitoRoles.TRAINER, trainerResponse.data.Users, userMap);
            updateTrainerResponse(trainerResponse)(dispatch);
        }

        // parse the response from the user service
        // if there is content to the user response(i.e. we got info for all users) it passes that data
        // else sets the list to the data from a specific group
        let userInfoResp = await userInfoRespPromise;
        userServiceUserList = userInfoResp.data.content || userInfoResp.data;

        console.log('userInfoResp')
        console.log(userInfoResp)


        // makes the next if statement less cluttered
        const finalAdminResponse = (adminResponse && adminResponse.data.NextToken);
        const finalTrainerResponse = (trainerResponse && trainerResponse.data.NextToken);
        const finalStagingManagerResponse = (stagingManagerResponse && stagingManagerResponse.data.NextToken);

        // if there is a group resoponse, and that group has a nextToken, set variable to true
        // we don't want the group all to have a sign that there are more pages
        if(groupName !== 'all' && !email && (finalAdminResponse || finalTrainerResponse || finalStagingManagerResponse)) {
            areMore = true;
        } else {
            areMore = false;
        }

        // merge the user service and cognito information
        let listOfUsers = new Array<ICognitoUser>();
        for (let i = 0; i < userServiceUserList.length; i++) {
            let potentialUser = userMap.get(userServiceUserList[i].email)
            let altenateUser = {
                firstName: userServiceUserList[i].firstName,
                lastName: userServiceUserList[i].lastName,
                email: userServiceUserList[i].email,
                roles: new Array<string>()
            };
            if (potentialUser) {
                altenateUser.roles = potentialUser.roles
            }
            listOfUsers.push(altenateUser);
        }

        // send email list to the redux store to be called the next time this funciton runs
        updateEmailList(emailList)(dispatch);

        dispatch({
            payload: {
                manageUsers: listOfUsers,
                manageUsersCurrentPage: page,
                manageUsersPageTotal: pageTotal,
                areMore: areMore
            },
            type: manageUsersTypes.GET_USERS
        });
    } catch (e) {
        console.log(e)
        toast.warn('Unable to retreive users')
        dispatch({
            payload: {
            },
            type: 'ERROR'
        })
    }
}

export const resetData = () => async (dispatch: any) => {
    updateSearchEmail('')(dispatch);
    updateEmailList([])(dispatch);
    updateAdminResponse('')(dispatch);
    updateTrainerResponse('')(dispatch);
    updateStagingManagerResponse('')(dispatch);
    updateMaxPage(0)(dispatch);
}

export const updateSearchEmail = (newEmailSearch: string) => async (dispatch: any) => {
    dispatch({
        payload: {
            emailSearch: newEmailSearch,
        },
        type: manageUsersTypes.UPDATE_SEARCH_EMAIL
    });
}

export const updateEmailList = (newEmailList: string[]) => async (dispatch: any) => {
    dispatch({
        payload: {
            emailList: newEmailList,
        },
        type: manageUsersTypes.UPDATE_EMAIL_LIST
    });
}

export const updateSearchOption = (newSearchOption: string) => async (dispatch: any) => {
    dispatch({
        payload: {
            option: newSearchOption,
        },
        type: manageUsersTypes.UPDATE_SEARCH_OPTION
    });
}

export const updateAdminResponse = (newAdminResponse: string) => async (dispatch: any) => {
    dispatch({
        payload: {
            adminResponse: newAdminResponse,
        },
        type: manageUsersTypes.UPDATE_ADMIN_RESPONSE
    });
}

export const updateTrainerResponse = (newTrainerResponse: string) => async (dispatch: any) => {
    dispatch({
        payload: {
            trainerResponse: newTrainerResponse,
        },
        type: manageUsersTypes.UPDATE_TRAINER_RESPONSE
    });
}

export const updateStagingManagerResponse = (newStagingManagerResponse: string) => async (dispatch: any) => {
    dispatch({
        payload: {
            stagingManagerResponse: newStagingManagerResponse,
        },
        type: manageUsersTypes.UPDATE_STAGING_MANAGER_RESPONSE
    });
}

export const updateMaxPage = (newMaxPage: number) => async (dispatch: any) => {
    dispatch({
        payload: {
            maxPage: newMaxPage,
        },
        type: manageUsersTypes.UPDATE_MAX_PAGE
    });
}

//Action to Sort user table
export const sortUsers = (userArray: ICognitoUser[], sortKey) => (dispatch: any) => {
    userArray = userArray.sort((a, b) => sortBy(a, b, sortKey));

    dispatch({
        payload: {
            manageUsers: userArray,
            userTableSort: sortKey
        },
        type: manageUsersTypes.GET_USERS_SORTED
    })
}

function addUserRolesToMap(role: string, users, userMap: Map<string, ICognitoUser>) {
    for (let i = 0; i < users.length; i++) {
        const currentCognitoUser = users[i];
        // cognito users store emails in a map of attributes
        const currentEmail = currentCognitoUser.Attributes.find((attr: any) => attr.Name === 'email').Value;
        const mapUser = userMap.get(currentEmail)
        let newUser: ICognitoUser = mapUser ? mapUser : {
            email: currentEmail,
            roles: []
        };
        newUser.roles.push(role);
        userMap.set(newUser.email, newUser);
    }
}
//Function that does the sorting by fields
function sortBy(user1, user2, sortKey) {
    if (user1 === user2) {
        return 0;
    }
    if (!user2) {
        return 1;
    }
    if (!user1) {
        return -1;
    }
    switch (sortKey) {
        case sortTypes.FIRST_NAME:
            return sortByString(user1.firstName, user2.firstName)
        case sortTypes.LAST_NAME:
            return sortByString(user1.lastName, user2.lastName)
        case sortTypes.EMAIL:
            return sortByString(user1.email, user2.email)
        case sortTypes.FIRST_NAME_REVERSE:
            return sortByString(user1.firstName, user2.firstName) * (-1)
        case sortTypes.LAST_NAME_REVERSE:
            return sortByString(user1.lastName, user2.lastName) * (-1)
        case sortTypes.EMAIL_REVERSE:
            return sortByString(user1.email, user2.email) * (-1)
        default:
            return 0;
    }

}
//Function that does comparing for the sorting
function sortByString(a, b) {
    if (a === b) {
        return 0;
    }
    if (!b) {
        return 1;
    }
    if (!a) {
        return -1;
    }
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}