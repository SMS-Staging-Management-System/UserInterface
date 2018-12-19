import * as React from 'react';
import {Table} from 'reactstrap';
import ManagerUserRowComponent from '../manager/manager-user-row.component'
import ManagerUserRowAdminComponent from '../manager/manger-user-row-admin.component';
import { connect } from 'react-redux';
import { IState } from 'src/reducers';
// import { IUser } from 'src/model/User.model';
import {Button, FormGroup, Input, Label, Col, Row} from 'reactstrap';
import * as managerActions from '../../actions/manager/manager.actions';


interface IComponentState {
   email: string
   isCheckedAssociate: any
   isCheckedStageMan: any
   isCheckedTrainer: any
   roleSelected: any
}

interface IComponentProps {
   roles: any
   admins: any[]
   trainers: any[]
   stagings: any[]
   associates: any[]
}

export class ManageUsersTabComponenet extends React.Component <IComponentProps, IComponentState> {
   
   constructor(props){
      super(props);

      this.state={
         email: '',
         isCheckedAssociate: false,
         isCheckedStageMan: false,
         isCheckedTrainer: false,
         roleSelected: 'ADMIN'
      }
   }

   public handleSubmit = () => {
      console.log("whoo 2")
      console.log("ok")
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
   public handleRoleCheckboxAssoc = (e: any) =>{
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      this.setState({
         isCheckedAssociate: value
      });
   }

   public handleEmailChange = (e: any) => {
      this.setState({
         email: e.target.value
      })
   }

   public handleRoleCheckboxTrain = (e: any) =>{
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      this.setState({
         isCheckedTrainer: value
      });
   }
   public handleRoleCheckboxStageMan = (e: any) =>{
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;

      this.setState({
         isCheckedStageMan: value
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
            <div className="modal"  id="add-user-modal"role="dialog">
               <div className="modal-dialog" role="document">
                  <div className="modal-content">
                     <div className="modal-header">
                     <h3 className="modal-title">Add Role to User</h3>
                     <Button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </Button>
                     </div>
                     <div className="modal-body">
                        <FormGroup>
                           <Row>
                              <Col xs={2}> 
                                 <Label > Email </Label> 
                              </Col>
                              <Col xs={10}> 
                                 <Input onChange={this.handleEmailChange} type="email"> </Input>
                              </Col>
                           </Row>
                        </FormGroup>
                        <Row>
                           <Col xs={2}>
                              <Label> Role</Label>
                           </Col>
                           <Col xs={10}>
                              <FormGroup check>
                                 <Label check>
                                    <Input type="checkbox"
                                       name="isCheckedTrainer"
                                       checked = {this.state.isCheckedTrainer}
                                       onChange = {this.handleRoleCheckboxTrain}
                                    /> Trainer
                                 </Label>
                              </FormGroup>
                              <FormGroup check>
                                 <Label check>
                                    <Input type="checkbox"
                                    name="isCheckedStageMan"
                                    checked = {this.state.isCheckedStageMan}
                                    onChange = {this.handleRoleCheckboxStageMan}/> Staging Manager
                                 </Label>
                              </FormGroup>
                              <FormGroup check>
                                 <Label check>
                                    <Input type="checkbox"
                                    name="isCheckedAssociate"
                                    checked = {this.state.isCheckedAssociate}
                                    onChange = {this.handleRoleCheckboxAssoc}/> Associate
                                 </Label>
                              </FormGroup>
                           </Col>
                        </Row>
                     </div>
                     <div className="modal-footer">
                        <Button onClick={this.handleSubmit} type="button" color="success">Submit</Button>
                     {/* <Button type="button" color = "danger"data-dismiss="modal">Close</Button> */}
                     </div>
                  </div>
               </div>
            </div>
            <div className="mt-2">
               <Button className="flex-align" color="danger" data-toggle="modal" data-target="#add-user-modal"> Add + </Button>
            </div>
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

const mapStateToProps = (state: IState) => state.manager
const mapDispatchToProps = {
   ...managerActions
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersTabComponenet)