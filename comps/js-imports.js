"use strict";

import Radium from "radium";

import ModuleImport from "./js-module-import";

class Imports extends React.Component {

  render() {

    const styles = {
      root: {
      }
    };

    return (
      <div style={styles.root}>
        {this.props.value.statements.map(statement => {
          return (<ModuleImport key={statement.key} value={statement} />);
        })}
      </div>
    );
  }
}

export default Radium(Imports);
