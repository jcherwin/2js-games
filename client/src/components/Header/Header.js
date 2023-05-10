import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import { Header, Right, Img, Left, ModalStyle, AccountBtn } from "./HeaderElements";
import { Link } from "react-router-dom";
import Logo from '../../assets/images/logo_2js_v2.png';
import { ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';

// import User from '';

function DropdownElement() {

    const Records = () => {
        console.log('clicked one');
        const [modalOpen, setModalOpen] = useState(false);

        return (
            <div className="App">
                <ModalStyle onClick={setModalOpen}>Open Modal</ModalStyle>
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
            <Link to="/login" style={{ textDecoration: 'none' }}>
                <ModalStyle>
                    Sign Out
                </ModalStyle>
            </Link>
        );
    }

    return (
        <Dropdown
            trigger={<AccountBtn >Account</AccountBtn>}

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
    const { loading, error, data } = useQuery(ME);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <>
        <Header>
          <Left>{DropdownElement()}</Left>
          {/* TEMP */}
          <Img src={Logo} alt="2JS logo" />
          {/* <Right>Solomon Vana</Right> */}
          <Right>{data.me.username}</Right>
        </Header>
      </>
    );
  };
  

export default HeaderComponent;
