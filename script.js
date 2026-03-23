"use strict";

const gameList = document.querySelector("#gameList");
const submit = document.querySelector("#add");
const update = document.querySelector("#update");

submit.addEventListener("click", () => {
  let name = document.querySelector("#name").value;
  let platform = document.querySelector("#platform").value;
  let hours_played = document.querySelector("#hours_played").value;
  let image_url = document.querySelector("#image_url").value;

  let formData = { name, platform, hours_played, image_url };

  fetch("https://semis-backend-2edj.onrender.com/api/new-game", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });
  alert("Game added Succesfully");
  location.reload();
});

function getGame() {
  let html = "";

  fetch("https://semis-backend-2edj.onrender.com/api/games", {
    mode: "cors",
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        html += `<li class="flex gap-4 bg-slate-600 p-2 rounded-md shadow-lg border-[4px] border-green-300">
                    <div class="w-full max-w-[200px]">
                      <img src="${element.image_url}" class="h-full rounded-md"/>
                    </div>
                    <div class="flex flex-col gap-2">
                      <h2 class="font-bold">${element.name}</h2>
                      <p>Hours played: <span class="italic">${element.hours_played} hours</span></p>
                      <p>Platform: <span class="italic">${element.platform}</span></p>
                    </div>
                    <div class="ml-auto flex flex-col items-center justify-center h-full gap-2 w-[100px]">
                      <a href="javascript:void(0)" onClick="deleteGame(${element.id})" class="rounded-lg font-semibold w-full text-center px-3 py-1 bg-red-500 hover:bg-red-600">Delete</a>
                      <a href="javascript:void(0)" onClick="updateGame(${element.id})" class="rounded-lg font-semibold w-full text-center px-3 py-1 bg-green-500 hover:bg-green-600">Update</a>
                    </div>
                 </li>`;
      });

      gameList.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteGame(id) {
  if (confirm("Are you sure you want to delete this game?")) {
    fetch("https://semis-backend-2edj.onrender.com/api/games", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("You Canceled!");
  }
}

function updateGame(id) {
  fetch(`https://semis-backend-2edj.onrender.com/api/games/${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#name").value = data[0].name;
      document.querySelector("#platform").value = data[0].platform;
      document.querySelector("#hours_played").value = data[0].hours_played;
      document.querySelector("#image_url").value = data[0].image_url;
      document.querySelector("#id").value = data[0].id;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

update.addEventListener("click", () => {
  let name = document.querySelector("#name").value;
  let platform = document.querySelector("#platform").value;
  let hours_played = document.querySelector("#hours_played").value;
  let image_url = document.querySelector("#image_url").value;
  let id = document.querySelector("#id").value;

  let formData = { name, platform, hours_played, image_url, id };

  fetch(`https://semis-backend-2edj.onrender.com/api/games`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });
  alert("Game Updated Successfully");
  location.reload();
});

window.addEventListener("load", () => {
  getGame();
});
