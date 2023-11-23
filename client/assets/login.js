document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: form.get('username'),
      password: form.get('password')
    })
  };

  const response = await fetch('http://localhost:3000/users/login', options);
  const data = await response.json();

  if (response.status === 200) {
    //if token is provided we send it to local storage
    localStorage.setItem('token', data.token); // we compare if token exist in our browser localStorage -its a web api
    window.location.assign('board.html'); //redirect to post page
  } else {
    alert(data.error);
  }
});
