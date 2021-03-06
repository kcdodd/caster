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

  handleChange = (newValue) => {

    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      newValue
    )) : "";
  }

  render() {

    const str = this.props.value;

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
          onChange={(newValue) => this.handleChange({value: newValue})}
          onRemove={() => {this.props.onRemove ? this.props.onRemove(this.props.value) : ""}}
        />
      </div>
    );

  }
}

export default Radium(StringStatement);
