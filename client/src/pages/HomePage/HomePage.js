import React from 'react';
import './HomePage.css';
import games from '../../components/GameList/GameList';
import HeaderComponent from '../../components/Header/Header';
import { Main, Container, Div, Div1,FullContainer } from './HomePageElements';
// import Navbar from '../../components/Navbar/Navbar';

function HomePage() {

  return (
    <Main className="HomePage">
      <HeaderComponent />
      <Div1>
        <h1>Games</h1>
        <Div className='gameList'>
          {/* <h1>Games</h1> */}
          {/* Implement logic for creating/joining a game */}
          {games.map((game) =>

            <FullContainer>
              
              <Container className='container'>
                <a className='text' href={game.gameLocation}>
                  <img className='image' src={game.image} alt={game.altText}/>
                </a>
              </Container>
              {game.name}
            </FullContainer>
          )}
        </Div>
      </Div1>
    </Main>
  );
}

export default HomePage;
