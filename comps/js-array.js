"use strict";

import Radium from "radium";
import {findIndex} from "lodash/array";

import {editor} from "../editor";
import Statement from "./js-statement";

class ArrayStatement extends React.Component {

    handleChangeElement = (newValue, oldValue) => {

      let elements;

      if (oldValue) {
          elements = this.props.value.elements.map(curValue => {
            return oldValue.key === curValue.key ? newValue : curValue;
          });
      }else{
        elements = this.props.value.elements.map(curValue => {
          return newValue.key === curValue.key ? newValue : curValue;
        });
      }

      this.props.onChange ? this.props.onChange(Object.assign(
        {},
        this.props.value,
        {
          elements
        }
      )) : "";
    }

    handleRemoveElement = (removeValue) => {

      editor.expressionClipboard.push(removeValue);


      this.props.onChange ? this.props.onChange(Object.assign(
        {},
        this.props.value,
        {
          elements: this.props.value.elements.filter(value => {
            return removeValue.key !== value.key;
          })
        }
      )) : "";
    }

    handleInsertElement = (beforeValue, newValue) => {

      const insertIndex = findIndex(this.props.value.elements, ['key', beforeValue.key]);
      const newArr = this.props.value.elements.slice();
      newArr.splice(insertIndex > -1 ? insertIndex : newArr.length, 0, newValue);

      this.props.onChange ? this.props.onChange(Object.assign(
        {},
        this.props.value,
        {
          elements: newArr
        }
      )) : "";
    }

  render() {


    const styles = {
      root: {
        display: "inline-block",
        margin: "3px 3px",
        backgroundColor: "#484e7d",
        borderLeft: "2px solid #b1c5f2",
        borderRight: "2px solid #77defa",
      },
      rounded: {
        borderRadius: "5px"
      },
      element: {
        display: "inline-block",
        padding: "3px",
        margin: "1px 1px",
        backgroundColor: "#767db8"
      },
      shadow: {
        boxShadow: `1px 1px 11px #2f3039`
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
        color: "#7781cd",
        textAlign: "right"
      },
      button: {
        cursor: "pointer"
      },
      index: {
        color: "#b1c5f2"
      },
      colon: {
        color: "#69cdff"
      },
      top: {
        display: "inline-block",
        verticalAlign: "top"
      }
    };

    const array = this.props.value;

    return (
      <div style={[styles.root, styles.rounded]}>
        {this.props.onRemove ? <div style={styles.remove}>&nbsp;<i onClick={() => {this.props.onRemove ? this.props.onRemove(this.props.value) : ""}} className="fa fa-times fa-fw" style={styles.button} aria-label="Remove Array"/></div> : ""}
        {array.elements.map((element, index) => {
          return (
            <div
              key={element.key}
              style={{position: "relative"}}
            >
              <i
                className="fa fa-plus fa-fw"
                aria-label="Insert Element"
                style={styles.header}
                key={element.key+"insert"}
                onClick={() => this.handleInsertElement(element, editor.make.expression())}
              />
              <div style={[styles.element, styles.rounded, styles.shadow]}>
                <div style={styles.top}>
                  <span style={styles.index}>{index}</span>
                  <span style={styles.colon}>&nbsp;:&nbsp;</span>
                </div>
                <Statement
                  value={element}
                  onChange={this.handleChangeElement}
                  onRemove={() => {
                    if (element.type !== "expression") {
                      editor.expressionClipboard.push(element);
                    }

                    this.handleChangeElement(editor.make.expression(), element)
                  }}
                />
              </div>
              <i
                className="fa fa-minus fa-fw"
                aria-label="Remove Element"
                style={styles.header}
                key={element.key+"remove"}
                onClick={() => this.handleRemoveElement(element)}
              />
            </div>
          );
        })}
        <i
          className="fa fa-plus"
          aria-label="Insert Element"
          style={styles.header}
          key="end"
          onClick={() => this.handleInsertElement({}, editor.make.expression())}
        />
      </div>
    );
  }
}

export default Radium(ArrayStatement);
