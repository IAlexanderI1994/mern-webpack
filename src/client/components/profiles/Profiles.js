import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import { getProfiles } from '../../actions/profileActions'

const mapStateToProps = (state) => ({
  profile: state.profile,
})

const mapDispatchToProps = (dispatch) => ({
  getProfiles: (id, history) => dispatch(getProfiles(id, history))
})

class Profiles extends Component {

  componentDidMount () {
    this.props.getProfiles()
  }

  render () {

    const { profiles, loading } = this.props.profile
    let profileItems
    if (profiles === null || loading) {
      profileItems = <Spinner/>
    } else {
      if (profiles.length > 0) {
        <h1> Profiles here </h1>
      } else {
        profileItems = <h4>No profiles found ...</h4>
      }

    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className={'display-4 text-center'}> Developer profiles </h1>
              <p className="lead text-center">Browse and connect with developers</p>
              {profileItems}
            </div>
          </div>
        </div>


      </div>
    )
  }
}
Profiles.propTypes    = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(Profiles)