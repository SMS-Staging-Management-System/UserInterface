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
    UPDATE_STAGING_MANAGER_RESPONSE: 'UPDATE_STAGING_MANAGER_RESPONSE'
}

export const manageGetUsersByGroup = (groupName: string, email: string, page?: number) => async (dispatch: any) => {
    page || (page = 0);
    groupName || (groupName = 'all');
    groupName && (groupName = groupName.toLocaleLowerCase());
    try {
        const reduxStore = store.getState();
        let userMap = new Map<string, ICognitoUser>();
        let emailList: string[] = [];
        let userInfoRespPromise;

        // declared here because whether they are acutally used or not varies
        let adminResponsePromise;
        let stagingManagerResponsePromise;
        let trainerResponsePromise;
        let userServiceUserList;

        console.log('')
        console.log('')
        console.log(reduxStore)
        console.log('')
        console.log('')
        console.log(emailList)

        emailList = reduxStore.managementState.manageUsers.emailList;


        // only request the groups required
        // if caching is implemented for the cognito users this can be simplified
        if((page + 1) === 1){
            if (groupName === cognitoRoles.ADMIN) {
                adminResponsePromise = cognitoClient.findUsersByGroup(cognitoRoles.ADMIN, '');
                const adminResponse = await adminResponsePromise;
                emailList = adminResponse.data.Users.map(user =>
                    user.Attributes.find((attr: any) => attr.Name === 'email').Value);
            }
            else if (groupName === cognitoRoles.STAGING_MANAGER) {
                stagingManagerResponsePromise = cognitoClient.findUsersByGroup(cognitoRoles.STAGING_MANAGER, '');
                const stagingManagerResponse = await stagingManagerResponsePromise;
                emailList = stagingManagerResponse.data.Users.map(user =>
                    user.Attributes.find((attr: any) => attr.Name === 'email').Value);
            }
            else if (groupName === cognitoRoles.TRAINER) {
                trainerResponsePromise = cognitoClient.findUsersByGroup(cognitoRoles.TRAINER, '');
                const trainerResponse = await trainerResponsePromise;
                emailList = trainerResponse.data.Users.map(user =>
                    user.Attributes.find((attr: any) => attr.Name === 'email').Value);
            }
            console.log('inside page 1')
        } else if((page + 1) % 6 === 0){
            if (groupName === cognitoRoles.ADMIN) {
                adminResponsePromise = cognitoClient.findUsersByGroup(cognitoRoles.ADMIN, '');
                const adminResponse = await adminResponsePromise;
                emailList += adminResponse.data.Users.map(user =>
                    user.Attributes.find((attr: any) => attr.Name === 'email').Value);
            }
            else if (groupName === cognitoRoles.STAGING_MANAGER) {
                stagingManagerResponsePromise = cognitoClient.findUsersByGroup(cognitoRoles.STAGING_MANAGER, '');
                const stagingManagerResponse = await stagingManagerResponsePromise;
                emailList += stagingManagerResponse.data.Users.map(user =>
                    user.Attributes.find((attr: any) => attr.Name === 'email').Value);
            }
            else if (groupName === cognitoRoles.TRAINER) {
                trainerResponsePromise = cognitoClient.findUsersByGroup(cognitoRoles.TRAINER, '');
                const trainerResponse = await trainerResponsePromise;
                emailList += trainerResponse.data.Users.map(user =>
                    user.Attributes.find((attr: any) => attr.Name === 'email').Value);
            }
            console.log('inside page 6/12/18')
        }

        const emailListPaginationStart = page * 10;
        const emailListPaginationEnd = (page + 1) * 10;
        const emailListPagination = emailList.slice(emailListPaginationStart, emailListPaginationEnd);

        console.log('emailList')
        console.log(emailList)
        console.log('emailListPagination')
        console.log(emailListPagination)

        // if the email list has any elements then whatever the parameters of the action are
        // they specify only requesting information for specific users
        // if (adminResponsePromise || stagingManagerResponsePromise || trainerResponsePromise) {
        if (emailList.length) {
            if (email) {
                emailList = emailList.filter((currentEmail) => currentEmail.toLocaleLowerCase().includes(email));
            }
            userInfoRespPromise = userClient.findAllByEmails(emailListPagination, 1);
        }
        // if email exists then users are supposed to be filted by that email
        else if (email) {
            userInfoRespPromise = userClient.findUsersByPartialEmail(email, page);
        }
        // default to retrieving all users
        else {
            userInfoRespPromise = userClient.findAllUsersPage(page);
        }

        // if the data has been retrieved then parse it from the promises into the map
        if (adminResponsePromise) {
            const adminResponse = await adminResponsePromise;
            addUserRolesToMap(cognitoRoles.ADMIN, adminResponse.data.Users, userMap);
            updateAdminResponse(adminResponse)(dispatch);
        }
        if (stagingManagerResponsePromise) {
            const stagingManagerResponse = await stagingManagerResponsePromise;
            addUserRolesToMap(cognitoRoles.STAGING_MANAGER, stagingManagerResponse.data.Users, userMap);
            updateStagingManagerResponse(stagingManagerResponse)(dispatch);
        }
        if (trainerResponsePromise) {
            const trainerResponse = await trainerResponsePromise;
            addUserRolesToMap(cognitoRoles.TRAINER, trainerResponse.data.Users, userMap);
            updateTrainerResponse(trainerResponse)(dispatch);
        }

         // parse the response from the user service
        let userInfoResp = await userInfoRespPromise;
        userServiceUserList = userInfoResp.data.content || userInfoResp.data;

        const pageTotalByEmailList = Math.ceil(emailList.length / 10);
        const pageTotalByUserResp = Math.ceil(userInfoResp.data.totalElements / 10);
        const pageTotal = pageTotalByUserResp || pageTotalByEmailList;

        if(userInfoResp.data.content){
            for(email of userInfoResp.data.content) {
                emailList.push(email);
            }
        }

        console.log('')
        console.log('')
        console.log('pageTotal')
        console.log(pageTotal)
        console.log('pageTotalEL')
        console.log(pageTotalByEmailList)
        console.log('pageTotalUR')
        console.log(pageTotalByUserResp)
        console.log(userServiceUserList)
        console.log(userInfoResp.data.content)
        console.log('')
        console.log('')

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

            // add user only if group filter allows
            if (altenateUser.roles.includes(groupName)) {
                listOfUsers.push(altenateUser);
            }
            else if (groupName === 'all') {
                listOfUsers.push(altenateUser);
            }
        }

        console.log(emailList)

        updateEmailList(emailList)(dispatch);

        console.log(emailList)

        dispatch({
            payload: {
                manageUsers: listOfUsers,
                manageUsersCurrentPage: page,
                manageUsersPageTotal: pageTotal
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
