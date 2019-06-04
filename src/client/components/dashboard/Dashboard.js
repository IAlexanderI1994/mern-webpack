import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'

class Dashboard extends Component {

  componentDidMount () {
    this.props.getCurrentProfile()
  }

  render () {
    const { user }             = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent

    if (profile === null || loading) {
      dashboardContent = <Spinner/>
    } else {
      // check if logged in user has profile data

      if (Object.keys(profile).length > 0) {
        dashboardContent = <span> TODO: DISPLAY PROFILE</span>
      } else {
        // user is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted"> Добро пожаловать, {user.name} </p>
            <p> Профиль не создан, пожалуйста, добавьте информацию </p>
            <Link to="/create-profile" className="btn btn-lg btn-info"> Create profile</Link>

          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <h1> Dashboard </h1>
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4"> {dashboardContent}</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes   = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

}
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)