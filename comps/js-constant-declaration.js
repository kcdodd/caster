"use strict";

import Radium from "radium";
import Statement from "./js-statement";

class ConstantDeclarationStatement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  handleClick = () => {
    this.setState({
      editing: true
    }, () => {
      this.nameEditor.focus();
    });
  }

  handleBlur = () => {
    this.setState({
      editing: false
    });
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.setState({
        editing: false
      });
    }
  }

  render() {
    const someConstant = "hello world!";
    const styles = {
      root: {
      },
      keyword: {
        color: "#dc83fb"
      },
      name: {
        color: "#f99494"
      },
      equals: {
        color: "#69cdff"
      },
      inputContainer: {
        display: "inline-block",
        height: "1rem",
        overflow: "hidden",
        width: "10rem",
        backgroundColor: "#4a4a49",
      },
      input: {
        background: "#4a4a49",
        color: "#f99494",
        border: "none",
        height: "1rem",
        paddingLeft: "5px",
        width: "10rem",
        fontSize: "1rem",
        fontFamily: "Fira Mono, Courier, Helvetica, sans-serif"
      }
    };

    const constant = this.props.value;

    if (this.state.editing) {
      return (
        <div style={styles.root}>
          <span style={styles.keyword}>const&nbsp;</span>
          <div onBlur={this.handleBlur} onKeyPress={this.handleKeyPress} style={[styles.inputContainer]} >
            <input value={constant.name} type="text" style={styles.input} ref={(input) => { this.nameEditor = input; }}  />
          </div>
          <span style={styles.equals}>&nbsp;=&nbsp;</span>
          <Statement value={constant.value} />
        </div>
      );
    }

    return (
      <div style={styles.root}>
        <span style={styles.keyword}>const&nbsp;</span>
        <span style={styles.name} onClick={this.handleClick}>{constant.name}</span>
        <span style={styles.equals}>&nbsp;=&nbsp;</span>
        <Statement value={constant.value} />
      </div>
    );
  }
}

export default Radium(ConstantDeclarationStatement);
