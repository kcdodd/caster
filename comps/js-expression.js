"use strict";

import Radium from "radium";

class Expression extends React.Component {
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

    return (
      <div style={[styles.root, styles.rounded, styles.shadow]}>
        <span style={styles.type} key="paste">paste</span>
        <span style={styles.type} key="null" onClick={() => this.handleChange({type: "null"})}>null</span>
        <span style={styles.type} key="boolean" onClick={() => this.handleChange({type: "boolean", value: false})}>boolean</span>
        <span style={styles.type} key="number" onClick={() => this.handleChange({type: "number", value: 0})}>number</span>
        <span style={styles.type} key="string" onClick={() => this.handleChange({type: "string", value: ""})}>string</span>
        <span style={styles.type} key="object" >object</span>
        <span style={styles.type} key="array" >array</span>
        <span style={styles.type} key="function" >function</span>
        <span style={styles.type} key="evaluate" >evaluate</span>
      </div>
    );
  }
}

export default Radium(Expression);
