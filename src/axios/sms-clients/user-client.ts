import { smsClient } from ".";
import { IUser } from "../../model/user.model";


const usersContext = '/user-service/users'

export const userClient = {
    saveUser(newUser: IUser) {
        return smsClient.post(usersContext, newUser);
    },
    findAllByCohortId: (cohortId: number) => {
        return smsClient.get(`${usersContext}/cohorts/${cohortId}`)
    },
    findOneByEmail(email: string) {
        return smsClient.get(usersContext + `/email/${email}`);
    },
    findOneByPartialEmail(email: string) {
        return smsClient.get(usersContext + `/email/partial/${email}`);
    },
    updateSMSUserInfo(updatedUser: IUser) {
        return smsClient.patch(usersContext, updatedUser);
    },
    findAllByEmails(emails: string[], page: number = 0) {
        return smsClient.post(usersContext + `/emails`,
            {
                emailList: emails,
                page: page
            });
    },
    findAllByEmailsNotPageable(emails: string[]) {
        return smsClient.post(usersContext + `/emailsnotpageable`,
            {
                emailList: emails
            });
    },
    findUsersByPartialEmail(email: string, page: number = 0) {
        return smsClient.post(`${usersContext}/email/partial`,
            {
                emailFragement: email,
                page: page
            });
    },
    findAllUsersPage(page: number) {
        return smsClient.get(`${usersContext}/allUsers?page=${page}`);
    },
    findAllUsersByPage(page: number = 0) {
        return smsClient.get(`${usersContext}/allUsers/page/${page}`);
    },
    findAllUsers() {
        return smsClient.get(`${usersContext}/allUsers`);
    },
    getAllVirtualListUser(){
        return smsClient.get(`${usersContext}/invirtual`);
    },
    findAllDroppedAssociate: async(pageNumber:number, PageSize:number) =>{
        return smsClient.get(usersContext + `/dropped/page?pageNumber=${pageNumber}&pageSize=${PageSize}`)
    }
}
