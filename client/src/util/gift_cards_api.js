export async function fetchGiftCards(storeId){
    const response = await fetch(`https://ccatly.wixsite.com/giftcardsite/_functions/allOrders/${storeId}`, {
        method: 'GET',
        mode: 'cors',
    })

    return await response.json(); 
}