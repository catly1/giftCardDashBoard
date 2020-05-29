import React from 'react';
import { fetchGiftCards } from '../util/gift_cards_api'


function Dashboard(props) {
    const [giftCards, setGiftCards] = React.useState([]);
    React.useEffect(() => {
        fetchGiftCards(props.storeID).then(items => {
            console.log(items)
            if (!items.error) setGiftCards(items.items)
        })
    },[])

    const renderGiftCards = () => {
        return (
            <ul>
                {giftCards.map(item => <li key={item._id}>{item.item + " $" + item.initialBalance + " purchased: "  + item._createdDate + " code: " + item.code}</li>)}
            </ul>
        )
    }


    return (
        <div className="Dashboard">
            <header className="Dashboard-header">
                <p>Number of sales: {giftCards ? giftCards.length : 0}</p>
                <label>Recent Transactions:</label>
                {renderGiftCards()}
            </header>
        </div>
    );
}

export default Dashboard;