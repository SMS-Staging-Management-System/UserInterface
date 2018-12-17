import * as React from 'react';


export default function ManagerCheckinFilterComponent() {
  return (

    <>
      <div className="form-group">
        <select className="form-control" id="sel1">
          <option>All</option>
          <option>Cohort 2</option>
          <option>Cohort 3</option>
          <option>Cohort 4</option>
        </select>
      </div>
    </>


    // <UncontrolledDropdown>
    //   <DropdownToggle caret className="selected-cohort">
    //     Cohort 1
    //   </DropdownToggle>
    //   <DropdownMenu>
    //     <DropdownItem className="cohort-option">Cohort 1</DropdownItem>
    //     <DropdownItem classNameN="cohort-option">Cohort 2</DropdownItem>
    //     <DropdownItem className="cohort-option">Cohort 3</DropdownItem>
    //   </DropdownMenu>
    // </UncontrolledDropdown>
  );
}