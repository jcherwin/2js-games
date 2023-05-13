import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import Auth from "../../utils/auth";

import { Header, Right, Img, Left, ModalStyle, AccountBtn } from "./HeaderElements";
import GameStats from '../GameStats/GameStats';
import Logo from '../../assets/images/logo_2js_v2.png';

// import User from '';

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "var(--green2)",
        width: 400,
    },
};

function DropdownElement() {

    const Records = () => {
        //console.log('clicked one');
        const [modalOpen, setModalOpen] = useState(false);

        return (
            <div className="App">
                <ModalStyle onClick={setModalOpen}>
                    Records
                </ModalStyle>
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    style={customStyles}>
                    <GameStats />

                    <button onClick={() => setModalOpen(false)}
                        style={{ backgroundColor: 'var(--fawn)' }}>Close Modal</button>
                </Modal>
            </div>
        );
    }

    const SignOut = () => {
        //console.log('clicked two');

        return (
            <Link to="/" style={{ textDecoration: 'none' }} onClick={() => Auth.logout()}>
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

                            })}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

const HeaderComponent = () => {
    const { loading, data } = useQuery(ME);

    return (
        <>
            <Header>
                <Left>{DropdownElement()}</Left>
                {/* TEMP */}
                <Link to="/home">
                    <Img src={Logo} alt="2JS logo" />
                </Link>
                {/* <Right>Solomon Vana</Right> */}
                <Right>{loading ? (
                    <p>Loading...</p>
                    ) : (data.me.username)}</Right>
            </Header>
        </>
    );
};

export default HeaderComponent;
