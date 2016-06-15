'use strict';
function hideFilterBlock() {
  var filterBlock = document.querySelector('.filters');
  filterBlock.classList.add('hidden');
}
hideFilterBlock();
var picturesContainer = document.querySelector('.pictures');
var templateElement = document.querySelector('#picture-template');
var elementToClone;
//
if('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}
var getPictureElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('img').setAttribute('src', data.url);
//  var backgroundImage = new Image();
//  backgroundImage.onload = function(evt) {
//    element.style.backgroundImage = 'url(\'' + evt.target.src + '\')';
//  };
//  backgroundImage.src = data.url;
  container.appendChild(element);
  return element;
};

var arr = window.pictures;
arr.forEach(function(picture) {
  getPictureElement(picture, picturesContainer);
});
