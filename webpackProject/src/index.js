import helloWorld from './hello-world';
import imgSrc from './assets/1.png';
import imgLogo from './assets/logo.svg';
import testTxt  from './assets/example.txt';
import jpgMap from './assets/3.jpg';
import Data from './assets/data.xml';
import Notes from './assets/data.csv';
import toml from './assets/data.toml';
import yaml from './assets/data.yaml';
import json5 from './assets/data.json5';
import _ from 'lodash';
import './async-module.js';
import "./styles.css";
import './styles.less';

helloWorld();

const img = document.createElement('img');
img.src = imgSrc;
document.body.appendChild(img);

const img2 = document.createElement('img');
img2.style.cssText = 'width: 600px; height: 200px';
img2.src = imgLogo;
document.body.appendChild(img2);

const block = document.createElement('div');
block.style.cssText = 'color: red; font-weight: bold';
block.classList.add('block-bg');
block.textContent = testTxt;
document.body.appendChild(block);

const img3 = document.createElement('img');
img3.style.cssText = 'width: 600px; height: 200px';
img3.src = jpgMap;
document.body.appendChild(img3);

document.body.classList.add('hello');

const span = document.createElement('span');
span.classList.add('icon');
span.innerHTML = '&#xe668;'
document.body.appendChild(span);

console.log(Data);
console.log(Notes);
console.log(toml.title);
console.log(yaml.owner.age);
console.log(json5.name);
console.log(_.join(['liu', 'jun', 'misses'], '+'));

const button = document.createElement('button');
button.textContent = '点击执行加法运算';
button.addEventListener('click', () =>{
  import(/* webpackChunkName:'math', webpackPrefetch:true */'./math.js').then(({add}) => {
    console.log(add(4, 6));
  })
});
document.body.appendChild(button);