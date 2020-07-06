/**
 * Define the `Chessboard` React component
 *
 * Copyright © 2020 Maxwell Carey
 *
 * This file is part of react-simple-chessboard.
 *
 * react-simple-chessboard is free software: you can redistribute it
 * and/or modify it under the terms of the GNU General Public License
 * version 3, as published by the Free Software Foundation.
 *
 * react-simple-chessboard is distributed in the hope that it will be
 * useful, but WITHOUT ANY WARRANTY; without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
