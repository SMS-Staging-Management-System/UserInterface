import * as React from 'react';
// import { IUser } from "src/model/User.model";

interface IState {
   cChecked: any
}
// interface IProps {
//    user: IUser
//  }

export class ManagerUserRowComponent extends React.Component <{}, IState> {
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

     // let rowId=0;
      return(
         <>
            <tr>
               <td>Minasie</td>
               <td>Yosief </td>
               <td>misu@misu.edu</td>
               <td>Assoicate</td>
               <td> 
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

