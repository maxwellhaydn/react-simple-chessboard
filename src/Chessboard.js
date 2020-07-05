import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useUncontrolled } from 'uncontrollable';
import ChessboardJS from '@chrisoakman/chessboardjs';

import '@chrisoakman/chessboardjs.css';

const propTypes = {
    position: PropTypes.string,
    onChange: PropTypes.func,
    draggable: PropTypes.bool
};

const Chessboard = ({ position, onChange, draggable }) => {
    const board = useRef(null);
    const container = useRef(null);

    // Lazily instantiate ChessboardJS object
    const getBoard = () => {
        if (board.current === null) {
            board.current = ChessboardJS(container.current, {
                pieceTheme: (piece) => require(`img/${piece}.png`),
                onChange: (oldPosition, newPosition) => {
                    onChange(ChessboardJS.objToFen(newPosition));
                },
                position,
                draggable,
            });
        }

        return board.current;
    };

    // Clean up ChessboardJS object on unmount
    useEffect(() => {
        return () => {
            if (board.current) board.current.destroy();
        };
    }, [board]);

    useEffect(() => {
        // Update position of ChessboardJS object. Use animation only if pieces
        // are not draggable, since if a user drags and drops a piece, there's
        // no need to show it moving to its destination; the user already moved
        // it there.
        getBoard().position(position, !draggable);
    }, [position]);

    return <div ref={container} />;
};

Chessboard.propTypes = propTypes;

// Allow Chessboard to be either a controlled component (parent manages its
// state) or an uncontrolled component (manages its own state)
const UncontrollableChessboard = props => {
    const controlledProps = useUncontrolled(props, {
        position: 'onChange'
    });

    return <Chessboard {...controlledProps} />;
};

export default UncontrollableChessboard;
