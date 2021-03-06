"use strict";

import Radium from "radium";

import Sequence from "./js-sequence";
import Arguments from "./js-arguments";

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
        display: "inline-block",
        padding: "3px 3px",
        margin: "3px 3px",
        backgroundColor: "#7d7048",
        borderLeft: "2px solid #d0b665",
        borderRight: "2px solid #d06138",
      },
      args: {
        display: "inline-block",
        color: "#bfbfbf",
        verticalAlign: "top",
        backgroundColor: "#999899",
        borderLeft: "2px solid #e2d961",
        borderRight: "2px solid #77defa"
      },
      arrow: {
        color: "#77defa",
        display: "inline-block"
      },
      scope: {
        display: "inline-block",
        verticalAlign: "top",
        backgroundColor: "#999899",
        borderLeft: "2px solid #77defa",
        borderRight: "2px solid #fa7f77"
      },
      rounded: {
        borderRadius: "5px"
      },
      remove: {
        color: "#d0b665",
        textAlign: "right"
      },
      button: {
        cursor: "pointer"
      }
    };

    const f = this.props.value;

    return (
      <div style={[styles.root, styles.rounded]}>
        {this.props.onRemove ? <div style={styles.remove}>&nbsp;<i onClick={() => {this.props.onRemove ? this.props.onRemove(this.props.value) : ""}} className="fa fa-times fa-fw" style={styles.button} aria-label="Remove Expression"/></div> : ""}
        &nbsp;&nbsp;
        <div style={[styles.args, styles.rounded]}>
          <Arguments arguments={f.args}/>
        </div>
        <div style={styles.arrow}>&nbsp;<i className="fa fa-long-arrow-right" aria-hidden="true"></i>&nbsp;</div>
        <div style={[styles.scope, styles.rounded]}>
          <Sequence value={f.sequence} onChange={newValue => this.handleChange({sequence: newValue})} />
        </div>
      </div>
    );
  }
}

export default Radium(FunctionStatement);
