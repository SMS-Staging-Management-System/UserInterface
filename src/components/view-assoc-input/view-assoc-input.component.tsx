import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import Button from "reactstrap/lib/Button";

interface IProps {
  data: any
}

interface IViewState {
    redirect: boolean;
}

class ViewAssociateInput extends Component<IProps, IViewState> {
    constructor(props: any) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    setRedirect = (value: boolean) => {
        this.setState({
            redirect: value
        });
    };

    renderDate = (date: number) => {
        if (date > 0) {
            return new Date(date).toDateString()
        } else {
            return '-';
        }
    }
  }

    renderItem = (question: string, answer: string) => {
        return (
            <div style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '5px',
                marginBottom: '1rem'
            }} className='assoc-input-item'>
                <p style={{ margin: '0' }}><strong>{question}</strong></p>
                <p style={{ margin: '0' }}>{answer}</p>
            </div>
        );
    };

    render() {
        const { data } = this.props;
        console.log(data);
        if(!data || this.state.redirect) { 
            this.setRedirect(false);
            return(
                <Redirect to='/interview/list' />
            );
        }
        return (
            <div style={{
                padding: '1rem',
                backgroundColor: 'rgb(255,194,137)'
            }}>
                <h3 style={{textAlign: 'center'}}>Associate Input</h3>
                <hr/>

                {this.renderItem('When did you recieve a notification?', this.renderDate(data.receivedNotifications))}
                {this.renderItem('Were you provided a job description?', (data.descriptionProvided ? 'Yes' : 'No'))}
                {this.renderItem('What was the proposed interview format?', (data.proposedFormat ? data.proposedFormat.formatDesc : ''))}
                {this.renderItem('What was the actual interview format?', (data.interviewFormat ? data.interviewFormat.formatDesc : ''))}

                <Button color="secondary" size="lg" block onClick={(e) => {
                    this.setRedirect(true);
                }}>Back</Button>
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