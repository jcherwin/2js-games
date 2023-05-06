import React from 'react';
import './HomePage.css';
import games from '../../components/GameList/GameList';

function HomePage() {
  return (
    <main className="HomePage">
      <div className='gameList'>
        <h1>Games</h1>
        {/* Implement logic for creating/joining a game */}
        {games.map((game)=>
            <div className='container'>
              <img className='image' src={game.image} alt={game.altText}></img>
              <div className='overlay'>
                <a className='text' href={game.gameLocation} target="_blank" rel="noreferrer">{game.name}</a>
                
                <a className='text2' href={game.gitHub} target="_blank" rel="noreferrer">
                  {/* <img className='gitImage' src={GitHub_icon} alt='GitHub Icon'/> */}
                </a>
              </div>
            </div>
          )}
      </div>

    </main>
  );
}

export default HomePage;
