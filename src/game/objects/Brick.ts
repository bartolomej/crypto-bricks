import Vector from "../base/Vector";
import Circle from "../base/Circle";
import coins from '../assets/bricks/manifest.json';

function randomCoin () {
  const rand = Math.floor(Math.random() * coins.length);
  return coins[rand];
}

enum BrickStatus {
  ACTIVE,
  HIT
}

export type Coin = {
  symbol: string;
  name: string;
  color: string;
}

export default class Brick extends Circle {

  private domElement: HTMLElement | null;
  private status: BrickStatus;
  public coin: Coin;

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
    const image = require(`../assets/bricks/${this.coin.symbol.toLowerCase()}.png`);
    const container = super.createElement('brick', image)
    this.domElement = container;
    return container;
  }

  hit () {
    this.status = BrickStatus.HIT;
    this.domElement?.classList.add('brick-disappear');
  }

  update () {}

}
