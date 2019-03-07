import  React, { Component } from 'react';
import { IUser } from '../../model/user.model';

interface IProfileProps {
  user: IUser
}

class Profile extends Component<IProfileProps, any> {
  render() {
    return (
      <div> 
        <p>{this.props.user.email}</p>
        <p>{this.props.user.roles}</p>        
      </div>
    )
  }
}

export default Profile;
