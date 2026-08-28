// Directions: 0 = up, 1 = right, 2 = down, 3 = left.
// Each piece lists the edges its noodle arms touch at rotation 0;
// rotating a tile clockwise by r quarter-turns maps direction d to (d + r) % 4.

export const GRID_SIZE = 5;

export const PIECES = {
  a: { image: 'images/a.png', dirs: [0, 1, 3] }, // T-junction
  b: { image: 'images/b.png', dirs: [0, 1] }, // elbow
  c: { image: 'images/c.png', dirs: [0, 2] }, // straight
  d: { image: 'images/d.png', dirs: [0] }, // dead end
};

const DELTAS = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

const opposite = (dir) => (dir + 2) % 4;

const dirsAt = (piece, rotation) =>
  PIECES[piece].dirs.map((d) => (d + rotation) % 4);

const dirKey = (dirs) => [...dirs].sort().join('');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Randomized DFS spanning tree over the grid, capped at three arms per cell
// (there is no four-way piece). Returns one direction set per cell, or null
// when the degree cap strands a cell — the caller just tries again.
function growNoodle() {
  const cells = GRID_SIZE * GRID_SIZE;
  const arms = Array.from({ length: cells }, () => new Set());
  const visited = new Array(cells).fill(false);
  const stack = [Math.floor(Math.random() * cells)];
  visited[stack[0]] = true;

  while (stack.length > 0) {
    const cell = stack[stack.length - 1];
    const row = Math.floor(cell / GRID_SIZE);
    const col = cell % GRID_SIZE;
    const options = shuffle(
      DELTAS.map(([dr, dc], dir) => ({ dir, row: row + dr, col: col + dc }))
    ).filter(
      (n) =>
        n.row >= 0 && n.row < GRID_SIZE && n.col >= 0 && n.col < GRID_SIZE &&
        !visited[n.row * GRID_SIZE + n.col]
    );
    if (options.length === 0 || arms[cell].size >= 3) {
      stack.pop();
      continue;
    }
    const next = options[0];
    const nextCell = next.row * GRID_SIZE + next.col;
    arms[cell].add(next.dir);
    arms[nextCell].add(opposite(next.dir));
    visited[nextCell] = true;
    stack.push(nextCell);
  }

  return visited.every(Boolean) ? arms : null;
}

function pieceFor(dirs) {
  const key = dirKey([...dirs]);
  for (const piece of Object.keys(PIECES)) {
    for (let rotation = 0; rotation < 4; rotation++) {
      if (dirKey(dirsAt(piece, rotation)) === key) return { piece, rotation };
    }
  }
  throw new Error(`no piece matches direction set ${key}`);
}

export function isSolved(tiles) {
  const armSets = tiles.map((t) => new Set(dirsAt(t.piece, t.rotation % 4)));

  // Every arm must meet a matching arm on the neighboring tile.
  for (let cell = 0; cell < tiles.length; cell++) {
    const row = Math.floor(cell / GRID_SIZE);
    const col = cell % GRID_SIZE;
    for (const dir of armSets[cell]) {
      const [dr, dc] = DELTAS[dir];
      const [nr, nc] = [row + dr, col + dc];
      if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE) return false;
      if (!armSets[nr * GRID_SIZE + nc].has(opposite(dir))) return false;
    }
  }

  // And every tile must belong to a single connected noodle.
  const seen = new Set([0]);
  const queue = [0];
  while (queue.length > 0) {
    const cell = queue.pop();
    for (const dir of armSets[cell]) {
      const [dr, dc] = DELTAS[dir];
      const next = (Math.floor(cell / GRID_SIZE) + dr) * GRID_SIZE +
        (cell % GRID_SIZE) + dc;
      if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  return seen.size === tiles.length;
}

export function newPuzzle() {
  let arms = null;
  while (arms === null) arms = growNoodle();
  let tiles;
  do {
    tiles = arms.map((dirs) => {
      const { piece, rotation } = pieceFor(dirs);
      return { piece, rotation: rotation + Math.floor(Math.random() * 4) };
    });
  } while (isSolved(tiles));
  return tiles;
}
