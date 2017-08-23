"use strict";

import Radium from "radium";

import Imports from "./js-imports";
import Exports from "./js-exports";
import Sequence from "./js-sequence";


class Module extends React.Component {

  handleChangeMerge = (newValue) => {
    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      newValue
    )) : "";
  }

  render() {

    const styles = {
      root: {
      }
    };

    const mod = this.props.value;

    return (
      <div style={styles.root}>
        <Imports value={mod.imports} onChange={newValue => this.handleChangeMerge({imports: newValue})} />
        <Sequence value={mod.sequence} onChange={newValue => this.handleChangeMerge({sequence: newValue})}/>
        <Exports value={mod.exports} onChange={newValue => this.handleChangeMerge({exports: newValue})} />
      </div>
    );
  }
}

export default Radium(Module);
