"use strict";

import Radium from "radium";

class Layout extends React.Component {

  render() {

    const styles = {
      root: {
        textAlign: "left",
        width: "100%"
      }
    };

    return (
      <div style={styles.root}>
        {this.props.children}
      </div>
    );
  }
}

export default Radium(Layout);
