import React from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchGiftCards} from './utils/api_gift_cards'

function handleGiftCards(){
  fetchGiftCards().then(items =>{
    let list = items.items
    console.log(list)
    return <ul>
      {list.forEach(item => {
        return <li>{item.item}</li>
      })}
    </ul>

  })
}

function App(props) {
  const [giftCards, setGiftCards] = React.useState([]);

  React.useEffect(()=>{
    fetchGiftCards().then(items => {
      setGiftCards(items.items)
  })})

  const renderGiftCards = () => {
    return(
      <ul>
        {giftCards.map(item => <li>{item.item}</li>)}
      </ul>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        {renderGiftCards()}
      </header>
    </div>
  );
}

export default App;
