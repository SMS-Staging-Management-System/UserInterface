import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

interface MyProps{
    selfDestruct: any,
    index?: number
}

export class DeleteButton extends React.Component<MyProps, any>{
    constructor(props){
        super(props);
        this.clicking = this.clicking.bind(this);
    }
    clicking = () => {
        this.props.selfDestruct(this.props.index);
    }
    render(){
        return (
            <div onClick={this.clicking.bind(this)} className="trashCan">
                <FaTrashAlt />
            </div>
        );
    }
}