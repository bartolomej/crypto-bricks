import React from 'react';
import './style.css';
import Main from "./Main";


type Props = {
  width: number;
  height: number;
  rows: number;
  columns: number;
  onMissed: Function;
  onStart: Function;
  onScore: (coin: string) => void;
}

export default class Game extends React.Component<Props, any> {

  private el: HTMLElement | null;
  private game: Main | null;

  constructor (props: any) {
    super(props);
    this.el = null;
    this.game = null;
  }

  shouldComponentUpdate () {
    return false;
  }

  componentDidMount () {
    if (!this.el) return;
    this.el.style.width = `${this.props.width}px`
    this.el.style.height = `${this.props.height}px`
    this.game = new Main({
      container: this.el,
      rows: this.props.rows,
      columns: this.props.columns,
      onMissed: this.props.onMissed,
      onScore: this.props.onScore,
      onStart: this.props.onStart
    });
    this.game.initialize();
  }

  componentWillUnmount (): void {
    this.game?.destroy();
  }

  render () {
    return <div id="game-container" ref={el => this.el = el}/>;
  }

}
