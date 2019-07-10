import {smsClient} from '.'

const managersContext = '/user-service/managers'

export const managersClient = {
    findManagersByLocation(alias:string){
        return smsClient.get(managersContext + `/address/${alias}`) 
    },
    addManager(email:string, addressId:number){
        return smsClient.post(managersContext + '/new', {email: email, address_id: addressId})
    }
}