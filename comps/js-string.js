"use strict";

import Radium from "radium";

class StringStatement extends React.Component {

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
      this.stringEditor.focus();
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


    const styles = {
      root: {
        display: "inline-block",
        color: "#ccf2b1"
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
        color: "#ccf2b1",
        border: "none",
        height: "1rem",
        paddingLeft: "5px",
        width: "10rem",
        fontSize: "1rem",
        fontFamily: "Fira Mono, Courier, Helvetica, sans-serif"
      }
    };

    const str = this.props.value;

    if (this.state.editing) {
      return (
        <div style={styles.root}>
          &quot;
          <div onBlur={this.handleBlur} onKeyPress={this.handleKeyPress} style={[styles.inputContainer]} >
            <input value={str.value} type="text" style={styles.input} ref={(input) => { this.stringEditor = input; }}  />
          </div>
          &quot;
        </div>
      );
    }

    return (
      <div onClick={this.handleClick} style={styles.root}>
        &quot;{str.value}&quot;
      </div>
    );
  }
}

export default Radium(StringStatement);
