import React from 'react';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import Table from 'reactstrap/lib/Table';
import { connect } from 'react-redux';
import { IInterviewState } from '../../reducers';

export interface InterviewListProps {
    listOfInterviews : any[]
}
 
export interface InterviewListState {
    
}
 
class InterviewList extends React.Component<InterviewListProps, InterviewListState> {
    constructor(props: InterviewListProps) {
        super(props);
    }

    renderListOfInterviews = () => {
        if(this.props.listOfInterviews[0]){
            const result = this.props.listOfInterviews.map(() => {
                <tr>
                    <td></td>
                </tr>
            })

            return result;
        } else {
            return <p></p>
        }
    }

    render() { 
        return ( 
            <Jumbotron>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                {this.renderListOfInterviews()}
                </Table>
            </Jumbotron>
         );
    }
}

const mapStateToProps = (state: IInterviewState) => {
    return {

    }
}
 
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewList);