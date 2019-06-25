import React, { Component } from 'react'
import { connect } from 'react-redux'

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {}
}

class ProfileGithub extends Component {
  render () {
    return (
      <div>
        <h1> GIT</h1>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
)(ProfileGithub)