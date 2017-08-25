"use strict";

import Radium from "radium";
import Textify from "./textify";

class NumberStatement extends React.Component {

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

  handleRemove = () => {
    this.props.onChange ? this.props.onChange({
      type: "expression"
    }) : "";
  }

  render() {

    const num = this.props.value;

    const styles = {
      root: {
        display: "inline-block"
      },
      string: {
        backgroundColor: "#4d4f5e",
        color: "#b1c5f2"
      }
    };


    return (
      <div style={[styles.root]}>
        <Textify
          style={styles.string}
          value={"" + num.value}
          regex={/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/}
          onChange={(newValue) => this.handleChange({value: parseFloat(newValue)})}
          onRemove={this.handleRemove}
        />
      </div>
    );

  }
}

export default Radium(NumberStatement);
