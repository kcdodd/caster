"use strict";

import Radium from "radium";

import Statement from "./js-statement";

class Sequence extends React.Component {

  render() {

    const styles = {
      root: {
      }
    };

    return (
      <div style={styles.root}>
        {this.props.value.statements.map(statement => {
          return (<Statement key={statement.key} value={statement} />);
        })}
      </div>
    );
  }
}

export default Radium(Sequence);
