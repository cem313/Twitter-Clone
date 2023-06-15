let domain = window.location.origin
let users = [];

async function init() {
  let promise1 = fetch("https://jsonplaceholder.typicode.com/users");
  let promise2 = fetch("https://jsonplaceholder.typicode.com/posts");
  let responses = await Promise.all([promise1, promise2]);

  let datas = await Promise.all([responses[0].json(), responses[1].json()]);



  let [userData, postsData] = datas;

  users = userData;

  for (let i = 0; i < postsData.length; i++) {
    let li = document.createElement('li');
    let name = document.createElement('a');
    let username = document.createElement('span');
    let body = document.createElement('p');

    li.className = 'tweet';

    name.className = 'name';
    name.href = `${domain}/profile.html?id=${postsData[i].userId}`
    username.className = 'username';

    let userWhoCreatedPost = getUserDataObject(postsData[i].userId);
    name.innerText = userWhoCreatedPost.name;
    username.innerText = `@${userWhoCreatedPost.username}`;
    body.innerText = postsData[i].body;

    // name.addEventListener('click', () => {
    //   showUsersTweets(getUserDataObject(postsData[i].userId))
    //   let userIdWhoCreatedPost = postsData[i].userId
    //   let userObjectWhoCreatedPost = getUserDataObject(userIdWhoCreatedPost)
    //   showUsersTweets(userObjectWhoCreatedPost)
    // });


    li.append(name);
    li.append(username);
    li.append(body);
    document.querySelector('.feed').append(li);
  }
}



function getUserDataObject(id) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return users[i];
      console.log(users)
    }
  }
  return null;
}


init();

let popoutWindowShown = false;

function togglePopoutWindow() {
  if (popoutWindowShown) {
    document.querySelector('.popout-window').classList.remove('popout-window-show');

    document.querySelector('.popout-window').classList.add('popout-window-hide');

  } else {
    document.querySelector('.popout-window').classList.remove('popout-window-hide');

    document.querySelector('.popout-window').classList.add('popout-window-show');

  }
  popoutWindowShown = !popoutWindowShown
}

let usersTweets = {}

let cacheDuration = 30000;
// Date.now();
// setTimeout;
let timeoutExists = false

async function showUsersTweets(userObjectWhoCreatedPost) {
  if (!timeoutExists) {
    setTimeout(() => {
      usersTweets = {};
      timeoutExists = false;
    }, cacheDuration);

    timeoutExists = true;
    togglePopoutWindow();
    let data;
    if (!usersTweets[userObjectWhoCreatedPost]) {
      let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userObjectWhoCreatedPost.id}/posts`);


      data = await response.json();
      usersTweets[userObjectWhoCreatedPost.id] = data;
    } else {
      data = usersTweets[userObjectWhoCreatedPost.id];
    }
    document.querySelector('.popout-window-feed').innerHTML = '';
    for (let i = 0; i < data.length; i++) {
      let li = document.createElement('li');
      let name = document.createElement('span');
      let username = document.createElement('span');
      let body = document.createElement('p');

      li.className = 'tweet';
      name.className = 'name';
      username.className = 'username';

      let userWhoCreatedPost = getUserDataObject(data[i].userId);

      name.innerText = userWhoCreatedPost.name;
      username.innerText = `@${userWhoCreatedPost.username}`;
      body.innerText = data[i].body;


      li.append(name);
      li.append(username);
      li.append(body);
      document.querySelector('.popout-window-feed').append(li);
    }
  }
}


