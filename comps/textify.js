"use strict";

import Radium from "radium";

class Textify extends React.Component {

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

  render() {

    const value = this.props.value;
    const width = this.state.sizerWidth ? this.state.sizerWidth + 5 : 10;

    const styles = {
      inputFont: {
        fontSize: "1rem",
        color: this.props.style.color,
        fontFamily: "Fira Mono, Courier, Helvetica, sans-serif"
      },
      rounded: {
        borderRadius: "5px"
      },
      shadow: {
        boxShadow: `1px 1px 11px ${this.props.style.color}`
      },
      string: {
        height: "1rem",
        backgroundColor: this.props.style.backgroundColor
      },
      inputContainer: {
        display: "inline-block",
        height: "1rem",
        overflow: "hidden",
        width: `${width}px`,
        backgroundColor: this.props.style.backgroundColor
      },
      input: {
        background: this.props.style.backgroundColor,
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
        <span style={[styles.string, styles.inputFont, styles.rounded, styles.shadow]}>
          <div
            onBlur={this.handleBlur}
            onKeyPress={this.handleKeyPress}
            style={[styles.inputContainer]}
          >
            <input
              value={value}
              onChange={this.props.onChange}
              type="text"
              style={[styles.input, styles.inputFont]}
              ref={(input) => { this.stringEditor = input; }}
            />
          </div>
          <span style={[styles.inputFont, styles.sizer]} ref={(sizer => {this.sizer = sizer})}>
            {value}
          </span>
        </span>
      );
    }

    return (
      <span style={[styles.string, styles.inputFont, styles.rounded]} onClick={this.handleClick}>{value}</span>
    );
  }
}

export default Radium(Textify);
