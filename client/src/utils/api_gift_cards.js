export async function fetchGiftCards(){
    const response = await fetch(`https://ccatly.wixsite.com/giftcardsite/_functions/allOrders/`, {
        method: 'GET',
        mode: 'cors',
    })

    return await response.json(); 
}