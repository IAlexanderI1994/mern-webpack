import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount} from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'



class Dashboard extends Component {

  componentDidMount () {
    this.props.getCurrentProfile()
  }

  onDeleteClick (e) {
    this.props.deleteAccount()
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
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome, <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>

            <div style={{ marginBottom: '60px' }}></div>
            <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger"> Delete my account</button>
          </div>
        )
      } else {
        // user is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted"> Welcome, {user.name} </p>
            <p> Profile is not exists yet </p>
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
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes   = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

}
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)