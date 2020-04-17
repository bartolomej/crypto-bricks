export default class Brick {

  private domElement: HTMLElement | null;

  constructor () {
    this.domElement = null;
  }

  render () {
    const container = document.createElement('div');
    container.className = 'bullet';
    this.domElement = container;
    return container;
  }

  update () {

  }

}
