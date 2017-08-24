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
        padding: "3px"
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
      <div style={styles.root}>
        <span style={styles.keyword}>const&nbsp;</span>
        <Textify
          style={styles.name}
          value={constant.name}
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
