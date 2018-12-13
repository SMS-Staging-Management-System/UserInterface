import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {FormGroup, Input, Label} from 'reactstrap';
import {Row, Col, Table} from 'reactstrap';


/*
* The New Cohort Create
*/
export interface IProps {
  modal: boolean
  toggle: (name:string) => void
  modalOff: () => void
}

interface IState {
  fileReader: any
  fileContent: any
  displayTable: boolean
}
export class CreateNewModalComponent extends React.Component<IProps,IState> {
  
  constructor(props){
    super(props);

    this.state = {
        displayTable: false,
        fileContent:[],
        fileReader: {
      }
      
    }

    this.handleChange = this.handleChange.bind(this);

  }
  public handleFileRead = (e) => {
    const content = this.state.fileReader.result;
    const newContent = content.split("\n");
    const userArray = [];
    
    newContent.forEach((element) => {

      const newElement = element.split(',');
      
      const userObj = {
        email: newElement[2],
        firstname: newElement[0],
        lastName: newElement[1], 
      }

      userArray.push(userObj);

    });

    this.setState({
      ...this.state,
      displayTable: true,
      fileContent: userArray,
      
    })
  }

  public handleChange = (selectorFiles:FileList)=>{
    const fileReader1 = new FileReader();
    fileReader1.onload = this.handleFileRead;
    this.setState({
      ...this.state,
      fileReader: fileReader1
    });
    fileReader1.readAsText(selectorFiles[0]);
  } 

  public tableDrawer = () => {
   
    const mapContent = this.state.fileContent.map((user, index) => {
      return(
        <tr key={index}>
        {/* <th scope="row">{index}</th> */}
        <td>{user.firstname}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
      </tr>
      )
    })

    return mapContent;
  }
  

  public render() {

    const renderTable = this.tableDrawer();

    return (
      
      <>
        <div>
        <Modal isOpen={this.props.modal} className="manager-comments">
          <ModalHeader>Create New Cohort</ModalHeader>
          <ModalBody className="">
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Cohort Name</Label>
                  <Input type="email" name="email" id="exampleEmail" placeholder="Name" />
                </FormGroup>
              </Col>
            </Row>
            <div className="upload-btn-wrapper">
              <button className="btn-cohort"> Upload File</button>
              <input type="file" onChange={(e) => this.handleChange(e.target.files)} />
              <div>
               <small> .csv files only</small>
              </div>
             
            </div>
            <div className="mt-3">
              <Table bordered className="table table-sm">
                <thead className="checkin-table-header">
                  <tr>
                    {/* <th>#</th> */}
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
               
                {this.state.displayTable && 
                  <tbody>
                    {renderTable}
                  </tbody>
                }
              </Table>
            </div> 
          </ModalBody>
          <ModalFooter className="flex-btw">
            <Button className="rev-btn " onClick={this.props.modalOff}>Submit</Button>
            <Button className=""color="secondary" onClick={this.props.modalOff}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div> 
      </>

    );
  }
}

export default CreateNewModalComponent