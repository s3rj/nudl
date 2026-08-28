# NūDL

A tiny noodle-untangling puzzle. Every tile holds a piece of one continuous
noodle — a straight, an elbow, a T-junction, or a dead end. Click a tile to
rotate it a quarter turn. When every arm meets a matching arm on its neighbor
and the whole noodle connects, you win.

Each puzzle is generated fresh: a random noodle is grown over the 5×5 grid,
then scrambled.

## Running it

```sh
npm install
npm start
```

Then open the URL Vite prints (http://localhost:5173 by default).

`npm run build` produces a static production build in `dist/`.

Built with [React](https://react.dev) and [Vite](https://vitejs.dev).
