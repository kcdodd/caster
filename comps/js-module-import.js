"use strict";

import Radium from "radium";
import Textify from "./textify";

class ImportStatement extends React.Component {

  handleChange = (newValue) => {

    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      newValue
    )) : "";
  }

  render() {

    const styles = {
      root: {
        padding: "3px"
      },
      keyword: {
        color: "#dc83fb"
      },
      name: {
        backgroundColor: "#4d4f5e",
        color: "#f99494"
      },
      from: {
        color: "#dc83fb"
      },
      module: {
        backgroundColor: "#4d4f5e",
        color: "#25a3ff"
      }
    };

    const imp = this.props.value;

    return (
      <div style={styles.root}>
        <span style={styles.keyword}>import&nbsp;</span>
        <Textify
          style={styles.name}
          value={imp.name}
          onChange={(e) => this.handleChange({name: e.target.value})}
        />
        <span style={styles.from}>&nbsp;from&nbsp;</span>
        <Textify
          style={styles.module}
          value={imp.module}
          onChange={(e) => this.handleChange({module: e.target.value})}
        />
      </div>
    );
  }
}

export default Radium(ImportStatement);
