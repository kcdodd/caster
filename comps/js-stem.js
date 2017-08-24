"use strict";

import Radium from "radium";

class Stem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

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
        padding: "3px",
        margin: "1px 1px",
        backgroundColor: "#61626f"
      },
      rounded: {
        borderRadius: "5px"
      },
      shadow: {
        boxShadow: `1px 1px 11px #2f3039`
      },
      type: {
        display: "block",
        color: "#ffffff",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#2f3039"
        }
      }
    };

    const constant = this.props.value;

    return (
      <div style={[styles.root, styles.rounded, styles.shadow]}>
        <span style={styles.type} key="paste">paste&nbsp;</span>
        <span style={styles.type} key="constant" onClick={() => this.handleChange({type: "constant-declaration", name: "newConstant", value: {type: "null"}})}>constant&nbsp;</span>
        <span style={styles.type} key="variable" >variable&nbsp;</span>
        <span style={styles.type} key="assignment" >assignment&nbsp;</span>
        <span style={styles.type} key="evaluate" >evaluate&nbsp;</span>
        <span style={styles.type} key="chain" >chain&nbsp;</span>
        <span style={styles.type} key="return" >return&nbsp;</span>
      </div>
    );
  }
}

export default Radium(Stem);
