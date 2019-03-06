import * as React from 'react';

export interface PageNavigatorProps {
    maxPage : number,
    currentPage : number
}
 
export interface PageNavigatorState {
    
}
 
class PageNavigator extends React.Component<PageNavigatorProps, PageNavigatorState> {
    constructor(props: PageNavigatorProps) {
        super(props);
    }
    render() { 
        return ( 
            <> </> 
        );
    }
}
 
export default PageNavigator;