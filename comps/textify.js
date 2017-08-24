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
      this.setState({sizerWidth: this.sizer.scrollWidth});
    }
  }

  styles = () => {
    const width = this.state.sizerWidth ? this.state.sizerWidth + 5 : 50;
    const color = this.props.style ? this.props.style.color || "#000000" : "#000000";
    const shadow = `1px 1px 11px ${this.props.style ? this.props.style.color || "#000000" : "#000000"}`;
    const background = this.props.style ? this.props.style.backgroundColor || "#ffffff" : "#ffffff";


    return {
      inputFont: {
        fontSize: "1rem",
        color: this.props.style.color,
        fontFamily: "Fira Mono, Courier, Helvetica, sans-serif"
      },
      rounded: {
        borderRadius: "5px"
      },
      shadow: {
        boxShadow: shadow
      },
      string: {
        height: "1rem",
        backgroundColor: background,
        padding: "0px 5px"
      },
      inputContainer: {
        display: "inline-block",
        height: "1rem",
        overflow: "visible",
        width: `${width}px`,
        backgroundColor: background
      },
      input: {
        background: background,
        border: "none",
        height: "1rem",
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

  handleChange = (e) => {
    if (this.props.regex && !this.props.regex.test(e.target.value)){
      return;
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render() {

    const value = this.props.value;
    const styles = this.styles();

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
              onChange={this.handleChange}
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
