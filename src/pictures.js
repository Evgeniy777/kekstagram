'use strict';
var pictures = [];
var Filter = {
  'POPULAR': 'filter-popular',
  'NEW': 'filter-new',
  'DISCUSSED': 'filter-discussed'
};
var filterBlock = document.querySelector('.filters');
function hideFilterBlock() {
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
  element.querySelector('.picture-comments').textContent = data.comments;
  element.querySelector('.picture-likes').textContent = data.likes;
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
  filterBlock.classList.remove('hidden');
}
showFilterBlock();
//
var PICTURES_LOAD_URL = 'https://o0.github.io/assets/json/pictures.json';
var getPictures = function(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', PICTURES_LOAD_URL);
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      picturesContainer.classList.add('pictures-loading');
    } else {
      picturesContainer.classList.remove('pictures-loading');
    }
  };
  xhr.onload = function(evt) {
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
    console.log(loadedData);
  };
  xhr.onerror = function() {
    picturesContainer.classList.add('pictures-failure');
    console.warn('something is wrong');
  };
  xhr.timeout = 10000;
  xhr.ontimeout = function() {
    picturesContainer.classList.add('pictures-failure');
  };
  xhr.send();
};
//
var renderPictures = function(pictures) {
  picturesContainer.innerHTML = '';
  pictures.forEach(function(picture) {
    getPictureElement(picture, picturesContainer);
  });
};
//
var getFilteredPictures = function(pictures, filter) {
  var picturesToFilter = pictures.slice(0);

  switch(filter) {
    case Filter.POPULAR:
      break;
    case Filter.NEW:
      picturesToFilter = picturesToFilter.filter(function(a) {
        var lastFourDays = 4 * 24 * 60 * 60 * 1000;
        var imgDate = new Date(a.date);
        return imgDate >= (Date.now() - lastFourDays) && imgDate < Date.now();
      });
      picturesToFilter.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      console.log(picturesToFilter);
      break;
    case Filter.DISCUSSED:
      picturesToFilter.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;
  }

  return picturesToFilter;
};
//
var setFilterEnabled = function(filter) {
  var filteredPictures = getFilteredPictures(pictures, filter);
  renderPictures(filteredPictures);
};
//
var setFiltrationEnabled = function() {
  var filters = filterBlock.querySelectorAll('[name="filter"]');
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function() {
      setFilterEnabled(this.id);
      console.log(this.id);
    };
  }
};

getPictures(function(loadedPictures) {
  pictures = loadedPictures;
  setFiltrationEnabled();
  renderPictures(pictures);
});
