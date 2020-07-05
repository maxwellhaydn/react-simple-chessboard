import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import ChessboardJS from '@chrisoakman/chessboardjs';

import Chessboard from './Chessboard';

const mockPosition = jest.fn();

jest.mock('@chrisoakman/chessboardjs', () => jest.fn(() => ({
    position: mockPosition
})));

describe('Chessboard component', () => {

    beforeEach(() => jest.clearAllMocks());

    describe('controlled', () => {

        it('should update chessboardjs position when position prop changes', () => {
            const wrapper = mount(<Chessboard position="foo" />);

            expect(mockPosition).to.have.beenCalledWith('foo', true);
        });

    });

    describe('uncontrolled', () => {

        it('should initialize the board to defaultPosition', () => {
            const wrapper = mount(<Chessboard defaultPosition="foo" />);

            const [lastCall] = ChessboardJS.mock.calls.slice(-1);
            const position = lastCall[1].position;

            expect(position).to.equal('foo');
        });

    });

});
