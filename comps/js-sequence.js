"use strict";

import Radium from "radium";
import {findIndex} from "lodash/array";

import Statement from "./js-statement";

class Sequence extends React.Component {

  handleChangeStatement = newValue => {

    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      {
        statements: this.props.value.statements.map(oldValue => {
          return newValue.key === oldValue.key ? newValue : oldValue;
        })
      }
    )) : "";
  }

  handleRemoveStatement = (removeValue) => {
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
        fontSize: "1rem",
        color: "#ffffff",
        fontFamily: "Fira Mono, Courier, Helvetica, sans-serif",
        cursor: "pointer"
      }
    };

    const sequence = this.props.value;

    return (
      <div style={styles.root}>
        {sequence.statements.map((statement, index) => {
          return (
            <div style={{position: "relative"}}>
              <div style={styles.header} onClick={() => this.handleInsertStatement(statement, {})}>&#43;</div>
              <Statement
                key={statement.key}
                value={statement}
                onChange={this.handleChangeStatement}
              />
              <span style={styles.header} onClick={() => this.handleRemoveStatement(statement)}>&#45;</span>
            </div>
          );
        })}
        <span style={styles.header} onClick={() => this.handleInsertStatement({}, {type: "stem", key: Math.floor((Math.random() * 1000000000) + 1)})}>&#43;</span>
      </div>
    );
  }
}

export default Radium(Sequence);
