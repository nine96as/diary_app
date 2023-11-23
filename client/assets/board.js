function createPostElement (data) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const post = document.createElement("div");
    post.className = "post";

    const header = document.createElement("h2");
    header.textContent = data["title"];
    post.appendChild(header);

    const content = document.createElement("p");
    content.textContent = data["content"];
    post.appendChild(content);

    // datetime
    console.log("datetime-element=", data["datetime"])
    const datetime = document.createElement("p");
    datetime.textContent = `Created At: ${formattedDate}`;
    post.appendChild(datetime);

    //  // Create a span to hold the datetime in the post-form
    //      const createdAtSpan = document.getElementById("created-at");
    //     createdAtSpan.textContent = `Created At: ${data["datetime"]}`;

    return post;
}

document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    //adding a date time
    const form = new FormData(e.target);
    // const currentDate = new Date();
    // const formattedDate = currentDate.toLocaleString();

    // Set the date and time in the form
    // form.set("datetime", formattedDate);
    
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: form.get("title"),
            content: form.get("content"),
            // datetime: form.get("datetime")
            //datetime: formattedDate
        })
    }

    const result = await fetch("http://localhost:3000/posts", options);

    if (result.status == 201) {
        // console.log("formattedDate",formattedDate)
        window.location.reload();
    }
})

async function loadPosts () {

    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch("http://localhost:3000/posts", options);

    if (response.status == 200) {
        const posts = await response.json();
    
        const container = document.getElementById("posts");

        posts.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        })


    } else {
        window.location.assign("./index.html"); //if there is no token redirect to the main
    }

}


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

loadPosts();
