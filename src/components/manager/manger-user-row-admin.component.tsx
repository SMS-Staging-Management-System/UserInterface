import * as React from 'react';
// import { IUser } from "src/model/User.model";
// import {FormGroup, Input} from 'reactstrap';

interface IComponentState {
   cChecked: any
}
interface IProps {
   Data: any
 }

export class ManagerUserRowAdminComponent extends React.Component <IProps, IComponentState > {
   constructor(props){
      super(props);

      this.state = {
         cChecked: false
      }
   }

   public handleToggle = (e: any) => {
      
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      // const name = target.name;
      this.setState({
         ...this.state,
         cChecked: value
         
       });
   }

   public render() {

      return(
         <>
            <tr >
               <td>{this.props.Data.firstName}</td>
               <td>{this.props.Data.lastName}</td>
               <td>{this.props.Data.email}</td>
            </tr>
         </>
      )
   }
}

export default ManagerUserRowAdminComponent

