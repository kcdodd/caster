"use strict";

import Radium from "radium";

class NullStatement extends React.Component {

  render() {

    const styles = {
      root: {
        color: "#ebb458",
        display: "inline-block"
      }
    };

    return (
      <div style={styles.root}>
        null
      </div>
    );
  }
}

export default Radium(NullStatement);
