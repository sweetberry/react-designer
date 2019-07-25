import React, {Component} from 'react';
import _ from 'lodash';
import Icon from '../Icon';

import styles from './styles';

const PropertyGroup = ({showIf=true, ...props}) => {
  if (!showIf) {
    return <div style={styles.empty} />;
  }
  return (
    <div className="react-designer-PropertyGroup" style={styles.propertyGroup}>
      {props.children}
    </div>
  );
};

export default PropertyGroup;
