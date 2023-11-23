const createEntryElement = (data) => {
  const entry = document.createElement('div');
  entry.classList.add('container');
  entry.id = 'entry';

  const headerContainer = document.createElement('div');
  headerContainer.style.display = 'flex';
  headerContainer.style.justifyContent = 'space-between';
  headerContainer.style.alignItems = 'center';
  headerContainer.className = 'header';
  entry.appendChild(headerContainer);

  const header = document.createElement('h2');
  header.textContent = data['title'];
  headerContainer.appendChild(header);

  const deleteBtn = document.createElement('button');
  deleteBtn.id = 'delete';
  deleteBtn.style.backgroundColor = '#EA3B2E';
  deleteBtn.innerHTML =
    '<svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:var(--geist-foreground);width:24px;height:24px"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>';

  deleteBtn.addEventListener('click', async () => {
    const options = {
      headers: {
        Authorization: localStorage.getItem('token')
      },
      method: 'DELETE'
    };

    const response = await fetch(
      `http://localhost:3000/entries/${data['id']}`,
      options
    );

    if (response.status === 204) {
      window.location.reload();
    } else {
      const respData = await response.json();
      alert(respData.error);
    }
  });

  headerContainer.appendChild(deleteBtn);

  const content = document.createElement('p');
  content.textContent = data['content'];
  content.style.paddingRight = '40px';
  entry.appendChild(content);

  const date = document.createElement('p');
  date.textContent = moment(data['date']).fromNow();
  date.style.fontWeight = 'bold';
  entry.appendChild(date);

  return entry;
};

document.getElementById('entry-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const options = {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token'),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: form.get('title'),
      content: form.get('content')
    })
  };

  const response = await fetch('http://localhost:3000/entries', options);
  const data = await response.json();

  if (response.status === 201) {
    window.location.reload();
  } else {
    alert(data.error);
  }
});

const loadEntries = async () => {
  const options = {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  };
  const response = await fetch('http://localhost:3000/entries', options);

  if (response.status === 200) {
    const entries = await response.json();

    const container = document.getElementById('entries');

    entries.forEach((p) => {
      const elem = createEntryElement(p);
      container.appendChild(elem);
    });
  } else {
    window.location.assign('./index.html');
  }
};

document.getElementById('logout').addEventListener('click', async () => {
  const options = {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  };
  const response = await fetch('http://localhost:3000/users/logout', options);
  const data = await response.json();

  if (response.status === 200) {
    localStorage.removeItem('token');
    window.location.assign('./index.html');
  } else {
    alert(data.error);
  }
});

loadEntries();
