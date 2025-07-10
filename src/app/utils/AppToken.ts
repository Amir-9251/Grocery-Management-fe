const getToken = () => {
    return localStorage.getItem('VITE_APP_TOKEN');
}

const removeToken = () => {
    localStorage.removeItem('VITE_APP_TOKEN');
    window.location.reload();
}

const setToken = (token: string) => {
    localStorage.setItem('VITE_APP_TOKEN', token);
}

export { getToken, removeToken, setToken };