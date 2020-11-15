import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    this.container = document.body.querySelector('.container');
    this.containerSize = this.container.getBoundingClientRect();

    if (this.elem.offsetWidth === 0 || this.elem.offsetHeight === 0) return; 

    if (window.innerWidth <= 767) return;

    if (window.pageYOffset >= parseInt(getComputedStyle(this.elem).top)) this.positionFixed();
    
    if (window.pageYOffset <= this.elem.getBoundingClientRect().top) this.positionAbsolute();
  }

  positionFixed() { 
    this.elem.style.position = 'fixed';
    this.elem.style.zIndex = 1000;
    this.elem.style.left = this.containerSize.x + this.containerSize.width + 20 + 'px';

    if (parseInt(this.elem.style.left) + this.elem.getBoundingClientRect().width + 10 >= document.documentElement.clientWidth) { 
      this.elem.style.left = '';
      this.elem.style.right = '10px';
    }
    /*console.log(this.containerSize.x);
    console.log(this.containerSize.width);
    console.log(this.elem.getBoundingClientRect().width);
    console.log(document.documentElement.clientWidth);
    */
    /*
    if (this.containerSize.x + this.containerSize.width + this.elem.getBoundingClientRect().width + 30 >= document.documentElement.clientWidth) {
      this.elem.style.left = document.documentElement.clientWidth - this.elem.getBoundingClientRect().width - 10 + 'px';
    }*/
  }

  positionAbsolute() { 
    //this.elem.style.left = '';
    //this.elem.style.right = 0;
    //this.elem.style.left = this.containerSize.width - this.elem.getBoundingClientRect().width - 10 + 'px';
    this.elem.style = '';
    //this.elem.style.position = 'absolute';
  }
}
