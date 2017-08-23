"use strict";

import Radium from "radium";

import Module from "./js-module.js";

import VariableDeclarationStatement from "./js-variable-declaration";
import VariableStatement from "./js-variable";
import ConstantDeclarationStatement from "./js-constant-declaration";
import ConstantStatement from "./js-constant";
import AssignStatement from "./js-assign";

import BooleanStatement from "./js-boolean";
import NumberStatement from "./js-number";
import StringStatement from "./js-string";
import NullStatement from "./js-null";

import ArrayStatement from "./js-array";
import ObjectStatement from "./js-object";
import PropertyStatement from "./js-property";
import ReferenceStatement from "./js-reference";

import FunctionStatement from "./js-function";
import ReturnStatement from "./js-return";
import EvaluateStatement from "./js-evaluate";

import ConditionalStatement from "./js-conditional";
import IfStatement from "./js-if";
import WhileStatement from "./js-while";
import ForStatement from "./js-for";
import ForInStatement from "./js-for-in";
import ForOfStatement from "./js-for-of";

const typeToComponent = type => {
  switch(type) {
    case "module": return Module;
    case "variable-declaration": return VariableDeclarationStatement;
    case "variable": return VariableStatement;
    case "constant-declaration": return ConstantDeclarationStatement;
    case "constant": return ConstantStatement;
    case "assign": return AssignStatement;
    case "boolean": return BooleanStatement;
    case "number": return NumberStatement;
    case "string": return StringStatement;
    case "null": return NullStatement;
    case "array": return ArrayStatement;
    case "object": return ObjectStatement;
    case "property": return PropertyStatement;
    case "reference": return ReferenceStatement;
    case "function": return FunctionStatement;
    case "return": return ReturnStatement;
    case "evaluate": return EvaluateStatement;
    case "conditional": return ConditionalStatement;
    case "if": return IfStatement;
    case "while": return WhileStatement;
    case "for": return ForStatement;
    case "for-in": return ForInStatement;
    case "for-of": return ForOfStatement;
    default: return null;
  }
}

class Statement extends React.Component {

  render() {
    const component = typeToComponent(this.props.value.type);

    if (component) {
      return React.createElement(
        component,
        this.props,
        this.props.children
      );
    }

    return (<div>{`Component type '${this.props.value.type}' could not be determined.`}</div>)
  }
}

export default Radium(Statement);
