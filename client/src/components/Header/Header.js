import React from "react";
import { useState } from "react";
// import Dropdown from 'react-bootstrap/Dropdown';
import Modal from "react-modal";
import { Header, H3} from "./HeaderElements";
// import User from '';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 400,
  },
};

// define model
const ModalTest = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <button onClick={setModalOpen}>Open Modal</button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
      >
        <div>Login/Signup</div>

        <button onClick={() => setModalOpen(false)}>Close Modal</button>
      </Modal>
    </div>
  );
}


function DropdownElement() {

  const HandleMenuOne = () => {
    console.log('clicked one');
    // ModalTest();
  };

  const HandleMenuTwo = () => {
    console.log('clicked two');
    const [modalOpen, setModalOpen] = useState(false);

    return (
      <div className="App">
        <button onClick={setModalOpen}>Open Modal</button>
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          style={customStyles}
        >
          <div>Login/Signup</div>
  
          <button onClick={() => setModalOpen(false)}>Close Modal</button>
        </Modal>
      </div>
    );
  };

  return (
    <Dropdown
      trigger={<button style={{color: "var(--green1)", backgroundColor: "var(--fawn)"}}>Account</button>}
      menu={[
        // ModalTest(),
        <button onClick={HandleMenuOne}>Records</button>,
        <button onClick={HandleMenuTwo}>Sign Out</button>,
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
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
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
    {/* <div>{ModalTest()}</div> */}
		{/* TEMP */}
		<H3>Solomon Vana</H3>
		{/* <H3>{User.name}</H3> */}
	</Header>
	</>
);
};

export default HeaderComponent;
