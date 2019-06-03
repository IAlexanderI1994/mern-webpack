import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'

class CreateProfile extends Component {
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

  onSubmit (e) {
    e.preventDefault()
    console.log('submit')

  }

  onChange (e) {
    e.preventDefault()
    const { name, value } = e.target
    this.setState({ [name]: value })

  }

  toggleSocial () {
    this.setState(prevState => ({ displaySocialInputs: !prevState.displaySocialInputs }))
  }

  render () {

    const { errors, displaySocialInputs } = this.state

    let socialInputs
    if ( displaySocialInputs ) {
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
              <a href="dashboard.html" className="btn btn-light">
                Go Back
              </a>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's get some information to make your profile stand out</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  onChange={this.onChange}
                  value={this.state.handle}
                  name="handle"
                  errors={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                />
                <SelectListGroup
                  placeholder="Status"
                  onChange={this.onChange}
                  value={this.state.status}
                  name="status"
                  errors={errors.status}
                  info="Give us an idea of where you are at in your career"
                  options={options}
                />
                <TextFieldGroup
                  placeholder="Company"
                  onChange={this.onChange}
                  value={this.state.company}
                  name="handle"
                  errors={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  onChange={this.onChange}
                  value={this.state.website}
                  name="website"
                  errors={errors.website}
                  info="Could be your own or a company website"
                />
                <TextFieldGroup
                  placeholder="Location"
                  onChange={this.onChange}
                  value={this.state.location}
                  name="location"
                  errors={errors.location}
                  info="City & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  onChange={this.onChange}
                  value={this.state.skills}
                  name="skills"
                  errors={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  onChange={this.onChange}
                  value={this.state.githubusername}
                  name="githubusername"
                  errors={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextFieldGroup
                  placeholder="A short bio of yourself"
                  onChange={this.onChange}
                  value={this.state.bio}
                  name="bio"
                  errors={errors.bio}
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,

}
const mapStateToProps   = (state) => ({
  profile: state.profile,
  errors: state.errors,
})
export default connect(mapStateToProps)(CreateProfile)