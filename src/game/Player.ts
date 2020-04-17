export default class Player {

  private domElement: HTMLDivElement|null;
  private speed: number;

  constructor () {
    this.speed = 0;
    this.domElement = null;
  }

  moveLeft () {
    this.speed = -1;
  }

  moveRight () {
    this.speed = 1;
  }

  stop () {
    this.speed = 0;
  }

  render (parent: HTMLElement) {
    const container = document.createElement('div');
    container.className = 'player';
    container.style.left = `${parent.clientWidth / 2}px`;
    this.domElement = container;
    return container;
  }

  update () {
    if (!this.domElement) return;
    this.domElement.style.left = `${parseFloat(this.domElement.style.left.replace('px', '')) + this.speed}px`;

  }

}
