# react-simple-chessboard

A minimal React chessboard component that uses the popular
[chessboard.js](https://chessboardjs.com/) library.

react-simple-chessboard is "just a board," meaning that it doesn't provide move
validation, PGN parsing, AI, etc. All it does is show a chessboard with the
pieces in the given position, and optionally let you move pieces around with
drag and drop.

Table of Contents
=================

   * [Requirements](#requirements)
   * [Installation](#installation)
   * [Importing](#importing)
      * [CDN](#cdn)
   * [Usage](#usage)
      * [Controlled component](#controlled-component)
      * [Uncontrolled component](#uncontrolled-component)
   * [Integration with react-chess.js](#integration-with-react-chessjs)
   * [See also](#see-also)
   * [License](#license)

## Requirements

* jQuery 1.8.3+
* React 16.8.0+

These are peer dependencies, so you need to install them yourself; they will not
be installed automatically when you install react-simple-chessboard.

## Installation

    npm install --save react-simple-chessboard

## Importing

    import Chessboard from 'react-simple-chessboard'; // ES module
    const Chessboard = require('react-simple-chessboard'); // CommonJS

### CDN

If you don't want to import `Chessboard` into your application, you can load it
from the CDN and use it globally via `window.Chessboard`:

    <script src="https://unpkg.com/react-simple-chessboard"></script>

If you use the CDN, you must load jQuery and React first, e.g.

    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

## Usage

There are two ways to use the Chessboard component:

1. As a controlled component, where the state is managed by its parent
2. As an uncontrolled component, where it manages its own state

### Controlled component

To use Chessboard as a controlled component, set the `position` property:

    import React, { useState } from 'react';
    import Chessboard from 'react-simple-chessboard';

    const positions = [
        // 1. e4
        'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        // undo
        'start',
        // 1. e4
        'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        // 1. ... c5
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
        // 2. Nf3
        'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
    ];

    const App = props => {
        const [position, setPosition] = useState('start');

        return (
            <div className="app">
                <Chessboard position={position} />
                <button onClick={() => setPosition(positions.shift())}>
                    Move
                </button>
                <p>Position: {position}</p>
            </div>
        );
    };

`position` should be a string in [Forsyth-Edwards
Notation (FEN)](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation)
or the string `'start'` (the starting position). When the `position` prop
changes, the board updates to show the new position.

If drag-and-drop is enabled by setting the `draggable` property to true, you can
use the `onChange` handler to keep your state variable in sync with the board
position:

    import React, { useState } from 'react';
    import Chessboard from 'react-simple-chessboard';

    const App = props => {
        const [position, setPosition] = useState('start');

        return (
            <div className="app">
                <Chessboard
                    draggable={true}
                    position={position}
                    onChange={newPos => setPosition(newPos)}
                />
                <p>Position: {position}</p>
            </div>
        );
    };

### Uncontrolled component

To use Chessboard as an uncontrolled component, pass an initial position with
the `defaultPosition` property:

    import React from 'react';
    import Chessboard from 'react-simple-chessboard';

    const App = props => {
        return (
            <div className="app">
                <Chessboard draggable={true} defaultPosition="start" />
            </div>
        );
    };

This simply draws a chessboard in the given position. If drag-and-drop is
enabled by setting the `draggable` property to true, you can move pieces around
on the board, but you can't access the board's state.

## Integration with react-chess.js

You can integrate react-simple-chessboard with
[react-chess.js](https://github.com/maxwellhaydn/react-chess.js) to get move
validation and other features:

    import React, { useState } from 'react';
    import Chessboard from 'react-simple-chessboard';
    import useChess from 'react-chess.js';

    const moves = ['e4', 'e5', 'Ba8', 'Nf3'];

    const App = (props) => {
        const { move, fen, reset, undo } = useChess();

        return (
            <div className="app">
                <Chessboard position={fen} />

                <button onClick={() => move(moves.shift())}>Move</button>
                <button onClick={undo}>Undo</button>
                <button onClick={reset}>Reset</button>
            </div>
        );
    };

The third move in this example (Ba8) is illegal, so the board position will not
change the third time you click the "Move" button. See the
[react-chess.js](https://github.com/maxwellhaydn/react-chess.js) documentation
for details.

## See also

* [react-chess.js](https://github.com/maxwellhaydn/react-chess.js): React hook
for integrating with the chess.js library, giving move validation, piece
movement, and callbacks for legal moves, illegal moves, check, checkmate, etc.

* [Chessboard.jsx](https://www.chessboardjsx.com/): Another "just a board"
chessboard component for React, but with much more functionality than
react-simple-chessboard, including multiple boards and customizable pieces.
Unfortunately, it is currently unmaintained.

* [react-chess](https://github.com/rexxars/react-chess): Another React
chessboard component with more features than react-simple-chessboard, but less
than Chessboard.jsx. Also appears unmaintained.

## License

react-simple-chessboard is released under the [GPLv3 license](./LICENSE).

