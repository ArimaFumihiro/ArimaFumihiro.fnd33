'use strict';
// please do not delete the 'use strict' line above
const body = document.getElementsByTagName('body')[0];
const btn = document.getElementById('color-button')
const changeNum = 2;
btn.addEventListener('click', changeCode);

window.onload = function() {
  const newP1 = document.createElement('p');
  const newP2 = document.createElement('p');
  const newImg0 = document.createElement('img');
  const newImg1 = document.createElement('img');
  const newImg2 = document.createElement('img');
  const newImg3 = document.createElement('img');
  const newImg4 = document.createElement('img');
  const newImg5 = document.createElement('img');

  body.style.cssText = `overflow: hidden; align-items: center; display: flex; font-family: monospace; justify-content: center; height: 100%;`;

  newP1.id = 'main_color';
  newP1.textContent =  'Try clicking the button!!';
  newP1.style.cssText = `color: #333333; font-weight: bold; font-size: 50px; position: absolute; top: 18%; left: 10%;`;

  newP2.id = 'Copyright';
  newP2.textContent =  '©Fumihiro_Arima';
  newP2.style.cssText = `color: #333333; font-weight: bold; font-size: 11px; position: absolute; top: 97%; left: 95%;`;

  newImg0.id = 'img0';
  newImg0.src = 'https://arimafumihiro.github.io/fumihiro_art_museum/back0.png';

  newImg0.addEventListener('mouseover', function () {
    newImg0.src = 'https://arimafumihiro.github.io/fumihiro_art_museum/back0_3.png';
  });
  newImg0.addEventListener('mouseleave', function () {
    newImg0.src = 'https://arimafumihiro.github.io/fumihiro_art_museum/back0.png';
  });
  newImg0.addEventListener('mousedown', function () {
    newImg0.src = 'https://arimafumihiro.github.io/fumihiro_art_museum/back0_2.png';
  });
  newImg0.addEventListener('mouseup', function() {
    newImg0.src = 'https://arimafumihiro.github.io/fumihiro_art_museum/back0.png';
  });

  newImg0.style.cssText = 'height: 100%; osition: absolute; top: 0%; left: 0%; transition: opacity 2s; opacity: 0.78;';

  newImg1.id = 'img1';
  newImg1.src = 'https://arimafumihiro.github.io/fumihiro_art_museum/back3.png';
  newImg1.style.cssText = 'height: 100%; position: absolute; top: 0%; left: 0%; transition: opacity 2s; opacity: 0;';

  newImg2.id = 'img2';
  newImg2.src = 'https://arimafumihiro.github.io/fumihiro_art_museum/back2.png';
  newImg2.style.cssText = 'height: 100%; position: absolute; top: 0%; left: 0%; transition: opacity 2s; opacity: 0;}';

  newImg3.id = 'img3';
  newImg3.src = 'https://arimafumihiro.github.io/fumihiro_art_museum/back4.png';
  newImg3.style.cssText = 'height: 100%; position: absolute; top: 0%; left: 0%; transition: opacity 2s; opacity: 0;';

  newImg4.id = 'img4';
  newImg4.src = 'https://arimafumihiro.github.io/fumihiro_art_museum/back1.png';
  newImg4.style.cssText = 'height: 100%; position: absolute; top: 0%; left: 0%; transition: opacity 2s; opacity: 0;';

  newImg5.id = 'img5';
  newImg5.src = 'https://arimafumihiro.github.io/fumihiro_art_museum/back5.png';
  newImg5.style.cssText = 'height: 100%; position: absolute; top: 0%; left: 0%; transition: opacity 2s; opacity: 0;';

  body.prepend(newP1);
  body.prepend(newP2);
  body.prepend(newImg0);
  body.prepend(newImg1);
  body.prepend(newImg2);
  body.prepend(newImg3);
  body.prepend(newImg4);
  body.prepend(newImg5);

  const btn = document.getElementById('color-button')
  btn.style.cssText = ' position: absolute; top: 50%; left: 44.5%;';
}

let changeCount = 0; 

let red ='';
let green ='';
let blue ='';
let sumNumber = 0;
const LargestOrder = [];

let red2 ='';
let green2 ='';
let blue2 ='';

let resetRed = '';
let resetGreen = '';
let resetBlue = '';


let mainColor = '#000000'
let resetColor = '#000000'
let complementaryColor = '#000000';
let mostVividColor = '';


//配列の数値を2桁の16進数に変更する関数
function changeHexadecimal(number) {
  return `${Math.floor(number / 16).toString(16)}${(number % 16).toString(16)}`
}

//補色を求める関数
function reference() {
  let referenceValue = 0;
  LargestOrder.length = 0;

  //一番高い数値
  if (red > green && red > blue) {
    LargestOrder.push(red);    
  } else if (green > blue) {
    LargestOrder.push(green);    
  } else {
    LargestOrder.push(blue);
  }

  //一番低い数値
  if (red < green && red < blue) {
    LargestOrder.push(red);   
  } else if (green < blue) {
    LargestOrder.push(green);
  } else {
    LargestOrder.push(blue);
  }
        
    referenceValue = LargestOrder[0] + LargestOrder[1];
    
    red2 = referenceValue - red;
    green2 = referenceValue - green;
    blue2 = referenceValue - blue;
}

