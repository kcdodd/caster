"use strict";

import Radium from "radium";
import Textify from "./textify";

class NullStatement extends React.Component {

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
          onRemove={() => {this.props.onRemove ? this.props.onRemove(this.props.value) : ""}}
        />
      </div>
    );
  }
}

export default Radium(NullStatement);
