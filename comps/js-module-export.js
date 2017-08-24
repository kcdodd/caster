"use strict";

import Radium from "radium";
import Statement from "./js-statement";
import Textify from "./textify";

class ExportStatement extends React.Component {

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
      },
      subject: {
        verticalAlign: "top",
        display: "inline-block"
      }
    };

    const exp = this.props.value;

    return (
      <div style={styles.root}>
        <div style={styles.subject}>
          <span style={styles.keyword}>export&nbsp;</span>
          <Textify
            style={styles.name}
            value={exp.name}
            onChange={(e) => this.handleChange({name: e.target.value})}
          />
          &nbsp;
        </div>
        <Statement
          value={exp.value}
          onChange={(newValue) => this.handleChange({value: newValue})}
        />
      </div>
    );
  }
}

export default Radium(ExportStatement);
