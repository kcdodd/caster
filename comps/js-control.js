"use strict";

import Radium from "radium";

import {editor} from "../editor";

class Control extends React.Component {
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
    ), this.props.value) : "";
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

    const paste = <span style={styles.type} key="paste" onClick={() => this.handleChange(editor.controlClipboard.pop())}>paste ({editor.controlClipboard.length})</span>;

    return (
      <div style={[styles.root, styles.rounded, styles.shadow]}>
        {editor.controlClipboard.length > 0 ? paste : ""}
        <span style={styles.type} key="define" onClick={() => this.handleChange(editor.make.define())}>define</span>
        <span style={styles.type} key="conditional" >conditional</span>
        <span style={styles.type} key="iterate" >iterate</span>
        <span style={styles.type} key="reassign" >reassign</span>
        <span style={styles.type} key="evaluate" >evaluate</span>
        <span style={styles.type} key="access" >access</span>
        <span style={styles.type} key="chain" >chain</span>
        <span style={styles.type} key="return" >return</span>
      </div>
    );
  }
}

export default Radium(Control);
