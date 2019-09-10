import React, { Component } from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';


interface ISortImageProps {
    colOneSortImage?: string;
    colTwoSortImage?: string;
    colThreeSortImage?: string;
}

export default class SortImage extends Component<ISortImageProps> {


    updateDefault = () => {
        const one = this.props.colOneSortImage;
        const two = this.props.colTwoSortImage;
        const three = this.props.colThreeSortImage;
        if(one === 'sort' || two === 'sort' || three === 'sort') {
            return 'd-inline';
        } else {
            return 'd-none';
        }
    }

    updateUp = () => {
        const one = this.props.colOneSortImage;
        const two = this.props.colTwoSortImage;
        const three = this.props.colThreeSortImage;
        if(one === 'sort-up' || two === 'sort-up' || three === 'sort-up') {
            return 'd-inline';
        } else {
            return 'd-none';
        }
    }

    updateDown = () => {
        const one = this.props.colOneSortImage;
        const two = this.props.colTwoSortImage;
        const three = this.props.colThreeSortImage;
        if(one === 'sort-down' || two === 'sort-down' || three === 'sort-down') {
            return 'd-inline';
        } else {
            return 'd-none';
        }
    }

    render() {
        return (
            <div>
                <div className={this.updateDefault()}><FaSort/></div>
                <div className={this.updateUp()}><FaSortUp/></div>
                <div className={this.updateDown()}><FaSortDown/></div>
            </div>
        )
    }
}
