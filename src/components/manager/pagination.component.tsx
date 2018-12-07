import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {FAKE_CHECK_IN_DATA} from '../../include/fake';

class Paginate extends React.Component{

  public render() {
    return (
      <>
      {/* Conditionally render pagination numbers by every five associates */}
        <Pagination aria-label="Page navigation example">
           <PaginationItem>
             <PaginationLink previous href="#" />
           </PaginationItem>
        {FAKE_CHECK_IN_DATA.map((data,index)=> 
        index % 5 === 0 && index > 0 &&
            <PaginationItem key={index}>
              <PaginationLink href="#" >
              {index / 5}
              </PaginationLink>
            </PaginationItem>
            )}
          </Pagination>
      </>
    );
  }
}

export default Paginate