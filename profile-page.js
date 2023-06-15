let domain = window.location.origin
let queryParams = location.search;
let userId = queryParams.split('=')[1]


async function init() {
  let promise1 = fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  let promise2 = fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
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

    name.innerText = userData.name;
    username.innerText = `@${userData.username}`;
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

init()

document.querySelector('.fa-arrow-left').addEventListener('click', () => {
  history.back();
})
