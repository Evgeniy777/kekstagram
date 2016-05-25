'use strict';
var getMessage = function (a, b) {

  if (typeof a === 'boolean') {
    if (a === true) {
      return 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
    } else {
      return 'Переданное GIF-изображение не анимировано';
    }
  }

  if (typeof a === 'number') {
    return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + (b * 4) + ' атрибутов';
  }

  if (Array.isArray(a)) {
    for (var i=0; i < a.length; i++) {
      var sum += a[i];
        return 'Количество красных точек во всех строчках изображения: ' + sum;
    }
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    for (var i=0; i < a.length; i++) {
      var square += a[i] * b[i];
        return 'Общая площадь артефактов сжатия: ' + square + ' пикселей';
    }
  }
};