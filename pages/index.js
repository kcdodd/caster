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
                statements: []
              }
            }
          }]
        },
        sequence: {
          statements: [{
            type: "constant-declaration",
            name: "someConstant",
            key: "123",
            value: {
              type: "string",
              value: "hello world!"
            }
          },{
            type: "constant-declaration",
            name: "someConstant",
            key: "2344",
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
        width: "100%",
        height: "20em",
      },
      vmiddle: {
        margin: "0px",
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)"
      }
    };

    return (
      <StyleRoot>
        <div style={styles.root}>
          <Head>
            <link href="https://fonts.googleapis.com/css?family=Fira+Mono" rel="stylesheet" />
          </Head>
          <Layout>
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
              background: "#2f3039",
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
