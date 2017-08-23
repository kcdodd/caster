"use strict";

import Radium from "radium";

import ModuleExport from "./js-module-export";

class Exports extends React.Component {

  render() {

    const styles = {
      root: {
      }
    };

    return (
      <div style={styles.root}>
        {this.props.value.statements.map(statement => {
          return (<ModuleExport key={statement.key} value={statement} />);
        })}
      </div>
    );
  }
}

export default Radium(Exports);
