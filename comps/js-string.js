"use strict";

import Radium from "radium";
import Textify from "./textify";

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
        display: "inline-block"
      },
      string: {
        backgroundColor: "#4d4f5e",
        color: "#ccf2b1"
      }
    };


    return (
      <div style={[styles.root]}>
        <Textify
          style={styles.string}
          value={str.value}
          onChange={(e) => this.handleChange({value: e.target.value})}
        />
      </div>
    );

  }
}

export default Radium(StringStatement);
