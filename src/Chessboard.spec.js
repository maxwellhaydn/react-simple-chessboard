import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Chessboard from './Chessboard';

const mockPosition = jest.fn();

jest.mock('@chrisoakman/chessboardjs', () => () => ({
    position: mockPosition
}));

describe('Chessboard component', () => {

    it('should call the position method when position prop changes', () => {
        const wrapper = mount(<Chessboard position="foo" />);

        expect(mockPosition).to.have.beenCalledWith('foo');
    });

});
