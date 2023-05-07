import React from 'react';
import './HomePage.css';
import games from '../../components/GameList/GameList';
import HeaderComponent from '../../components/Header/Header';
import { Main, Container,} from './HomePageElements';
// import Navbar from '../../components/Navbar/Navbar';

function HomePage() {
  return (
    <Main className="HomePage">
      <HeaderComponent/>
      <div className='gameList'>
        <h1>Games</h1>
        {/* Implement logic for creating/joining a game */}
        {games.map((game)=>
            <Container className='container'>
              <img className='image' src={game.image} alt={game.altText}></img>
              <div className='overlay'>
                <a className='text' href={game.gameLocation} target="_blank" rel="noreferrer">{game.name}</a>
                
                <a className='text2' href={game.gitHub} target="_blank" rel="noreferrer">
                  {/* <img className='gitImage' src={GitHub_icon} alt='GitHub Icon'/> */}
                </a>
              </div>
            </Container>
          )}
      </div>

    </Main>
  );
}

export default HomePage;