//背景色を変更する関数
function changeColor() {
  //メインカラーのコードを生成
  mainColor = `#${changeHexadecimal(red)}${changeHexadecimal(green)}${changeHexadecimal(blue)}`;
    
  //補色のコードを生成
  reference();
  complementaryColor = `#${changeHexadecimal(red2)}${changeHexadecimal(green2)}${changeHexadecimal(blue2)}`;
  
  //背景色を変更
  body.style.cssText = `background:linear-gradient(to bottom right,${mainColor} 65%,${complementaryColor} 35%); overflow: hidden; align-items: center; display: flex; font-family: monospace; justify-content: center; hieght: 100vh;`;

  //新しい要素を作るか判定
  changeCount === 0? newDocument() : colorCode();
}

//背景色に応じて文字色を変更
function txetColor() {
  sumNumber = red + green + blue;
  return sumNumber > 550? '#333333' : '#FFFFFF'
}

 
//RGBをランダムで決定する関数
function changeCode() {
  const img0 = document.getElementById('img0');
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');
  const img4 = document.getElementById('img4');
  const img5 = document.getElementById('img5');

  const imgArray = ['0','0','0','0','0','0'];
  const imgCity = ['0', '0.3', '0', '0.5', '0.8'];

  const vewNumber = (Math.floor(Math.random() * (imgArray.length)) + 1);
  const CityNumber = (Math.floor(Math.random() * (imgCity.length)));

  imgArray[vewNumber] = '0.8';
  img0.src = 'https://arimafumihiro.github.io/fumihiro_art_museum/back0_4.png';  

  img1.style.opacity = imgArray[1];
  img2.style.opacity = imgArray[2];
  img3.style.opacity = imgArray[3];
  img4.style.opacity = imgArray[4];
  img5.style.opacity = imgArray[5];

  imgArray[4] === '0.8' ? img2.style.opacity = '0' : img2.style.opacity = imgCity[CityNumber];

  
  //0～15までの数値をランダム生成
  function randomCode() {
    return Math.floor(Math.random() * 255);
  }
  
  //RGBの値をそれぞれ10進数でランダム生成
  red = randomCode();
  green = randomCode();
  blue = randomCode();

  resetRed = red;
  resetGreen = green;
  resetBlue = blue;

  //一番高い数値
  if (red > green && red > blue) {
    mostVividColor = 'red'
  } else if (green > blue) {
    mostVividColor = 'green'
  } else {
    mostVividColor = 'blue'
  }

  changeColor();

  console.log('Button clicked!'); // feel free to change/delete this line
  ++changeCount;
  console.log('count:',changeCount);
}

function newDocument (){
  const p1 = document.getElementById('main_color') 
  
  const newDiv1 = document.createElement('div');
  const newDiv2 = document.createElement('div');
  const newDiv3 = document.createElement('div');  
  const newP2 = document.createElement('p');
  
  const newbutton1 = document.createElement('button');
  const newbutton2 = document.createElement('button');
  const newbutton3 = document.createElement('button');
  const newbutton4 = document.createElement('button');
  const newbutton5 = document.createElement('button');
 
  newDiv1.id = 'contents-Saturation';
  newDiv1.textContent =  'Saturation';
  newDiv1.style.cssText = `color: ${txetColor()}; font-size: 11px; position: absolute; top: 3%; left: 95%; text-aline:center`;

  newDiv2.id = 'contents-Brightness';
  newDiv2.textContent =  'Brightness';
  newDiv2.style.cssText = `color: ${txetColor()}; font-size: 11px; position: absolute; top: 15%; left: 95%; text-aline:center`;

  newDiv3.id = 'contents-reset';
  newDiv3.textContent =  'reset';
  newDiv3.style.cssText = `color: ${txetColor()}; font-size: 11px; position: absolute; top: 27%; left: 95.5%; text-aline:center`;

  p1.textContent =  `Main color is ${mainColor}`;
  p1.style.cssText = `color: ${txetColor()}; font-size: 50px; position: absolute; top: 18%; left: 10%;`;

  newP2.id = 'complementary_color';
  newP2.textContent =  `Complementary color is ${complementaryColor}`;
  newP2.style.cssText = `color: ${txetColor()}; font-size: 25px; position: absolute; top: 80%; left: 70%;`;

  newbutton1.id = 'Saturation-up-button';
  newbutton1.textContent = 'UP';
  newbutton1.addEventListener('click', addSaturation);
  newbutton1.style.cssText = 'zIndex: 150; position: absolute; top: 5%; left: 95%; font-size: 9px; width: 50px; height: 20px; border-radius: 8px; opacity: 0.8;';

  newbutton2.id = 'Saturation-down-button';
  newbutton2.textContent = 'DOWN';
  newbutton2.addEventListener('click', reduceSaturation);
  newbutton2.style.cssText = 'zIndex: 10; position: absolute; top: 10%; left: 95%; font-size: 9px; width: 50px; height: 20px; border-radius: 8px; opacity: 0.8;';

  newbutton3.id = 'Brightness-up-button';
  newbutton3.textContent = 'UP';
  newbutton3.addEventListener('click', addBrightness);
  newbutton3.style.cssText = 'zIndex: 20; position: absolute; top: 17%; left: 95%; font-size: 9px; width: 50px; height: 20px; border-radius: 8px; opacity: 0.8;';

  newbutton4.id = 'Brightness-down-button';
  newbutton4.textContent = 'DOWN';
  newbutton4.addEventListener('click', reduceBrightness);
  newbutton4.style.cssText = 'zIndex: 30; position: absolute; top: 22%; left: 95%; font-size: 9px; width: 50px; height: 20px; border-radius: 8px; opacity: 0.8;';

  newbutton5.id = 'reset-button';
  newbutton5.textContent = 'RESET';
  newbutton5.addEventListener('click', reset);
  newbutton5.style.cssText = 'zIndex: 40; position: absolute; top: 29%; left: 95%; font-size: 9px; width: 50px; height: 20px; border-radius: 8px; opacity: 0.8;';

  //要素を追加
  body.appendChild(newDiv1);
  body.appendChild(newDiv2);
  body.appendChild(newDiv3);
  
  body.appendChild(newP2);
  body.appendChild(newbutton1);
  body.appendChild(newbutton2);
  body.appendChild(newbutton3);
  body.appendChild(newbutton4);
  body.appendChild(newbutton5);
}

