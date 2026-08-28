import { useMemo, useState } from 'react';
import './App.css';
import Tile from './components/Tile';
import { PIECES, isSolved, newPuzzle } from './game';

export default function App() {
  const [tiles, setTiles] = useState(newPuzzle);
  const [moves, setMoves] = useState(0);
  const solved = useMemo(() => isSolved(tiles), [tiles]);

  const rotateTile = (index) => {
    if (solved) return;
    setTiles((prev) =>
      prev.map((tile, i) =>
        i === index ? { ...tile, rotation: tile.rotation + 1 } : tile
      )
    );
    setMoves((m) => m + 1);
  };

  const restart = () => {
    setTiles(newPuzzle());
    setMoves(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">NūDL</h1>
      </header>
      <p className="App-intro">
        {solved
          ? `untangled in ${moves} moves.`
          : 'click a tile to rotate it. connect all the pieces into one unbroken noodle.'}
      </p>
      <section className={`tile-container${solved ? ' solved' : ''}`}>
        {tiles.map((tile, i) => (
          <Tile
            key={i}
            image={PIECES[tile.piece].image}
            rotation={tile.rotation}
            onClick={() => rotateTile(i)}
          />
        ))}
      </section>
      <p className="App-status">
        <span className="move-counter">{moves} moves</span>
        <button className="new-game" onClick={restart}>
          new puzzle
        </button>
      </p>
    </div>
  );
}
