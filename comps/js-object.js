"use strict";

import Radium from "radium";
import {findIndex} from "lodash/array";

import {editor} from "../editor";
import Statement from "./js-statement";

class ObjectExpression extends React.Component {

  handleChangeProperty = (newValue, oldValue) => {

    let properties;

    if (oldValue) {
        properties = this.props.value.properties.map(curValue => {
          return oldValue.key === curValue.key ? newValue : curValue;
        });
    }else{
      properties = this.props.value.properties.map(curValue => {
        return newValue.key === curValue.key ? newValue : curValue;
      });
    }

    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      {
        properties
      }
    )) : "";
  }

  handleRemoveProperty = (removeValue) => {

    editor.propertyClipboard.push(removeValue);


    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      {
        properties: this.props.value.properties.filter(value => {
          return removeValue.key !== value.key;
        })
      }
    )) : "";
  }

  handleInsertProperty = (beforeValue, newValue) => {

    const insertIndex = findIndex(this.props.value.properties, ['key', beforeValue.key]);
    const newArr = this.props.value.properties.slice();
    newArr.splice(insertIndex > -1 ? insertIndex : newArr.length, 0, newValue);

    this.props.onChange ? this.props.onChange(Object.assign(
      {},
      this.props.value,
      {
        properties: newArr
      }
    )) : "";
  }

  render() {

    const styles = {
      root: {
        display: "inline-block",
        margin: "3px 3px",
        backgroundColor: "#484e7d",
        borderLeft: "2px solid #ccf2b1",
        borderRight: "2px solid #77defa",
      },
      rounded: {
        borderRadius: "5px"
      },
      header: {
        display: "inline-block",
        padding: "3px",
        margin: "1px 1px",
        width: "1.5rem",
        height: "1.5rem",
        textAlign: "center",
        verticalAlign: "top",
        color: "#7781cd",
        cursor: "pointer",
        ":hover": {
          color: "#ffffff",
        }
      },
      remove: {
        color: "#77defa",
        textAlign: "right"
      },
      button: {
        cursor: "pointer"
      }
    };

    const object = this.props.value;

    return (
      <div style={[styles.root, styles.rounded]}>
        {this.props.onRemove ? <div style={styles.remove}>&nbsp;<i onClick={() => {this.props.onRemove ? this.props.onRemove(this.props.value) : ""}} className="fa fa-times fa-fw" style={styles.button} aria-label="Remove Expression"/></div> : ""}
        {object.properties.map((property, index) => {
          return (
            <div
              key={property.key}
              style={{position: "relative"}}
            >
              <i
                className="fa fa-plus fa-fw"
                aria-label="Insert Property"
                style={styles.header}
                key={property.key+"insert"}
                onClick={() => this.handleInsertProperty(property, editor.make.property())}
              />
              <Statement
                value={property}
                onChange={this.handleChangeProperty}
              />
              <i
                className="fa fa-minus fa-fw"
                aria-label="Remove Property"
                style={styles.header}
                key={property.key+"remove"}
                onClick={() => this.handleRemoveProperty(property)}
              />
            </div>
          );
        })}
        <i
          className="fa fa-plus"
          aria-label="Insert Property"
          style={styles.header}
          key="end"
          onClick={() => this.handleInsertProperty({}, editor.make.property())}
        />
      </div>
    );
  }
}

export default Radium(ObjectExpression);
