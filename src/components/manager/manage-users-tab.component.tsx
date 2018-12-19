import * as React from 'react';
import {Table} from 'reactstrap';
import ManagerUserRowComponent from '../manager/manager-user-row.component'
import ManagerUserRowAdminComponent from '../manager/manger-user-row-admin.component';
import { connect } from 'react-redux';
import { IState } from 'src/reducers';
import { IUser } from 'src/model/User.model';


interface IComponentState {
   roleSelected: any
}

interface IComponentProps {
   roles: any
   user: IUser
   admins: any[]
   trainers: any[]
   stagings: any[]
   associates: any[]
}

export class ManageUsersTabComponenet extends React.Component <IComponentProps, IComponentState> {
   
   constructor(props){
      super(props);

      this.state={
         roleSelected: 'ADMIN'
      }
   }

   public handleTabClickAssoc = ()=>{
      this.setState({
         roleSelected: 'ASSOCIATE'
         
       });
   }
   public handleTabClickAdmin = ()=>{
      this.setState({
        
         roleSelected: 'ADMIN'
         
       });
   }
   public handleTabClickStage = ()=>{
      this.setState({
         roleSelected: 'STAGING_MANAGER'
         
       });
   }
   public handleTabClickTrainer = ()=>{
      this.setState({
         roleSelected: 'TRAINER'
         
       });
   }

   public renderTableHead = () => {
      
      if(this.state.roleSelected === 'ADMIN'){
         return(
         <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Email</th>
         </tr>
         )
      } else {
         return(
            <tr>
               <th>First Name</th>
               <th>Last Name</th>
               <th>User Email</th>
               <th>User Role</th>
               <th>Active/Inactive</th>
            </tr>
            )
      }
   }

   public renderTabTable = () =>{
      // this.props.trainerList
      // const isAdmin = this.props.roles.includes("admin");
      
      // const FAKE_DATA_ASSOCIATE = [
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Minasie",
      //       'lastName': 'Hagos',
      //       'role': 'Associate'
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Kayle",
      //       'lastName': 'Ford',
      //       'role': 'Associate' 
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Jose",
      //       'lastName': 'Periz',
      //       'role': 'Associate' 
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Calvin",
      //       'lastName': 'Vo',
      //       'role': 'Associate'
      //    }
      // ]

      // const FAKE_DATA_STAGE_MAN = [
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Kurisu",
      //       'lastName': 'Hagos',
      //       'role': 'Associate'
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Kayle",
      //       'lastName': 'Ford',
      //       'role': 'Associate' 
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Jose",
      //       'lastName': 'Periz',
      //       'role': 'Associate' 
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Calvin",
      //       'lastName': 'Vo',
      //       'role': 'Associate'
      //    }
      // ]

      // const FAKE_DATA_TRAINER = [
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Minasie",
      //       'lastName': 'Hagos',
      //       'role': 'Associate'
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Kayle",
      //       'lastName': 'Ford',
      //       'role': 'Associate' 
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Jose",
      //       'lastName': 'Periz',
      //       'role': 'Associate' 
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Calvin",
      //       'lastName': 'Vo',
      //       'role': 'Associate'
      //    }
      // ]

      // const FAKE_DATA_ADMIN= [
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Minasie",
      //       'lastName': 'Hagos',
      //       'role': 'Associate'
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Kayle",
      //       'lastName': 'Ford',
      //       'role': 'Associate' 
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Jose",
      //       'lastName': 'Periz',
      //       'role': 'Associate' 
      //    },
      //    {
      //       'email': 'revatureEmp@revature.com',
      //       'firstName': "Calvin",
      //       'lastName': 'Vo',
      //       'role': 'Associate'
      //    }
      // ]
      

      if(this.state.roleSelected ==='ADMIN'){
         return <> {this.props.admins.map((Data, index) => <ManagerUserRowAdminComponent Data={Data} key={index}/>)} </>
      }else if(this.state.roleSelected === 'ASSOCIATE') {
         return <> {this.props.associates.map((Data, index) => <ManagerUserRowComponent  Data={Data} key={index}/>)} </>
      }else if(this.state.roleSelected === 'STAGING_MANAGER') {
         return <> {this.props.stagings.map((Data, index) => <ManagerUserRowComponent  Data={Data} key={index}/>)} </>
      }else if(this.state.roleSelected === 'TRAINER') {
         return <> {this.props.trainers.map((Data, index) => <ManagerUserRowComponent  Data={Data} key={index}/>)} </>
      } else{
         return (
            <></>
         ) 
      }  
   }

   public render(){
      
      const renderTableDiv =  this.renderTabTable();
      const renderTableHeaderDiv =  this.renderTableHead();
      return (
         <>
            <nav>
               <div className="nav nav-tabs manager-container mt-2" id="nav-tab" role="tablist">
                  <a className="nav-item nav-link active nav-t" id="nav-contact-tab" data-toggle="tab" href="#admin-role" role="tab" aria-controls="check-in" aria-selected="true" aria-hidden="false"
                  onClick={this.handleTabClickAdmin}>Admin</a>
                  <a className="nav-item nav-link nav-t" id="nav-profile-tab" data-toggle="tab" href="#staging-man-role" role="tab" aria-controls="nav-profile" aria-selected="false"
                   onClick={this.handleTabClickStage}>Staging Manager</a>
                  <a className="nav-item nav-link nav-t" id="nav-manage-users-tab" data-toggle="tab" href="#traniner-role" role="tab" aria-controls="nav-manage-users" aria-selected="false"
                   onClick={this.handleTabClickTrainer}>Trainer</a>
                  <a className="nav-item nav-link nav-t" id="nav-manage-users-tab" data-toggle="tab" href="#associate-role" role="tab" aria-controls="nav-manage-users" aria-selected="false"
                   onClick={this.handleTabClickAssoc}>Associate</a>
               </div>
            </nav>
            <div>
               <div className="mt-3 col-10">
                  <Table bordered className="table table-sm">
                     <thead className="checkin-table-header">
                        {renderTableHeaderDiv}
                     </thead>
                     <tbody>
                        {renderTableDiv}
                     </tbody>
                  </Table>
               </div>
            </div>
         </>
      );
   }
}

const mapStateToProps = (state: IState) => state.user
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersTabComponenet)