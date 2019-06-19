import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'

import { isEmpty } from '../../../server/validation/is-empty'

class EditProfile extends Component {
  constructor (props) {
    super(props)
    this.state        = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    }
    this.onChange     = this.onChange.bind(this)
    this.onSubmit     = this.onSubmit.bind(this)
    this.toggleSocial = this.toggleSocial.bind(this)
  }

  componentDidMount () {
    this.props.getCurrentProfile()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ errors: nextProps.errors })
    if (nextProps.profile.profile) {
      const { profile } = nextProps.profile
      if (!profile.social) {
        profile.social = {}
      }

      // Brings array skills back to the comma separated values
      const skillsCSV = profile.skills.join(',')

      const profileData = [

        'company',
        'website',
        'location',
        'githubusername',
        'bio',
      ]
      const socialGroup = [
        'twitter',
        'facebook',
        'linkedin',
        'youtube',
        'instagram',
      ]
      profileData.forEach(field => isEmpty(profile[field]) ? profile[field] = '' : true)
      socialGroup.forEach(field => isEmpty(profile['social'][field]) ? profile['social'][field] = '' : true)

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.social.twitter,
        facebook: profile.social.facebook,
        linkedin: profile.social.linkedin,
        youtube: profile.social.youtube,
        instagram: profile.social.instagram,
      })

    }

  }

  onSubmit (e) {
    e.preventDefault()

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    }
    this.props.createProfile(profileData, this.props.history)

  }

  onChange (e) {
    e.preventDefault()
    const { name, value } = e.target
    this.setState({ [name]: value })

  }

  toggleSocial (e) {
    e.preventDefault()
    this.setState(prevState => ({ displaySocialInputs: !prevState.displaySocialInputs }))
  }

  render () {

    const { errors, displaySocialInputs } = this.state

    let socialInputs
    if (displaySocialInputs) {
      socialInputs = (
        <div>

          <InputGroup
            placeholder="Twitter Profile URL"
            onChange={this.onChange}
            name="twitter"
            value={this.state.twitter}
            icon="fab fa-twitter "
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            onChange={this.onChange}
            name="facebook"
            value={this.state.facebook}
            icon="fab fa-facebook "
          />
          <InputGroup
            placeholder="Youtube channel URL"
            onChange={this.onChange}
            name="youtube"
            value={this.state.youtube}
            icon="fab fa-youtube "
          />
          <InputGroup
            placeholder="LinkedIn channel URL"
            onChange={this.onChange}
            name="linkedin"
            value={this.state.linkedin}
            icon="fab fa-linkedin "
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            onChange={this.onChange}
            name="instagram"
            value={this.state.instagram}
            icon="fab fa-instagram "
          />
        </div>
      )
    }
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor', value: 'Instructor' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' },

    ]
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light"> Go back</Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <p className="lead text-center">Let's get some information to make your profile stand out</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  onChange={this.onChange}
                  value={this.state.handle}
                  name="handle"
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                />
                <SelectListGroup
                  placeholder="Status"
                  onChange={this.onChange}
                  value={this.state.status}
                  name="status"
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                  options={options}
                />
                <TextFieldGroup
                  placeholder="Company"
                  onChange={this.onChange}
                  value={this.state.company}
                  name="company"
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  onChange={this.onChange}
                  value={this.state.website}
                  name="website"
                  error={errors.website}
                  info="Could be your own or a company website"
                />
                <TextFieldGroup
                  placeholder="Location"
                  onChange={this.onChange}
                  value={this.state.location}
                  name="location"
                  error={errors.location}
                  info="City & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  onChange={this.onChange}
                  value={this.state.skills}
                  name="skills"
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  onChange={this.onChange}
                  value={this.state.githubusername}
                  name="githubusername"
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  onChange={this.onChange}
                  value={this.state.bio}
                  name="bio"
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button onClick={this.toggleSocial} className="btn btn-light"> Add social network links
                  </button>
                  <span className="text-muted"> Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,

}
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))