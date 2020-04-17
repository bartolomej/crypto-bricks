export default class Brick {

  private domElement: HTMLElement | null;

  constructor () {
    this.domElement = null;
  }

  render () {
    const container = document.createElement('div');
    container.className = 'brick';
    const image = document.createElement('img');
    image.src = 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png';
    container.appendChild(image);
    this.domElement = container;
    return container;
  }

  update () {

  }

}
