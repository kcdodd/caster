"use strict";

import Radium from "radium";

import Sequence from "./js-sequence";


class FunctionStatement extends React.Component {

  handleChange = (newValue) => {
    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      newValue
    )) : "";
  }

  render() {

    const styles = {
      root: {
        display: "inline-block"
      },
      func: {
        color: "#ed801b"
      },
      parenth: {
        color: "#bfbfbf"
      },
      scope: {
        backgroundColor: "#999899",
        borderLeft: "2px solid #77defa",
        borderRight: "2px solid #fa7f77"
      },
      rounded: {
        borderRadius: "5px"
      },
    };

    const mod = this.props.value;

    return (
      <div style={[styles.root]}>
        <div>
          <span style={styles.parenth}>(</span>
          <span style={styles.parenth}>)</span>
          <span style={styles.parenth}>&nbsp;=>&nbsp;&#123;</span>
        </div>
        <div style={[styles.scope, styles.rounded]}>
          <Sequence value={mod.sequence} onChange={newValue => this.handleChange({sequence: newValue})} />
        </div>
        <div style={styles.parenth}>&#125;</div>
      </div>
    );
  }
}

export default Radium(FunctionStatement);
