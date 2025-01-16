'use strict'

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
  console.log(random);
  console.log(menbarlist[random].innerText);
  console.log(leadarContent);

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
        table.innerHTML += `<tbody><tr><td class="menbar" id="menber${i}">${readingFile[i]}</td><td id="card${i}"><input type="button" class="table-button" id="card-button${i}" value="No.${i}"></button></td><td id="situation${i}"><input type="button" class="table-button" id="situation-button${i}" value="実行"></button></td><td id="flag${i}"><input type="button" class="table-button-is-activ" id="flag-button${i}" value="🚩"></button></td></tr></tbody>`;
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

