'use strict'

//nav
const $nav = document.getElementsByClassName("tab-nav-item");
const navLength = $nav.length;

function selectNav(e) {
  e.preventDefault();
  const $targetNav = e.target;
  const num = $targetNav.dataset.nav;
   
  for (let i = 0; i < navLength; i++) {
    $nav[i].classList.remove("is-active");
    const $items = document.getElementsByClassName(`item${i}`)
    for (const item of $items) {
      item.style.display = "none";
    }
  }

  $nav[num].classList.add("is-active");
  const $items = document.getElementsByClassName(`item${num}`);
  for (const item of $items) {
    item.style.display = "block";
  }
}

for (let i = 0; i < navLength; i++) {
  $nav[i].addEventListener("click", selectNav);
}

//menber 呼び出し
const inputMenber = document.getElementById("menber-file");
const inputLink = document.getElementById("link-file")

function newFile(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  return reader
}

function todayLeadar() {
  const leadarContent = document.getElementById("today-leadar")
  const menberlist = document.getElementsByClassName("menber");
  const menberLength = menberlist.length;
  const random = Math.floor(Math.random() * menberLength);

  leadarContent.innerText = menberlist[random].innerText; 
}

function addMenber(e) {
  const file = newFile(e);
  let readingFile = "";
 
  file.addEventListener("load", () => {    
    readingFile = file.result.split(",");
    const readingFileLength = readingFile.length;
    const table = document.getElementById("menbers-schedule");
    const title = document.getElementById("main-title");
    const leadar = document.getElementById("today-leadar");
    
    title.innerText = `${readingFile[0]}　4Sボード`;
    table.innerHTML = "<thead><tr><th>名前</th><th>カード</th><th>実施</th><th>気づき</th></tr></thead>";
    
    for (let i = 1; i < readingFileLength; i++) {
      if (typeof readingFile[i] === "string") {
        table.innerHTML += `<tbody><tr><td class="menber" id="menber${i}">${readingFile[i]}</td><td id="card${i}">
        </td><td id="situation${i}"><input type="checkbox" name="situation-checkbox" id="situation-checkbox${i}"></td><td class="flag" id="flag${i}"><input type="checkbox" name="flag-checkbox" id="flag-checkbox${i}"></td></tr></tbody>`;                
      }
    }
    todayLeadar();
  });
}

inputMenber.addEventListener("change", addMenber);

//link挿入
function addLink(e) {
  const file = newFile(e);
  let readingFile = "";

  file.addEventListener("load", () => {    
    readingFile = file.result.split(",");
    const readingFileLength = readingFile.length;

    for (let i = 0; i < readingFileLength; i++) {
      const inputLink = document.getElementById(`link${i}`);
      inputLink.src = readingFile[i];
      const inputQRLink = document.getElementById(`QR${i}`);
      inputQRLink.href = readingFile[i];
    }
  });
}

inputLink.addEventListener("change", addLink);


//map配置表示
const mapButton = document.getElementById("map-button");
const square = document.getElementsByClassName("square");

mapButton.addEventListener("click", (e) => {
  if (mapButton.checked === false) {
    for (let i = 0; i < square.length; i++) {
      square[i].style.backgroundColor = "hsla(235, 100%, 3%, 0)";
      square[i].style.color = "hsla(235, 100%, 3%, 0)";
    }    
  } else {
    for (let i = 0; i < square.length; i++) {
      square[i].style.backgroundColor = "#56565944";
      square[i].style.color = "rgba(254, 1, 22, 0.419)";
    }
  }
});

