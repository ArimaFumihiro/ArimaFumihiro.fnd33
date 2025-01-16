'use strict'

const $nav = document.getElementsByClassName("tab-nav-item");
const navLength = $nav.length;

function selectNav(e) {
  e.preventDefault();
  const $targetNav = e.target;
  const num = $targetNav.dataset.nav;
  console.log(num);
  
  for (let i=0; i < navLength; i++) {
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
  const menbarlist = document.getElementsByClassName("menbar");
  const menbarLength = menbarlist.length;
  const random = Math.floor(Math.random() * menbarLength);

  leadarContent.innerText = menbarlist[random].innerText; 
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
        table.innerHTML += `<tbody><tr><td class="menbar" id="menber${i}">${readingFile[i]}</td><td id="card${i}">
        </td><td id="situation${i}"><input type="checkbox" name="situation-checkbox" id="situation-checkbox${i}"></td><td class="flag" id="flag${i}"><input type="checkbox" name="flag-checkbox" id="flag-checkbox${i}"></td></tr></tbody>`;                
      }
    }
    todayLeadar();
  });
}

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
      inputQRLink.src = readingFile[i];
    }
  });
}

inputMenber.addEventListener("change", addMenber);
inputLink.addEventListener("change", addLink);

function raiseAFlag () {
  const flagButton = document.getElementsByClassName("flag-button");
  const flagButtonLength = flagButton.length;
  for (let i = 1; i <= flagButtonLength; i++) {
    const flagButtonId = document.getElementById(`flag-button${i}`);
    console.log(flagButtonId.value);
  }
}

