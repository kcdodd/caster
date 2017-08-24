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
        display: "inline-block",
        padding: "3px",
        margin: "1px 1px",
        backgroundColor: "#2f3039"
      },
      rounded: {
        borderRadius: "5px"
      },
      shadow: {
        boxShadow: `1px 1px 11px #2f3039`
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
        color: "#77defa"
      }
    };

    const imp = this.props.value;

    return (
      <div style={[styles.root, styles.rounded, styles.shadow]}>
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