function colorCode() {
  const p1 = document.getElementById('main_color');
  const p2 = document.getElementById('complementary_color');
  p1.textContent =  `Main color is ${mainColor}`
  p1.style.color = txetColor();
  p2.textContent =  `Complementary color is ${complementaryColor}`
  p2.style.color = txetColor();
}


//彩度を上げる関数
function addSaturation() {
  let redRsult = 0;
  let greenRsult = 0;
  let blueRsult = 0;
  if (mostVividColor === 'red') {
    greenRsult = green - changeNum;
    blueRsult = blue - changeNum;
    if (greenRsult <= 255 && blueRsult <= 255) {
      green = greenRsult;
      blue = blueRsult;
      changeColor();
      return;
    } else {
      
      return;
    }
    
  } else if (mostVividColor === 'green') {
    greenRsult = red - changeNum;
    blueRsult = blue - changeNum;
    if (redRsult <= 255 && blueRsult <= 255) {
      red = redRsult;
      blue = blueRsult;
      changeColor();
      return;  
    } else {
      
      return;
    }
    
  } else if (mostVividColor === 'blue') {
    greenRsult = green - changeNum;
    redRsult = red - changeNum;
    if (greenRsult <= 255 && redRsult <= 255) {
      green = greenRsult;
      red = redRsult;
      changeColor();
    }
  }
  
  return;
}
//彩度を下げる関数
function reduceSaturation() {
  let redRsult = 0;
  let greenRsult = 0;
  let blueRsult = 0;
  if (mostVividColor === 'red') {
    greenRsult = green + changeNum;
    blueRsult = blue + changeNum;
    if (greenRsult >= 0 && blueRsult >= 0) {
      green = greenRsult;
      blue = blueRsult;
      changeColor();
      return;
    } else {
      
      return;
    }
    
  } else if (mostVividColor === 'green') {
    greenRsult = red + changeNum;
    blueRsult = blue + changeNum;
    if (redRsult >= 0 && blueRsult >= 0) {
      red = redRsult;
      blue = blueRsult;
      changeColor();
      return;  
    } else {
      
      return;
    }
    
  } else if (mostVividColor === 'blue') {
    greenRsult = green + changeNum;
    redRsult = red + changeNum;
    if (greenRsult >= 0 && redRsult >= 0) {
      green = greenRsult;
      red = redRsult;
      changeColor();
    }
  }
  
  return;
}

//明度を上げる関数
function addBrightness() {
  const redRsult = red + changeNum;
  const greenRsult = green + changeNum;
  const blueRsult = blue + changeNum;
  if (redRsult <= 255 && greenRsult <= 255 && blueRsult <= 255) {
    red = redRsult;
    green = greenRsult;
    blue = blueRsult;
    changeColor();
  } else {
    return;
  }
}

//明度を下げる関数
function reduceBrightness() {
  const redRsult = red - changeNum;
  const greenRsult = green - changeNum;
  const blueRsult = blue - changeNum;
  if (redRsult > 0 && greenRsult > 0 && blueRsult > 0) {
    red = redRsult;
    green = greenRsult;
    blue = blueRsult;
    changeColor();
  } else {
    return;
  }
}

//リセットする関数
function reset() {
  red = resetRed;
  green = resetGreen;
  blue = resetBlue;
  changeColor();
}
