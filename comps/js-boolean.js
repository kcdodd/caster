"use strict";

import Radium from "radium";
import Selectify from "./selectify";

class BooleanStatement extends React.Component {

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

    const bool = this.props.value;

    const styles = {
      root: {
        backgroundColor: "#4d4f5e",
        color: "#f7fa66"
      }
    };

    const str = bool.value === true ? "true" : "false";

    return (
      <Selectify
        value={str}
        options={["true", "false"]}
        onChange={newValue => this.handleChange({value: newValue === "true"})}
        onRemove={this.handleRemove}
        style={styles.root}
      />
    );
  }
}

export default Radium(BooleanStatement);
