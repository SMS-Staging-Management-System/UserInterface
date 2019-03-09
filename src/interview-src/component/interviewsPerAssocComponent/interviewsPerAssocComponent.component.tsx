import React from 'react';
import { interviewClient } from '../../../axios/sms-clients/interview-client';

export interface InterviewPerAssocProps {
    assocInterviewArr: InterviewPAssoc[],
}
 
export interface InterviewPerAssocState {
    assocInterviewArr
}

export interface InterviewPAssoc {
    associateId:number,
    interviewCount:number,
    AssociateName:String
}
 
export class InterviewPerAssoc extends React.Component<any, any> {
    constructor(props: InterviewPerAssocProps) {
        super(props);
        this.state = {
            assocInterviewArr: [
                { associateId: 2001, interviewCount: -1, AssociateName: 'Aaron Anderson' },
                { associateId: 2002, interviewCount: -1, AssociateName: 'Betty Bronte' },
                { associateId: 2003, interviewCount: -1, AssociateName: 'Charles Cromwell' },
                { associateId: 2004, interviewCount: -1, AssociateName: 'Delta Dawn' },
              ]
        };
    }

    componentDidMount(){
        this.fetchDbInfo(0);
    }

    async fetchDbInfo(pageNumber:number){
        const pageSize = 3;
        this.setState({
            ...this.state
          },
          async () => {
              try {
                  const res = await interviewClient.interviewPerAssoc(pageNumber, pageSize);
                  console.log(res.data.content);
                  this.setState({
                    assocInterviewArr: res.data.content
                  });
              } catch (err) {
                  console.log(err);
              }
          }
        );
    }

    render() { 
        const assocInterviewRows = this.state.assocInterviewArr.map((Assoc) => {
            return (
                <tr>
                    <td>{Assoc.AssociateName}</td>
                    <td>{Assoc.interviewCount}</td>
                </tr>
            );
        });

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Associate</th>
                            <th>Interviews</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assocInterviewRows}
                    </tbody>
                </table>
            </div>
        );
    }
}