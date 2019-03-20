import React, { Component } from 'react';
// import { IAssociateInput } from '../../model/Associateinput.model';
import { Link } from 'react-router-dom';
import { IState } from '../../reducers';
import { connect } from 'react-redux';

interface IProps {
    data: any
}

export class ViewAssociateInput extends Component<IProps, any> {
    constructor(props: any) {
        super(props);
    }

    renderDate = (date: number) => {
        if (date > 0) {
            return new Date(date).toDateString()
        } else {
            return '-';
        }
    }

    render() {
        const { data } = this.props;
        console.log(data);
        return (
            <div>
                <dl>
                    <dt>When did you recieve a notification?</dt>
                    <dd>{this.renderDate(data.receivedNotifications)}</dd>
                    <dt>Were you provided a job description?</dt>
                    <dd>{data.descriptionProvided ? 'True' : 'False'}</dd>
                    <dt>What was the proposed interview format?</dt>
                    <dd>{(data.proposedFormat ? data.proposedFormat.formatDesc : '')}</dd>
                    <dt>What was the actual interview format?</dt>
                    <dd>{(data.interviewFormat ? data.interviewFormat.formatDesc : '')}</dd>
                </dl>
                <Link to='/interview/list'>BACK</Link>
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        data: state.interviewState.interviewList.assocInput
    };
};

export default connect(mapStateToProps)(ViewAssociateInput);
