import React from 'react';

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

    fetchDbInfo(pageNumber:number){
        //TODO: pull from DB based on page
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
                        <th>Associate</th>
                        <th>Interviews</th>
                    </thead>
                    <tbody>
                        {assocInterviewRows}
                    </tbody>
                </table>
            </div>
        );
    }
}