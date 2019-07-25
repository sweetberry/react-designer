import React, {Component} from 'react';
import {modes} from '../constants';
import Icon from '../Icon';
import _ from 'lodash';

import Vector from './Vector';

export default class Arrow extends Vector {
  static meta = {
    icon   : <Icon icon={'arrow'} size={30}/>,
    initial: {
      width      : 50,
      height     : 200,
      stroke     : "red",
      strokeWidth: 1,
      fill       : "red",
      blendMode  : "normal",
      rotate     : 0
    }
  };

  render () {
    let {object, index, fill, stroke} = this.props;
    return (
        <g {...this.getObjectAttributes()}>
          <g transform={`translate(${object.x} ${object.y})`}>
            <g transform={` scale(${object.width * 0.02} ${object.height * 0.005})  `}
               fill={fill}
               stroke={stroke}>
              <path style={this.getStyle()} d={"M25 0 L50 45 L35 45 L35 200 L15 200 L15 45 L0 45 Z"}/>
            </g>
          </g>
        </g>
    );
  }
}
