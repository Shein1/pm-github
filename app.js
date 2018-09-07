const { ipcRenderer, remote } = require("electron");
const main = remote.require("./main.js");
const axios = require("axios");

function searchValue(e) {
  if (e.keyCode == 13) {
    var value = document.getElementById("searchBar").value;
    ipcRenderer.send("async", value);

    getUsers(value);
  }
}

function searchClick() {
  var query = document.getElementById("searchBar").value;
  ipcRenderer.send("async", query);

  getUsers(query);
}

function getUsers(q) {
  let userInfo;
  try {
    axios
      .get(`https://api.github.com/search/users?q=${q}&per_page=5`)
      .then(res => {
        let items = res.data.items;
        for (let i = 0; i < items.length; i++) {
          userInfo = `
            <div class="card">
             <div class="card-content">
               <a class="title" onclick="${getRepos(items[i].login)}">
                 ${items[i].login}
               </a>
             </div>
           </div><br/><br/>`;
          document.getElementById("userInfos").innerHTML += userInfo;
        }
      })
      .then(function() {});
  } catch (e) {
    console.error(e);
  }
}

function getRepos(q) {
  let userRepo;
  let userInfo;
  try {
    axios
      .get(`https://api.github.com/users/${q}/repos`)
      .then(res => {
        let items = res.data;
        userInfo = "";
        document.getElementById("userInfos").innerHTML += userInfo;
        for (let i = 0; i < items.length; i++) {
          userRepo = `<div class="card">
             <div class="card-content">
               <p class="title">
                 ${items[i].name}
               </p>
               <p class="subtitle">
               </p>
             </div>
             <footer class="card-footer">
               <p class="card-footer-item">
                 <span>
                  ${items[i].created_at}
                 </span>
               </p>
               <p class="card-footer-item">
                 <span>
                  ${items[i].language}
                 </span>
               </p>
             </footer>
           </div><br/><br/>`;
          document.getElementById("userInfos").innerHTML += userRepo;
        }
      })
      .then(function() {});
  } catch (e) {
    console.error(e);
  }
}
