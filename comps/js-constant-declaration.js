"use strict";

import Radium from "radium";
import Statement from "./js-statement";
import Textify from "./textify";

class ConstantDeclarationStatement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

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
      equals: {
        color: "#69cdff"
      }
    };

    const constant = this.props.value;

    return (
      <div style={[styles.root, styles.rounded, styles.shadow]}>
        <span style={styles.keyword}>const&nbsp;</span>
        <Textify
          style={styles.name}
          value={constant.name}
          regex={/^[a-zA-Z_][a-zA-Z0-9_]*$/}
          onChange={(e) => this.handleChange({name: e.target.value})}
        />
        <span style={styles.equals}>&nbsp;=&nbsp;</span>
        <Statement
          value={constant.value}
          onChange={(newValue) => this.handleChange({value: newValue})}
        />
      </div>
    );
  }
}

export default Radium(ConstantDeclarationStatement);
