import React, {Component} from 'react';
import {modes} from '../constants';
import Icon from '../Icon';
import _ from 'lodash';

import Vector from './Vector';

export default class Rect extends Vector {
  static meta = {
    icon   : <Icon icon={'rectangle'} size={30}/>,
    initial: {
      width      : 50,
      height     : 50,
      fill       : "transparent",
      stroke     : "red",
      strokeWidth: 10,
      radius     : 10,
      blendMode  : "normal",
      rotate     : 0
    }
  };

  render () {
    let {object, index} = this.props;
    return (
        <rect style={this.getStyle()}
              {...this.getObjectAttributes()}
              rx={object.radius}
              width={object.width}
              height={object.height}/>
    );
  }
}
