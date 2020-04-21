import Vector from "../base/Vector";
import Circle from "../base/Circle";

const coins = ['btc', 'eth', 'mkr'];

function randomCoin () {
  const rand = Math.floor(Math.random() * coins.length);
  return coins[rand];
}

enum BrickStatus {
  ACTIVE,
  HIT
}

export default class Brick extends Circle {

  private domElement: HTMLElement | null;
  private status: BrickStatus;
  public coin: string;

  constructor (radius: number, position: Vector) {
    super(radius, position);
    this.domElement = null;
    this.status = BrickStatus.ACTIVE;
    this.coin = randomCoin();
  }

  isActive () {
    return this.status === BrickStatus.ACTIVE;
  }

  render () {
    const container = document.createElement('div');
    container.className = 'brick';
    container.style.height = `${this.radius * 2}px`;
    container.style.width = `${this.radius * 2}px`;
    container.style.position = 'absolute';
    container.style.bottom = `${this.position.y - this.radius}px`;
    container.style.left = `${this.position.x - this.radius}px`;
    const image = document.createElement('img');
    image.src = require(`../../assets/${this.coin}-white.png`);
    container.appendChild(image);
    this.domElement = container;
    return container;
  }

  hit () {
    this.status = BrickStatus.HIT;
    this.domElement?.classList.add('brick-disappear');
  }

  update () {

  }

}
