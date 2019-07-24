import React, {Component} from 'react';
import styles from './styles';
// import _ from 'lodash';
// import Icon from '../Icon';

class Column extends Component {
  constructor ( props ) {
    super( props );
    this.state = {
      selectionStartToRight: 0,
      keepCursorPosition   : false,
    };
    this.inputRef = React.createRef();
  }

  static defaultProps = {
    showIf: true
  };

  componentDidUpdate () {
    const {selectionStartToRight, keepCursorPosition} = this.state;
    if (keepCursorPosition) {
      const selectionStart = this.inputRef.current.value.length - selectionStartToRight;
      this.inputRef.current.setSelectionRange( selectionStart, selectionStart );
      this.setState( {keepCursorPosition: false} );
    }
  }

  render () {
    const props = this.props;
    const wrapperStyle = (!props.showIf) ? styles.empty : {...styles.column, ...props.style};

    return (
        <div style={wrapperStyle}>
          {props.children ||
          <input style={{...styles.input, ...styles.integerInput}} value={props.value}
                 ref={this.inputRef}
                 onChange={( e ) => props.onChange( e.target.value )}
                 onKeyDown={( e ) => this.onKeyDown( e, props.onChange )}/>}
          {props.label &&
          <div style={styles.inputHelper}>{props.label}</div>}
        </div>
    );

  }

  onKeyDown = ( e, onChange ) => {
    let step = 0;
    if (e.key === 'ArrowUp') {
      step = 1;
    } else if (e.key === 'ArrowDown') {
      step = -1;
    }
    if (step) {
      const selectionStart = Math.max( e.target.selectionStart, e.target.selectionEnd );
      const selectionStartToRight = e.target.value.length - selectionStart;
      const nextValue = getNewValue( e.target.value, selectionStart, step );
      this.setState( {
        selectionStartToRight: selectionStartToRight,
        keepCursorPosition   : true
      } );
      onChange( nextValue );
      e.preventDefault();
    } else {
      this.setState( {keepCursorPosition: false} );
    }
  };
}

export default Column;

function stringInsert ( string, index, val ) {
  return string.slice( 0, string.length - index ) + val + string.slice( string.length - index );
}

function getNewValue ( currentValue, selectionStart, step ) {
  const integer = String( Math.trunc( Math.abs( currentValue ) ) );
  // const integer =  String( currentValue ).split( "." )[0] || "";

  const decimal = String( currentValue ).split( "." )[1] || "";
  const sign = currentValue >= 0;

  // const removedDecimal = Math.trunc( Math.abs( currentValue * (10 ** decimal.length)) );
  // 上記の式は丸めこみが厳しかった。
  const removedDecimal = parseInt( integer + decimal );

  let magList = [0];
  magList = _.concat( magList, _.map( _.rangeRight( integer.length + decimal.length ), ( digit ) => {
        return Number( "1" + "0".repeat( digit ) )
      } )
  );

  //　小数点部分
  magList.splice( integer.length + 1, 0, 0 );

  if (!sign) {
    magList.unshift( 0 );
  }
  const mag = magList[selectionStart];
  const _sign = (sign) ? 1 : -1;
  return Number( stringInsert( String( removedDecimal * _sign + parseInt( mag * step ) ), decimal.length, "." ) );
}
