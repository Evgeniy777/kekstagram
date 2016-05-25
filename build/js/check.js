"use strict";
var getMessage = function (a, b) {
  if (typeof (a) === Boolean) {
    if (a === true) {
      return "Переданное GIF-изображение анимировано и содержит " + b + " кадров";
    } else {
      return "Переданное GIF-изображение не анимировано";
    }
  }

  if (typeof (a) === Number) {
    return "Переданное SVG-изображение содержит " + a + " объектов и " + (b * 4) + " атрибутов";
  }

  if (typeof (a) === Array) {
    for (var i=0; i < a.length; i++) {
      var sum += a[i];
      return "Количество красных точек во всех строчках изображения: " + sum;
    }
  }

  if (typeof (a) === Array && typeof (b) === Array) {
    for (var i=0, j=0; i < a.length, j < b.length; i++, j++) {
      var square += a[i] * b[j];
      return "Общая площадь артефактов сжатия: " + square + " пикселей";
    }
  }
};
