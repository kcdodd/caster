"use strict";

import Head from "next/head";
import Radium, {Style, StyleRoot} from "radium";

import Layout from "../comps/layout";
import Statement from "../comps/js-statement";

const editor = {
  controlClipboard : [],
  expressionClipboard : [],
  focused : null,
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
      editor,
      statements: []
    },
    sequence: {
      editor,
      statements: []
    },
    exports: {
      editor,
      statements: []
    },
    editor,
    key: editor.generateKey()
  }),
  control: () => ({
    type: "control",
    editor,
    key: editor.generateKey()
  }),
  expression: () => ({
    type: "expression",
    editor,
    key: editor.generateKey()
  }),
  define: ({name=null, constant=null, value=null} = {}) => ({
    type: "define",
    name: name || "newConstant",
    constant: constant || true,
    value: value || editor.make.expression(),
    editor,
    key: editor.generateKey()
  }),
  null: () => ({
    type: "null",
    editor,
    key: editor.generateKey()
  }),
  boolean: ({value=null} = {}) => ({
    type: "boolean",
    value: typeof value === "boolean" ? value : false,
    editor,
    key: editor.generateKey()
  }),
  number: ({value=null} = {}) => ({
    type: "number",
    value: typeof value === "number" ? value : 0,
    editor,
    key: editor.generateKey()
  }),
  string: ({value=null} = {}) => ({
    type: "string",
    value: typeof value === "string" ? value : "",
    editor,
    key: editor.generateKey()
  }),
  "function": ({name=null, args=null} = {}) => ({
    type: "function",
    name: name || "",
    args: args || [],
    sequence:{
      editor,
      statements:[]
    },
    editor,
    key: editor.generateKey()
  })
};


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      example : editor.make.module()
    };
  }

  static async getInitialProps ({ query, req }) {

    return {
      radiumConfig: {
        userAgent: req ? req.headers['user-agent'] : navigator.userAgent
      }
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleChange = (newValue) => {
    this.setState({example: newValue});
  }

  render() {

    const styles = {
      root: {
        textAlign: "left",
        width: "100%"
      }
    };

    return (
      <StyleRoot>
        <div style={styles.root}>
          <Head>
            <link href="https://fonts.googleapis.com/css?family=Fira+Mono" rel="stylesheet" />
            <link href="static/font-awesome-4.7.0/css/font-awesome.css" rel="stylesheet" type="text/css"/>
          </Head>
          <Layout>
            <div
              style={{cursor: "pointer"}}
              onClick={() => {
                while(editor.controlClipboard.length) {
                  editor.controlClipboard.pop();
                }

                while(editor.expressionClipboard.length) {
                  editor.expressionClipboard.pop();
                }

                //
                this.forceUpdate();
              }}
            >
              <i className="fa fa-trash" style aria-label="Empty Clipboard"></i>({editor.controlClipboard.length + editor.expressionClipboard.length})
            </div>
            <Statement
              value={this.state.example}
              onChange={this.handleChange}
            />
          </Layout>
          <Style rules={{
            body: {
              margin: 0,
              fontFamily: "Fira Mono, Courier, Helvetica, sans-serif",
              color: "#ffed00"
            },
            html: {
              background: "#8a8c9e",
              fontSize: "100%"
            },
            mediaQueries: {
              "(min-width: 550px)": {
                html:  {
                  fontSize: "100%"
                }
              },
              "(min-width: 1200px)": {
                html:  {
                  fontSize: "100%"
                }
              }
            }
          }} />
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(Index);
