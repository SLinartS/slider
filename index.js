'use strict';

class Slider {
  constructor() {
    this.slides = document.querySelectorAll('#slides .slide');
    this.buttonPrev = document.querySelector('#button-prev');
    this.buttonNext = document.querySelector('#button-next');
    this.currentSlide = 0;
  }

  prevSlide() {
    this.clear();
    this.slides[this.currentSlide].className = 'slide prev';
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.slides[this.currentSlide].className = 'slide showing';
  }

  nextSlide() {
    this.clear();
    this.slides[this.currentSlide].className = 'slide next';
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.slides[this.currentSlide].className = 'slide showing';
  }

  clear() {
    this.slides.forEach((slide) => {
      slide.className = 'slide';
    });
  }
}

const slider = new Slider();
slider.buttonPrev.addEventListener('click', () => {
  slider.prevSlide();
});
slider.buttonNext.addEventListener('click', () => {
  slider.nextSlide();
});
