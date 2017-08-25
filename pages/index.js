"use strict";

import Head from "next/head";
import Radium, {Style, StyleRoot} from "radium";

import Layout from "../comps/layout";
import Statement from "../comps/js-statement";


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      example : {
        type: "module",
        imports: {
          statements: [{
            type: "import",
            key: "42344",
            name: "test1",
            module: "somemodule"
          }]
        },
        exports: {
          statements: [{
            type: "export",
            name: "default",
            key: "55234",
            value: {
              type: "function",
              name: "",
              args: [],
              sequence: {
                statements: [{
                  type: "define",
                  constant: true,
                  name: "someConstant",
                  key: "2344",
                  value: {
                    type: "string",
                    value: "hello world!"
                  }
                },{
                  type: "define",
                  constant: false,
                  name: "someVariable",
                  key: "6544",
                  value: {
                    type: "string",
                    value: "hello world!"
                  }
                }]
              }
            }
          }]
        },
        sequence: {
          statements: [{
            type: "define",
            constant: true,
            name: "someConstant",
            key: "123",
            value: {
              type: "string",
              value: "hello world!"
            }
          }]
        }
      }
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
            <div><i className="fa fa-home fa-fw" aria-hidden="true"/> Home</div>
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
