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

  handleChange = (newValue) => {

    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      newValue
    )) : "";
  }

  render() {

    const width = this.state.sizerWidth ? this.state.sizerWidth + 5 : 10;

    const styles = {
      root: {
        padding: "3px"
      },
      keyword: {
        color: "#dc83fb"
      },
      name: {
        color: "#f99494",
        height: "1rem",
        backgroundColor: "#4d4f5e"
      },
      equals: {
        color: "#69cdff"
      },
      inputFont: {
        fontSize: "1rem",
        color: "#f99494",
        fontFamily: "Fira Mono, Courier, Helvetica, sans-serif"
      },
      rounded: {
        borderRadius: "5px"
      },
      shadow: {
        boxShadow: "1px 1px 11px #f99494"
      },
      inputContainer: {
        display: "inline-block",
        height: "1rem",
        overflow: "hidden",
        width: `${width}px`,
        backgroundColor: "#4a4a49",
      },
      input: {
        background: "#4a4a49",
        border: "none",
        height: "1rem",
        paddingLeft: "5px",
        width: `${width}px`,
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

    const constant = this.props.value;

    if (this.state.editing) {
      return (
        <div style={styles.root}>
          <span style={styles.keyword}>const&nbsp;</span>
          <span style={[styles.name, styles.inputFont, styles.rounded, styles.shadow]}>
            <div
              onBlur={this.handleBlur}
              onKeyPress={this.handleKeyPress}
              style={[styles.inputContainer]}
            >
              <input
                value={constant.name}
                onChange={(e) => this.handleChange({name: e.target.value})}
                type="text"
                style={[styles.input, styles.inputFont]}
                ref={(input) => { this.nameEditor = input; }}
              />
            </div>
          </span>
          <span style={[styles.inputFont, styles.sizer]} ref={(sizer => {this.sizer = sizer})}>
            {constant.name}
          </span>
          <span style={styles.equals}>&nbsp;=&nbsp;</span>
          <Statement
            value={constant.value}
            onChange={(newValue) => this.handleChange({value: newValue})}
          />

        </div>
      );
    }

    return (
      <div style={styles.root}>
        <span style={styles.keyword}>const&nbsp;</span>
        <span style={[styles.name, styles.inputFont, styles.rounded]} onClick={this.handleClick}>{constant.name}</span>
        <span style={styles.equals}>&nbsp;=&nbsp;</span>
        <Statement
          value={constant.value}
          onChange={(newValue) => this.handleChange({value: newValue})}
        />
      </div>
    );
  }
}

export default Radium(ConstantDeclarationStatement);
