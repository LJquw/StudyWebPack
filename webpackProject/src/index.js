import helloWorld from './hello-world';
import imgSrc from './assets/1.png';
import imgLogo from './assets/logo.svg';
import testTxt  from './assets/example.txt';
import jpgMap from './assets/3.jpg';

helloWorld();

const img = document.createElement('img');
img.src = imgSrc;
document.body.appendChild(img);

const img2 = document.createElement('img');
img2.style.cssText = 'width: 600px; height: 200px';
img2.src = imgLogo;
document.body.appendChild(img2);

const block = document.createElement('div');
block.style.cssText = 'color: red; font-weight: bold'
block.textContent = testTxt;
document.body.appendChild(block);

const img3 = document.createElement('img');
img3.style.cssText = 'width: 600px; height: 200px';
img3.src = jpgMap;
document.body.appendChild(img3);