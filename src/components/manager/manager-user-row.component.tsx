import * as React from 'react';
// import { IUser } from "src/model/User.model";
import {Button} from 'reactstrap';

interface IComponentState {
   cChecked: any,
   

}
interface IProps {
   Data: any,
   
 }

export class ManagerUserRowComponent extends React.Component <IProps, IComponentState > {
   constructor(props){
      super(props);

      this.state = {
         cChecked: false,
        
      }
   }

   public handleToggle = (e: any) => {
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({
         ...this.state,
         cChecked: value  
       });
       
   }
   public removeRole = () =>{
      this.setState({
         ...this.state,
         
       });
       console.log("I have Removed!");
       // Throw an Action.
       // To remove from list of Roles.
   }

   public render() {

      return(
         <>
            <tr >
               <td>{this.props.Data.firstName}</td>
               <td>{this.props.Data.lastName}</td>
               <td>{this.props.Data.email}</td>
               <td>
               <Button size="sm" color="danger"
                  onClick={this.removeRole}> Remove </Button>
               </td>
               <td className="flex-center"> 
                  <div>
                     <label className="switch">
                        <input type="checkbox"
                           name="cChecked"
                           checked={this.state.cChecked}
                           onChange={this.handleToggle}
                        />
                        <span className="slider round"></span>
                     </label>
                     </div>
                  </td>
            </tr>
         </>
      )
   }
}

export default ManagerUserRowComponent

