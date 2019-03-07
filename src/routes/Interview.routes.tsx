import React from 'react'
import { Switch, Route } from 'react-router';
import InterviewList from '../interview-src/component/InterviewList/InterviewList';

export class InterviewRoutes extends React.Component<any, any> {
    constructor(props){
        super(props)
    }

    render() {
        //let {path} = this.props.match//get the path from url
        //put path in front of any sub paths
        let {path} =this.props.match
        return (
            <Switch>
                <Route path={`${path}/list`} component={InterviewList} />
            </Switch>
        )
    }
}