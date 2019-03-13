import React, { PureComponent } from 'react';

import AssociateInput from '../associate-input/associate-inputs.component';

export class Testing extends PureComponent<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <AssociateInput />
        );
    }
}