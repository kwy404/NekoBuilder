import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import * as mui from '@material-ui/core';


export class IFrame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mountNode: null
    }
    this.setContentRef = (contentRef) => {
      this.setState({
        mountNode: contentRef?.contentWindow?.document?.body
      })
    }
  }

  render() {
    const { children, ...props } = this.props
    const { mountNode } = this.state
    return (
      <div
        style={{
            width: `calc(100% - 500px)`,
            height: `100%`,
            position: `absolute`,
            left: `200px`,
            background: props.background,
            border: `1px solid #ccc`,
            overflowX: `hidden`,
            overflowY: `auto`
        }}
        {...props}
        ref={this.setContentRef}
      >
        <div 
        onClick={() => this.props.onBlur()}
        style={{
            position: `fixed`,
            background: `transparent`,
            width: `100%`,
            height: `100%`,
            top: 0,
            zIndex: 2
          }}></div>
        <div style={{
          position: `relative`,
          zIndex: 5
        }}>
          {children}  
        </div>
      </div>
    )
  }
}