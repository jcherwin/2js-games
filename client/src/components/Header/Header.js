import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Header, H3} from "./HeaderElements";
// import User from '';



function BasicExample() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}



const HeaderComponent = () => {
return (
	<>
	<Header>
		<div>{BasicExample()}</div>
		{/* TEMP */}
		<H3>Solomon Vana</H3>
		{/* <H3>{User.name}</H3> */}
	</Header>
	</>
);
};

export default HeaderComponent;
