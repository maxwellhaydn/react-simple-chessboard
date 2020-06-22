import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChessboardJS from '@chrisoakman/chessboardjs';

const propTypes = {
    position: PropTypes.string
};

const Chessboard = ({ position }) => {
    const board = useRef(null);
    const container = useRef(null);

    // Lazily instantiate ChessboardJS object
    const getBoard = () => {
        if (board.current === null) {
            board.current = ChessboardJS(container.current);
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
        getBoard().position(position);
    }, [position]);

    return <div ref={container} />;
};

Chessboard.propTypes = propTypes;

export default Chessboard;
