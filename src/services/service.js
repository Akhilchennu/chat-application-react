const signupAPI = (name, email, password) => {
    return fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    }).then(response => response.json());
}

const loginAPI = (email, password) => {
    return fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, credentials: 'include',
        body: JSON.stringify({
            username: email,
            password: password
        })
    }).then(response => response.json());
}

const getAuth=()=>{
    return fetch('http://localhost:3001/verifyauth', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, credentials: 'include'
    }).then(response => response.json());
}

const logoutAPI=()=>{
    return fetch('http://localhost:3001/logout', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, credentials: 'include'
    }).then(response => response.json()); 
}

const getUserList=()=>{
    return fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, credentials: 'include'
    }).then(response => response.json()); 
}

export const service = {
    signupAPI,
    loginAPI,
    getAuth,
    logoutAPI,
    getUserList
};