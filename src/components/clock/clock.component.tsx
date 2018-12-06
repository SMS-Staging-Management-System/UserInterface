import * as React from 'react';
import time from '../../include/time';

export class Clock extends React.Component {

    constructor(props) {
        super(props);
    }

    public getTime = () => {
        const d: number = Date.now();
        return <p>{time(d)}</p>;
    }

    public render() {
        return (
            <div id="headerField">{this.getTime()}</div>
            
        )
    }
}