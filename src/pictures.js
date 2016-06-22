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
var PICTURES_LOAD_URL = 'https://o0.github.io/assets/json/pictures.json';
var getPictures = function(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', PICTURES_LOAD_URL);
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) {
      picturesContainer.classList.add("pictures-loading");
    } else {
      picturesContainer.classList.remove("pictures-loading");
    }
  };
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };
  xhr.onerror = function() {
    picturesContainer.classList.add("pictures-failure");
  }
  xhr.timeout = 10000;
  xhr.ontimeout = function() {
    picturesContainer.classList.add("pictures-failure");
  };
  xhr.send();
};
var renderPictures = function(pictures) {
  pictures.forEach(function(picture) {
    getPictureElement(picture, picturesContainer);
  });
};

var loadPicturesCallback = function(picturesList) {
  renderPictures(picturesList);
};
getPictures(loadPicturesCallback);