"use strict";

import Radium from "radium";

import ModuleImport from "./js-module-import";

class Imports extends React.Component {
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
      }
    };

    return (
      <div style={styles.root}>
        {this.props.value.statements.map(statement => {
          return (<ModuleImport key={statement.key} value={statement} onChange={this.handleChangeStatement}/>);
        })}
      </div>
    );
  }
}

export default Radium(Imports);
