"use strict";

import Radium from "radium";

class Layout extends React.Component {

  render() {

    const styles = {
      root: {
        textAlign: "center",
        width: "100%",
        height: "20em",
      },
      vmiddle: {
        margin: "0px",
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)"
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
