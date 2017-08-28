"use strict";



const editor = {
  controlClipboard : [],
  expressionClipboard : [],
  propertyClipboard: [],
  claimFocus : (() => {
    let lastLoseCLaim = null;

    return (loseClaim) => {
      if (lastLoseCLaim) {
        lastLoseCLaim();
      }

      lastLoseCLaim = loseClaim;

      // return a "cancel" function
      return () => {
        if (loseClaim === lastLoseCLaim) {
          lastLoseCLaim = null;
        }
      };
    };
  })(),
  generateKey: ((initialKey) => {
    let nextKey = initialKey;
    return () => {
      return "" + (nextKey++);
    }
  })(0)
};

editor.make = {
  module: () => ({
    type: "module",
    imports: {
      statements: []
    },
    sequence: {
      statements: []
    },
    exports: {
      statements: []
    },
    key: editor.generateKey()
  }),
  control: () => ({
    type: "control",
    key: editor.generateKey()
  }),
  expression: () => ({
    type: "expression",
    key: editor.generateKey()
  }),
  define: ({name=null, constant=null, value=null} = {}) => ({
    type: "define",
    name: name || "newConstant",
    constant: constant || true,
    value: value || editor.make.expression(),
    key: editor.generateKey()
  }),
  null: () => ({
    type: "null",
    key: editor.generateKey()
  }),
  boolean: ({value=null} = {}) => ({
    type: "boolean",
    value: typeof value === "boolean" ? value : false,
    key: editor.generateKey()
  }),
  number: ({value=null} = {}) => ({
    type: "number",
    value: typeof value === "number" ? value : 0,
    key: editor.generateKey()
  }),
  string: ({value=null} = {}) => ({
    type: "string",
    value: typeof value === "string" ? value : "",
    key: editor.generateKey()
  }),
  "function": ({name=null, args=null} = {}) => ({
    type: "function",
    name: name || "",
    args: args || [],
    sequence:{
      statements:[]
    },
    key: editor.generateKey()
  }),
  property: ({name=null, value=null} = {}) => ({
    type: "property",
    name: name || "newProperty",
    value: value || editor.make.expression(),
    key: editor.generateKey()
  }),
  object: () => ({
    type: "object",
    properties: [],
    key: editor.generateKey()
  }),
};

export {editor};
