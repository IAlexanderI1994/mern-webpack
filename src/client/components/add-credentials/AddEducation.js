import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addEducation } from '../../actions/profileActions'

const mapStateToProps = (state) => ({

  profile: state.profile,
  errors: state.errors,

})

const mapDispatchToProps = (dispatch) => ({
  addEducation: (eduData, history) => dispatch(addEducation(eduData, history))
})

class AddEducation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
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
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    }
    this.props.addEducation(eduData, this.props.history)
  }

  render () {
    const { errors } = this.state
    return (
      <div className="section add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light"> Go back</Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
              <small className="d-block pb-3">* = required field</small>
              <form>
                <TextFieldGroup
                  placeholder=" * School"
                  name="school"
                  value={this.state.school}
                  error={errors.school}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder=" * Degree"
                  name="degree"
                  value={this.state.degree}
                  error={errors.degree}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder=" * Field of study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  error={errors.fieldofstudy}
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
                    Current
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program description"
                  onChange={this.onChange}
                  value={this.state.description}
                  name="description"
                  error={errors.description}
                  info="Tell us about program that you were in"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation))

