import React, {Component} from 'react';
import _ from 'lodash';
import Icon from '../Icon';
import CustomInput from './CustomInput';
import styles from './styles';

const Column = ( {showIf = true, ...props} ) => {
  if (!showIf) {
    return <div style={styles.empty}/>;
  }

  return (
      <div className="react-designer-Column" style={{...styles.column, ...props.style}}>
        {props.children ||
        <CustomInput style={{...styles.input, ...styles.integerInput}} value={props.value}
                     onChange={props.onChange}/>
        }
        {props.label &&
        <div style={styles.inputHelper}>{props.label}</div>}
      </div>
  );
};

export default Column;
