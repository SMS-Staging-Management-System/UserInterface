import * as React from 'react';
import {Button} from 'reactstrap';
import * as managerActions from '../../actions/manager/manager.actions';
import { connect } from 'react-redux';
import { IState } from 'src/reducers';
interface IComponentState {
   cChecked: any,
   

}
interface IProps {
   Data: any,
   roleSelected: string,
   deleteCognitoGroup: (email: string, role: string) => void
 }

export class ManagerUserRowComponent extends React.Component <IProps, IComponentState > {
   constructor(props){
      super(props);

      this.state = {
         cChecked: true,
        
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
   public removeRoleBtn = () =>{
       this.props.deleteCognitoGroup(this.props.Data.email, this.props.roleSelected);
   }

   public render() {

      return(
         <>
            <tr >
               <td>{this.props.Data.firstName}</td>
               <td>{this.props.Data.lastName}</td>
               <td>{this.props.Data.email}</td>
               <td>
                  <Button className="mt-1 ml-1" size="sm" color="danger"
                  onClick={this.removeRoleBtn}> Remove </Button>
               </td>
               <td className="flex-center"> 
                  <div className="flex-center">
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
const mapStateToProps = (state: IState) => state.manager
const mapDispatchToProps = {
   ...managerActions
}
export default connect(mapStateToProps, mapDispatchToProps)(ManagerUserRowComponent)