import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import MoreHorizontal from "feather-icons-react/build/IconComponents/MoreHorizontal";

function ViewMenu({handleSidebarToggle}) {
  return (
    <Dropdown className="view-menu-dropdown">
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        <MoreHorizontal />
      </Dropdown.Toggle>

      <Dropdown.Menu className="view-menu-option">
        <Dropdown.Item data-name="participants" onClick={handleSidebarToggle}>Rename</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ViewMenu;
