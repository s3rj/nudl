import './Tile.css';

export default function Tile({ image, rotation, onClick }) {
  return (
    <button type="button" className="tile" onClick={onClick} aria-label="rotate tile">
      <img
        src={image}
        alt=""
        draggable="false"
        style={{ transform: `rotate(${rotation * 90}deg)` }}
      />
    </button>
  );
}
