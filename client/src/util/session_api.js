export async function login(user) {
    const response = await fetch(`http://localhost:8080/api/login`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await response.json();
}

export async function signup(user) {
    const response = await fetch(`http://localhost:8080/api/signup`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await response.json();
}