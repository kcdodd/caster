"use strict";

import Radium from "radium";
import {findIndex} from "lodash/array";

import Statement from "./js-statement";

class Arguments extends React.Component {

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
        color: "#cdc8c8",
        cursor: "pointer",
        ":hover": {
          color: "#ffffff",
        }
      }
    };

    const args = this.props.arguments;

    return (
      <div style={styles.root}>
        {args.map((argument, index) => {
          return (
            <div style={{position: "relative"}}>
              <i
                className="fa fa-plus fa-fw" aria-label="Insert Argument"
                style={styles.header}
                key={statement.key+"insert"}
                onClick={() => this.handleInsertStatement(argument, {type: "argument", key: Math.floor((Math.random() * 1000000000) + 1)})}
              />
              <Statement
                key={statement.key}
                value={statement}
                onChange={this.handleChangeStatement}
              />
              <i
                className="fa fa-minus fa-fw" aria-label="Remove Argument"
                style={styles.header}
                key={statement.key+"remove"}
                onClick={() => this.handleRemoveStatement(argument)}
              />
            </div>
          );
        })}
        <i
          className="fa fa-plus" aria-label="Insert Argument"
          style={styles.header}
          key="end"
          onClick={() => this.handleInsertStatement({}, {type: "argument", key: Math.floor((Math.random() * 1000000000) + 1)})}
        />
      </div>
    );
  }
}

export default Radium(Arguments);
