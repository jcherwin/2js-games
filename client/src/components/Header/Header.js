import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import { Header, H3} from "./HeaderElements";
import {Link} from "react-router-dom";
// import User from '';

function DropdownElement() {

  const Records = () => {
    console.log('clicked one');
    const [modalOpen, setModalOpen] = useState(false);
  
    return (
      <div className="App">
        <div onClick={setModalOpen}>Open Modal</div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          // style={customStyles}
        >
          <div>Login/Signup</div>
  
          <button onClick={() => setModalOpen(false)}>Close Modal</button>
        </Modal>
      </div>
    );
  }

  const SignOut = () => {
    console.log('clicked two');
  
    return (
      <div>
        <Link to="/login">Sign Out</Link>
    </div>
    );
  }

  return (
    <Dropdown
      trigger={<button style={{color: "var(--green1)", backgroundColor: "var(--fawn)"}}>Account</button>}
      
      menu={[
        Records(),
        SignOut(),
      ]}
    />
  );
};

const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown" >
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {React.cloneElement(menuItem, {
                // onClick: () => {
                //   menuItem.props.onClick();
                //   setOpen(false);
                // },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};



const HeaderComponent = () => {
return (
	<>
	<Header>
		<div>{DropdownElement()}</div>
		{/* TEMP */}
		<H3>Solomon Vana</H3>
		{/* <H3>{User.name}</H3> */}
	</Header>
	</>
);
};

export default HeaderComponent;
