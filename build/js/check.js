'use strict';
var getMessage = function (a, b) {

  if (typeof a === 'boolean') {
    if (a) {
      return 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
    } else {
      return 'Переданное GIF-изображение не анимировано';
    }
  } else if (typeof a === 'number') {
    return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + (b * 4) + ' атрибутов';
  } else if (Array.isArray(a)) {
    if (Array.isArray(b)) {
      for (var i=0; i < a.length; i++) {
        var square += a[i] * b[i];
        return 'Общая площадь артефактов сжатия: ' + square + ' пикселей';
      }
    } else {
      for (var i=0; i < a.length; i++) {
        var sum += a[i];
        return 'Количество красных точек во всех строчках изображения: ' + sum;
      }
    }
  }
};
