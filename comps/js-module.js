"use strict";

import Radium from "radium";

import ModuleImport from "./js-module-import";
import ModuleExport from "./js-module-export";
import Sequence from "./js-sequence";

class Module extends React.Component {

  render() {

    const styles = {
      root: {
      }
    };

    return (
      <div style={styles.root}>
        {this.props.value.imports.map(moduleImport => {
          return (<ModuleImport key={moduleImport.name} value={moduleImport} />);
        })}

        <Sequence value={this.props.value.sequence} />

        {this.props.value.exports.map(moduleExport => {
          return (<ModuleExport key={moduleExport.name} value={moduleExport} />);
        })}
      </div>
    );
  }
}

export default Radium(Module);
