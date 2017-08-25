"use strict";

import Radium from "radium";
import Textify from "./textify";

class NullStatement extends React.Component {
  handleRemove = () => {
    this.props.onChange ? this.props.onChange({
      type: "expression"
    }) : "";
  }
  render() {

    const styles = {
      root: {
        color: "#ebb458",
        display: "inline-block"
      },
      null: {
        backgroundColor: "#4d4f5e",
        color: "#ebb458"
      },
    };

    return (
      <div style={[styles.root]}>
        <Textify
          style={styles.null}
          value={"null"}
          onRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default Radium(NullStatement);
