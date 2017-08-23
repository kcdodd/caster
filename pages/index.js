"use strict";

import Head from "next/head";
import Radium, {Style, StyleRoot} from "radium";

import Layout from "../comps/layout";
import Statement from "../comps/js-statement";

const example = {
  type: "module",
  imports: [{
    type: "import",
    name: "test1",
    module: "somemodule"
  }],
  exports: [{
    type: "export",
    name: "default",
    value: {
      type: "function",
      name: "",
      args: [],
      sequence: {
        statements: []
      }
    }
  }],
  sequence: {
    statements: [{
      type: "constant-declaration",
      name: "someConstant",
      value: {
        type: "string",
        value: "hello world!"
      }
    }]
  }
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {

    const styles = {
      root: {
        textAlign: "center",
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
            <Statement value={example} />
          </Layout>
          <Style rules={{
            body: {
              margin: 0,
              fontFamily: "Fira Mono, Courier, Helvetica, sans-serif",
              color: "#ffed00"
            },
            html: {
              background: "#222000",
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
