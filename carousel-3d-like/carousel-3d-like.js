// carousel-3d-like.js
class Carousel3DLike {
  constructor(selectorOrElement) {
    // aceita string (seletor) ou elemento
    if (typeof selectorOrElement === 'string') {
      this.container = document.querySelector(selectorOrElement);
    } else if (selectorOrElement instanceof HTMLElement) {
      this.container = selectorOrElement;
    } else {
      throw new Error('Carousel3DLike: passe um seletor CSS ou um HTMLElement.');
    }

    if (!this.container) {
      throw new Error(`Carousel3DLike: container "${selectorOrElement}" não encontrado no DOM.`);
    }

    // pega todos os slides corretamente
    this.slides = Array.from(this.container.querySelectorAll('.slide'));
    this.current = 0;

    this._init();
  }

  _init() {
    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-wrapper';

    // move slides pro wrapper e adiciona classe de slide
    this.slides.forEach(slide => {
      slide.classList.add('carousel-slide');
      wrapper.appendChild(slide);
    });

    // cria botões
    this.prevBtn = document.createElement('button');
    this.nextBtn = document.createElement('button');
    this.prevBtn.innerHTML = '&#10094;';
    this.nextBtn.innerHTML = '&#10095;';
    this.prevBtn.className = 'carousel-btn prev';
    this.nextBtn.className = 'carousel-btn next';
    wrapper.appendChild(this.prevBtn);
    wrapper.appendChild(this.nextBtn);

    // substitui conteúdo do container pelo wrapper
    this.container.innerHTML = '';
    this.container.appendChild(wrapper);

    // bind dos handlers (mantém `this` apontando para a instância)
    this._onPrev = this.prev.bind(this);
    this._onNext = this.next.bind(this);

    this.prevBtn.addEventListener('click', this._onPrev);
    this.nextBtn.addEventListener('click', this._onNext);

    // inicializa estado
    this.updateSlides();
  }

  updateSlides() {
    const len = this.slides.length;
    this.slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev', 'next', 'hidden');
      if (i === this.current) {
        slide.classList.add('active');
      } else if (i === (this.current - 1 + len) % len) {
        slide.classList.add('prev');
      } else if (i === (this.current + 1) % len) {
        slide.classList.add('next');
      } else {
        slide.classList.add('hidden');
      }
    });
  }

  prev() {
    this.current = (this.current - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
  }

  next() {
    this.current = (this.current + 1) % this.slides.length;
    this.updateSlides();
  }

  // metodo utilitário caso queira destruir a instância
  destroy() {
    this.prevBtn.removeEventListener('click', this._onPrev);
    this.nextBtn.removeEventListener('click', this._onNext);
  }
}
window.Carousel3DLike = Carousel3DLike;