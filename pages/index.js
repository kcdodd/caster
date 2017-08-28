"use strict";

import Head from "next/head";
import Radium, {Style, StyleRoot} from "radium";

import Layout from "../comps/layout";
import Statement from "../comps/js-statement";
import {editor} from "../editor";

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
