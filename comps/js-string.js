"use strict";

import Radium from "radium";

class StringStatement extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  componentDidMount() {
    this.updateInputWidth();
  }

  componentDidUpdate (prevProps, prevState) {
    this.updateInputWidth();
  }

  updateInputWidth = () => {
    if (this.sizer && this.sizer.scrollWidth !== this.state.sizerWidth) {
      this.setState({sizerWidth: this.sizer.scrollWidth})
    }
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

  handleChange = (newValue) => {

    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      newValue
    )) : "";
  }

  render() {

    const str = this.props.value;
    const width = this.state.sizerWidth ? this.state.sizerWidth + 5 : 10;

    const styles = {
      root: {
        display: "inline-block",
        color: "#ccf2b1"
      },
      inputFont: {
        fontSize: "1rem",
        color: "#ccf2b1",
        fontFamily: "Fira Mono, Courier, Helvetica, sans-serif"
      },
      rounded: {
        borderRadius: "5px"
      },
      shadow: {
        boxShadow: "1px 1px 11px #ccf2b1"
      },
      string: {
        height: "1rem",
        backgroundColor: "#4d4f5e"
      },
      inputContainer: {
        display: "inline-block",
        height: "1rem",
        overflow: "hidden",
        width: `${width}px`,
        backgroundColor: "#4d4f5e"
      },
      input: {
        background: "#4d4f5e",
        border: "none",
        height: "1rem",
        paddingLeft: "5px",
        width: `${width}px`
      },
      sizer: {
        position: 'absolute',
        top: 0,
        left: 0,
        visibility: 'hidden',
        height: 0,
        overflow: 'scroll',
        whiteSpace: 'pre'
      }
    };


    if (this.state.editing) {
      return (
        <div style={[styles.root]}>
          <span style={[styles.string, styles.inputFont, styles.rounded, styles.shadow]}>
            &quot;
            <div
              onBlur={this.handleBlur}
              onKeyPress={this.handleKeyPress}
              style={[styles.inputContainer]}
            >
              <input
                value={str.value}
                onChange={(e) => this.handleChange({value: e.target.value})}
                type="text"
                style={[styles.input, styles.inputFont]}
                ref={(input) => { this.stringEditor = input; }}
              />
            </div>
            &quot;
            <span style={[styles.inputFont, styles.sizer]} ref={(sizer => {this.sizer = sizer})}>
              {str.value}
            </span>
          </span>
        </div>
      );
    }

    return (
      <div style={styles.root}>
        <span style={[styles.string, styles.inputFont, styles.rounded]} onClick={this.handleClick}>&quot;{str.value}&quot;</span>
      </div>
    );
  }
}

export default Radium(StringStatement);
