"use strict";

import Radium from "radium";
import {editor} from "../editor";

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

  componentWillUnmount = () => {
    this.cancelClaimFocus ? this.cancelClaimFocus() : "";
  }

  updateInputWidth = () => {
    if (this.sizer && this.sizer.scrollWidth !== this.state.sizerWidth) {
      this.setState({sizerWidth: this.sizer.scrollWidth});
    }
  }

  styles = () => {
    const width = this.state.sizerWidth ? this.state.sizerWidth + 5 : 50;
    const color = this.props.style ? this.props.style.color || "#000000" : "#000000";
    const shadow = `1px 1px 11px ${color}`;
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
      },
      button: {
        cursor: "pointer"
      },
      invalid: {
        color: "#fb4727"
      }
    };
  }

  handleStartEdit = () => {
    const that = this;

    this.cancelClaimFocus = editor.claimFocus(() => {
      that.handleEndEdit();
    });

    this.setState({
      editing: true,
      tmpValue: this.props.value,
      valid: true
    });
  }

  handleEndEdit = () => {
    this.cancelClaimFocus ? this.cancelClaimFocus() : "";

    this.setState({
      editing: false
    }, () => {
      if (this.props.onChange && this.state.valid) {
        this.props.onChange(this.state.tmpValue);
      }
    });
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleEndEdit();
    }
  }

  handleChange = (e) => {
    this.setState({
      tmpValue: e.target.value,
      valid: !this.props.regex || this.props.regex && this.props.regex.test(e.target.value)
    });
  }

  render() {

    const value = this.props.value;
    const styles = this.styles();

    if (this.state.editing) {
      const invalid = !this.state.valid ? <i className="fa fa-ban fa-fw" style={styles.invalid} aria-label="invalid"/> : "";

      return (
        <span
          style={[styles.string, styles.inputFont, styles.rounded, styles.shadow]}
        >
          <div
            onKeyPress={this.handleKeyPress}
            style={[styles.inputContainer]}
          >
            <input
              value={this.state.tmpValue}
              onChange={this.handleChange}
              type="text"
              style={[styles.input, styles.inputFont]}
              ref={(input) => { input && input.focus(); }}
              readOnly={this.props.onChange ? false : true}
            />
          </div>
          <span style={[styles.inputFont, styles.sizer]} ref={(sizer => {this.sizer = sizer})}>
            {this.state.tmpValue}
          </span>
          {invalid}
          {this.props.onRemove ? <span>&nbsp;<i onClick={this.props.onRemove} className="fa fa-times fa-fw" style={styles.button} aria-label="Remove Expression"/></span> : ""}
        </span>
      );
    }

    return (
      <span style={[styles.string, styles.inputFont, styles.rounded]} onClick={this.handleStartEdit}>
        {value.length > 0 ? value : "\"\""}
      </span>
    );
  }
}

export default Radium(Textify);
