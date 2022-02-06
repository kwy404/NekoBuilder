import React, { Component } from 'react'

export class Title extends Component {
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
      <h1
        {...props}
        ref={this.setContentRef}
      >
        {children}
      </h1>
    )
  }
}