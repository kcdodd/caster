"use strict";

import Radium from "radium";
import Statement from "./js-statement";
import Textify from "./textify";
import Selectify from "./selectify";

class DefineStatement extends React.Component {
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

  handleRemoveValue = (removeValue) => {
    if (removeValue.type !== "expression") {
      removeValue.editor.expressionClipboard.push(removeValue);
    }

    this.handleChange({value: this.props.value.editor.make.expression()});
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
        backgroundColor: "#4d4f5e",
        color: "#dc83fb"
      },
      name: {
        backgroundColor: "#4d4f5e",
        color: "#f99494"
      },
      equals: {
        color: "#69cdff"
      },
      top: {
        display: "inline-block",
        verticalAlign: "top"
      }
    };

    const definition = this.props.value;
    const str = definition.constant ? "const" : "let";

    return (
      <div style={[styles.root, styles.rounded, styles.shadow]}>
        <div style={styles.top}>
          <Selectify
            value={str}
            options={["const", "let"]}
            onChange={newValue => this.handleChange({constant: newValue === "const"})}
            style={styles.keyword}
          />
          &nbsp;
          <Textify
            style={styles.name}
            value={definition.name}
            regex={/^[a-zA-Z_][a-zA-Z0-9_]*$/}
            onChange={(newValue) => this.handleChange({name: newValue})}
          />
          <span style={styles.equals}>&nbsp;=&nbsp;</span>
        </div>
        <Statement
          value={definition.value}
          onChange={(newValue) => this.handleChange({value: newValue})}
          onRemove={this.handleRemoveValue}
        />
      </div>
    );
  }
}

export default Radium(DefineStatement);
