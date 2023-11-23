console.log("Loaded!")

// we are deleting token from the storage
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.assign('./index.html')
})
