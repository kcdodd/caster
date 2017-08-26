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

    const editor = this.props.value.editor;
    const make = this.props.value.editor.make;

    const paste = <span style={styles.type} key="paste" onClick={() => this.handleChange(editor.expressionClipboard.pop())}>paste ({editor.expressionClipboard.length})</span>;

    return (
      <div style={[styles.root, styles.rounded, styles.shadow]}>
        {editor.expressionClipboard.length > 0 ? paste : ""}
        <span style={styles.type} key="null" onClick={() => this.handleChange(make.null())}>null</span>
        <span style={styles.type} key="boolean" onClick={() => this.handleChange(make.boolean())}>boolean</span>
        <span style={styles.type} key="number" onClick={() => this.handleChange(make.number())}>number</span>
        <span style={styles.type} key="string" onClick={() => this.handleChange(make.string())}>string</span>
        <span style={styles.type} key="object" >object</span>
        <span style={styles.type} key="array" >array</span>
        <span style={styles.type} key="function" onClick={() => this.handleChange(make.function())}>function</span>
        <span style={styles.type} key="evaluate" >evaluate</span>
        <span style={styles.type} key="symbol" >symbol</span>
      </div>
    );
  }
}

export default Radium(Expression);
