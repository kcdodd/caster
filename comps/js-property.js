"use strict";

import Radium from "radium";

import {editor} from "../editor";
import Statement from "./js-statement";
import Textify from "./textify";

class PropertyStatement extends React.Component {

  handleChange = (newValue) => {

    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      newValue
    )) : "";
  }

  handleRemoveValue = (removeValue) => {
    if (removeValue.type !== "expression") {
      editor.expressionClipboard.push(removeValue);
    }

    this.handleChange({value: editor.make.expression()});
  }

  render() {

    const styles = {
      root: {
        display: "inline-block",
        padding: "3px",
        margin: "1px 1px",
        backgroundColor: "#629582"
      },
      rounded: {
        borderRadius: "5px"
      },
      shadow: {
        boxShadow: `1px 1px 11px #2f3039`
      },
      name: {
        backgroundColor: "#4d4f5e",
        color: "#ccf2b1"
      },
      colon: {
        color: "#69cdff"
      },
      top: {
        display: "inline-block",
        verticalAlign: "top"
      }
    };

    const property = this.props.value;

    return (
      <div style={[styles.root, styles.rounded, styles.shadow]}>
        <div style={styles.top}>
          <Textify
            style={styles.name}
            value={property.name}
            onChange={(newValue) => this.handleChange({name: newValue})}
          />
          <span style={styles.colon}>&nbsp;:&nbsp;</span>
        </div>
        <Statement
          value={property.value}
          onChange={(newValue) => this.handleChange({value: newValue})}
          onRemove={this.handleRemoveValue}
        />
      </div>
    );
  }
}

export default Radium(PropertyStatement);
