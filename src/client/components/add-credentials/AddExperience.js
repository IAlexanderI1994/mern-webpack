import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addExperience } from '../../actions/profileActions'

const mapStateToProps = (state) => ({

  profile: state.profile,
  errors: state.errors,

})

const mapDispatchToProps = (dispatch) => ({
  addExperience: (expData, history) => dispatch(addExperience(expData, history))

})

class AddExperience extends Component {
  constructor (props) {
    super(props)
    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }

    this.onChange = this.onChange.bind(this)
    this.onCheck  = this.onCheck.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { errors } = nextProps
    this.setState({ errors })
  }

  onChange (e) {
    const { name, value } = e.target
    this.setState({ [name]: value })

  }

  onCheck (e) {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.current
    })
  }

  onSubmit (e) {

    e.preventDefault()
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    }
    this.props.addExperience(expData, this.props.history)
  }

  render () {
    const { errors } = this.state
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light"> Go back</Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
              <small className="d-block pb-3">* = required field</small>
              <form>
                <TextFieldGroup
                  placeholder=" * Company"
                  name="company"
                  value={this.state.company}
                  error={errors.company}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder=" * Job title"
                  name="title"
                  value={this.state.title}
                  error={errors.title}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  error={errors.location}
                  onChange={this.onChange}
                />
                <h6> From date </h6>
                <TextFieldGroup
                  type={'date'}
                  name="from"
                  value={this.state.from}
                  error={errors.from}
                  onChange={this.onChange}
                />
                <h6> To date </h6>
                <TextFieldGroup
                  name="to"
                  type={'date'}
                  value={this.state.to}
                  error={errors.to}
                  onChange={this.onChange}
                  disabled={this.state.disabled ? 'current' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"/>
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job description"
                  onChange={this.onChange}
                  value={this.state.description}
                  name="description"
                  error={errors.description}
                  info="Tell us a little about the position"
                />
                <input type="submit" onClick={this.onSubmit} className="btn btn-info btn-block mt-4"/>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience))

