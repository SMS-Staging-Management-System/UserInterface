import * as React from 'react';
// import {Table} from 'reactstrap';
import '../../include/bootstrap';
// import ManagerUserRowComponent from './manager-user-row.component';
import ManageUsersTabComponenet from './manage-users-tab.component'


interface IState {
   cChecked: any
}

export class ManagerUsersTableComponent extends React.Component <{},IState>{
   constructor(props){
      super(props);

      this.state = {
         cChecked: []
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
  
   public render(){
      
      // const FAKE_DATA_ASSOCIATE = [
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'fisrtName': "Minasie",
      //       'lastName': 'Hagos',
      //       'role': 'Associate'
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'fisrtName': "Kayle",
      //       'lastName': 'Ford',
      //       'role': 'Associate' 
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'fisrtName': "Jose",
      //       'lastName': 'Periz',
      //       'role': 'Associate' 
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'fisrtName': "Calvin",
      //       'lastName': 'Vo',
      //       'role': 'Associate'
      //    }
      // ]
      
      return(
         <>
            <div>
               <ManageUsersTabComponenet/>
            </div>
            {/* <div>
               <div className="mt-3 col-10">
                  <Table bordered className="table table-sm">
                     <thead className="checkin-table-header">
                        <tr>
                           <th>First Name</th>
                           <th>Last Name</th>
                           <th>User Email</th>
                           <th>User Role</th>
                           <th>Active/Inactive</th>
                        </tr>
                     </thead>
                     <tbody>
                        {FAKE_DATA_ASSOCIATE.map((Data, index) => <ManagerUserRowComponent key={index}/>)}
                     </tbody>
                  </Table>
               </div>
            </div> */}
         </>
      );
   }

}

export default ManagerUsersTableComponent