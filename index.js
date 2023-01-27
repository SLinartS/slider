'use strict';

class Slider {
  #position;
  #elemNumber
  #transitionTimeout
  #isLoop
  #items
  #slides
  #max
  #width

  constructor({ elemNumber, transitionTimeout, isLoop }) {
    this.buttonPrev = document.querySelector('#button-prev');
    this.buttonNext = document.querySelector('#button-next');

    this.#elemNumber = elemNumber;
    this.#transitionTimeout = transitionTimeout;
    this.#isLoop = isLoop;
    this.#items = document.querySelector('.items');
    this.#slides = document.querySelectorAll('.items .slide');
    this.#max = this.#slides.length + this.#elemNumber - 1;
    this.#width = this.#slides[0].offsetWidth;
    this.#addElementsForLoop();
    this.#initPosition();
  }

  prevSlide() {
    if (this.#isLoop || this.#position <= -this.#width) {
      this.#move(this.#width);
    }
  }

  nextSlide() {
    if (this.#isLoop || this.#position >= -this.#width * this.#max) {
      this.#move(-this.#width);
    }
  }

  #initPosition() {
    this.#moveToPosition(-this.#elemNumber * this.#width);
  }

  #move(offset) {
    this.#position += offset;
    this.#items.style.transform = `translateX(${this.#position}px)`;

    if (
      this.#isLoop &&
      this.#position <= -this.#width * this.#max - this.#width
    ) {
      this.#moveToPosition(-this.#elemNumber * this.#width);
    }

    if (this.#isLoop && this.#position > -this.#width) {
      this.#moveToPosition(-this.#slides.length * this.#width);
    }
  }

  #moveToPosition(position) {
    setTimeout(() => {
      this.#items.classList.add('no-transition');
      this.#position = position;
      this.#move(0);
      setTimeout(() => {
        this.#items.classList.remove('no-transition');
      }, 10);
    }, this.#transitionTimeout);
  }

  #addElementsForLoop() {
    for (let i = 0; i < this.#elemNumber; i++) {
      let li = document.createElement('li');
      let liprep = document.createElement('li');
      li.innerText = this.#slides[i].innerText;
      liprep.innerText = this.#slides[this.#slides.length - 1 - i].innerText;
      li.className = this.#slides[i].className;
      liprep.className = this.#slides[this.#slides.length - 1 - i].className;
      this.#items.append(li);
      this.#items.prepend(liprep);
    }
  }
}

const slider = new Slider({
  elemNumber: 3,
  transitionTimeout: 500,
  isLoop: true,
});
slider.buttonPrev.addEventListener('click', () => {
  slider.prevSlide();
});
slider.buttonNext.addEventListener('click', () => {
  slider.nextSlide();
});
