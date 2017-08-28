"use strict";

import Radium from "radium";
import {findIndex} from "lodash/array";

import {editor} from "../editor";
import Statement from "./js-statement";

class Sequence extends React.Component {

  handleChangeStatement = (newValue, oldValue) => {

    let statements;

    if (oldValue) {
        statements = this.props.value.statements.map(curValue => {
          return oldValue.key === curValue.key ? newValue : curValue;
        });
    }else{
      statements = this.props.value.statements.map(curValue => {
        return newValue.key === curValue.key ? newValue : curValue;
      });
    }

    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      {
        statements
      }
    )) : "";
  }

  handleRemoveStatement = (removeValue) => {
    if (removeValue.type !== "control") {
      editor.controlClipboard.push(removeValue);
    }

    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      {
        statements: this.props.value.statements.filter(value => {
          return removeValue.key !== value.key;
        })
      }
    )) : "";
  }

  handleInsertStatement = (beforeValue, newValue) => {

    const insertIndex = findIndex(this.props.value.statements, ['key', beforeValue.key]);
    const newArr = this.props.value.statements.slice();
    newArr.splice(insertIndex > -1 ? insertIndex : newArr.length, 0, newValue);

    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      {
        statements: newArr
      }
    )) : "";
  }

  render() {

    const styles = {
      root: {
        display: "inline-block"
      },
      header: {
        display: "inline-block",
        padding: "3px",
        margin: "1px 1px",
        width: "1.5rem",
        height: "1.5rem",
        textAlign: "center",
        verticalAlign: "top",
        color: "#cdc8c8",
        cursor: "pointer",
        ":hover": {
          color: "#ffffff",
        }
      }
    };

    const sequence = this.props.value;

    return (
      <div style={styles.root}>
        {sequence.statements.map((statement, index) => {
          return (
            <div
              key={statement.key}
              style={{position: "relative"}}
            >
              <i
                className="fa fa-plus fa-fw"
                aria-label="Insert Control Statement"
                style={styles.header}
                key={statement.key+"insert"}
                onClick={() => this.handleInsertStatement(statement, editor.make.control())}
              />
              <Statement

                value={statement}
                onChange={this.handleChangeStatement}
              />
              <i
                className="fa fa-minus fa-fw"
                aria-label="Remove Control Statement"
                style={styles.header}
                key={statement.key+"remove"}
                onClick={() => this.handleRemoveStatement(statement)}
              />
            </div>
          );
        })}
        <i
          className="fa fa-plus"
          aria-label="Insert Control Statement"
          style={styles.header}
          key="end"
          onClick={() => this.handleInsertStatement({}, editor.make.control())}
        />
      </div>
    );
  }
}

export default Radium(Sequence);
