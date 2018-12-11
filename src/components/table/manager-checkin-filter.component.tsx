import * as React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function ManagerCheckinFilterComponent () {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>
        Data Filter
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Filter Check-ins </DropdownItem>
        <DropdownItem>On-time</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Late</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}