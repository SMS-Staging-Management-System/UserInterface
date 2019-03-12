import React from 'react'
import { IAuthState } from '../../reducers/management';
import { Button } from 'reactstrap';
import { ICognitoUser } from '../../model/cognito-user.model';



interface IJoinCohortProps {
    token: string,
    validToken: boolean,
    login: IAuthState,



    //findCohortByToken: (token:string) => void,
    joinCohort:(user:ICognitoUser, token:string) => void

}

export class JoinCohortComponent extends React.Component<IJoinCohortProps, any> {
    constructor(props){
        super(props)
    }

    //assert cohort token is real
    //if not display not a valid cohort link,

    componentDidMount() {
        //this.props.findCohortByToken(this.props.token);
    }

    joinCohort = () => {
        this.props.joinCohort(this.props.login.currentUser, this.props.token)
    }
   

    
    //join cohort window has username and cohort name and a join button
    //after clicking join, take you to cohort page

    render(){


        if(this.props.validToken){
            
            if(this.props.login.currentUser.email){
                //If already logged in take to join cohort window
                return(
                    <div>
                        <p>logged in</p>
                        <Button color='primary' onClick={this.joinCohort}>Join Cohort</Button>
                    </div>
                )
            }else {
                //Offer login or signup for the current cohort
                //on successful login/signup, take to join cohort window
                return(
                    <div>
                        <p>login/create</p>
                    </div>
                )
            }
        } else {
            //Not a valid link
            return(
                <div>
                    <p>not a real place</p>
                </div>
            )
        }
    }



}