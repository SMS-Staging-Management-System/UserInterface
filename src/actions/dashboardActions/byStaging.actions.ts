import * as types from './all.dashboard.actions'
import { userClient } from "../../axios/sms-clients/user-client";
import { IUser } from '../../model/user.model';

export const getUserListStaging = () => async dispatch => {
    try{
        let response = await userClient.getAllVirtualListUser();
        const data:IUser[] = response.data;
        console.log('gettig all virtual user from database', response);
        
        if(response.status === 200){
            dispatch({
                    payload:data,
                    type:types.SET_STAGING_USER_LIST
                })
        }  
      
    }  catch(err){
        console.log(err);      
    }

};