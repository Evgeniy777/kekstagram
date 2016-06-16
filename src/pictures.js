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
  var image = new Image();
  image.onload = function(evt) {
    element.querySelector('img').setAttribute('src', evt.target.src);
    element.querySelector('img').setAttribute('width', 182);
    element.querySelector('img').setAttribute('height', 182);
  };
  image.onerror = function() {
    element.classList.add('picture-load-failure');
  };
  image.src = data.url;
  container.appendChild(element);
  return element;
};
function showFilterBlock() {
  var filterBlock = document.querySelector('.filters');
  filterBlock.classList.remove('hidden');
}
showFilterBlock();
//
var arr = window.pictures;
arr.forEach(function(picture) {
  getPictureElement(picture, picturesContainer);
});
