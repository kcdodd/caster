"use strict";

import Radium from "radium";
import {editor} from "../editor";

class Selectify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  componentWillUnmount = () => {
    this.cancelClaimFocus ? this.cancelClaimFocus() : "";
  }

  handleStartEdit = () => {
    const that = this;

    this.cancelClaimFocus = editor.claimFocus(() => {
      that.handleEndEdit();
    });

    this.setState({
      editing: true
    });
  }

  handleEndEdit = () => {
    this.cancelClaimFocus ? this.cancelClaimFocus() : "";

    this.setState({
      editing: false
    });
  }

  render() {

    const value = this.props.value;
    const color = this.props.style ? this.props.style.color || "#000000" : "#000000";
    const shadow = `1px 1px 11px ${color}`;
    const background = this.props.style ? this.props.style.backgroundColor || "#ffffff" : "#ffffff";

    const styles = {
      root: {
        display: "inline-block",
        backgroundColor: background,
        color: color
      },
      rounded: {
        borderRadius: "5px"
      },
      shadow: {
        boxShadow: shadow
      },
      /* https://codepen.io/ericrasch/pen/zjDBx */
      selectContainer: {
        display: "inline-block",
        height: "1rem",
        overflow: "hidden",
        backgroundColor: background
      },
      select: {
        background: background,
        border: "none",
        height: "2rem",
        width: "5rem",
        fontSize: "1rem",
        color: color,
        fontFamily: "Fira Mono, Courier, Helvetica, sans-serif",
        transform: "translateY(-0.4rem)"
      },
      remove: {
        transform: "translateY(-0.4rem)"
      },
      button: {
        cursor: "pointer"
      },
      string: {
        height: "1rem",
        backgroundColor: background,
        padding: "0px 5px",
        color: color
      },
    };

    if (this.state.editing) {
      return (
        <div style={[styles.root, styles.rounded, styles.shadow]}>
          <div style={[styles.selectContainer, styles.rounded]} >
            <select
              value={this.props.value}
              style={styles.select}
              onChange={(e) => {this.props.onChange ? this.props.onChange(e.target.value) : ""}}
              ref={(input) => { input && input.focus(); }}
            >
              {this.props.options.map(o => {
                return <option key={o}>{o}</option>
              })}
            </select>
            {this.props.onRemove ? <span>&nbsp;<i onClick={this.props.onRemove} className="fa fa-times fa-fw" style={[styles.button, styles.remove]} aria-label="Remove Expression"/></span> : ""}
          </div>
        </div>
      );
    }

    return (
      <span style={[styles.string, styles.rounded]} onClick={this.handleStartEdit}>
        {this.props.value}
      </span>
    );
  }
}

export default Radium(Selectify);
