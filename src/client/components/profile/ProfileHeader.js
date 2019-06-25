import React, { Component } from 'react'
import { isEmpty } from '../../../server/validation/is-empty'

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {}
}

class ProfileHeader extends Component {
  render () {
    const { profile } = this.props

    const linksFields = ['website', 'twitter', 'linkedin', 'facebook', 'instagram', 'youtube']

    const links = linksFields
      .map((link, index) => isEmpty(profile['social']) || !profile['social'][link] ? null : (
        <a key={index} className="text-white p-2" href={profile['social'][link]} target="_blank">
          <i className={`fab fa-${link} fa-2x`}/>
        </a>
      ))
      .filter(link => link !== null)
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle"
                     src={profile.user.avatar} alt=""/>
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">{profile.status} {isEmpty(profile.company) ? null
                : (<span> at {profile.company}</span>)}</p>
              {isEmpty(profile.location) ? null : (<p> at {profile.location}</p>)}
              <p>
                {isEmpty(profile.website) ? null
                  : (
                    <a className="text-white p-2" href={profile.website} target="_blank">
                      <i className="fas fa-globe fa-2x"/>
                    </a>
                  )}
                {links}

              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileHeader