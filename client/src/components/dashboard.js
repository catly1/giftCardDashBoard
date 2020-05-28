import React from 'react';
// import './App.css';
import { fetchGiftCards } from '../util/api_gift_cards'

function Dashboard(props) {
    const [giftCards, setGiftCards] = React.useState([]);

    React.useEffect(() => {
        fetchGiftCards().then(items => {
            setGiftCards(items.items)
        })
    })

    const renderGiftCards = () => {
        return (
            <ul>
                {giftCards.map(item => <li>{item.item}</li>)}
            </ul>
        )
    }

    return (
        <div className="Dashboard">
            <header className="Dashboard-header">
                {renderGiftCards()}
            </header>
        </div>
    );
}

export default Dashboard;