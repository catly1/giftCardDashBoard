export async function login(user) {
    const response = await fetch(`/api/login`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await response.json();
}

export async function signup(user) {
    const response = await fetch(`/api/signup`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await response.json();
}

export async function auth(){
    const response = await fetch(`/api/auth/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await response.json();
}

export async function logout() {
    const response = await fetch(`/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return await response.json();
}