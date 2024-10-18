import "./App.css";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: "",
        password: "",
        address: "",
        city: "",
        country: "",
        acceptRules: false,
      },
      submittingState: "fillingForm",
      formValid: false,
    };
  }

  handleChange = ({ target }) => {
    const { form } = this.state;
    let { name, type, value, checked } = target;
    const val = type === "checkbox" ? checked : value;
    this.setState({ form: { ...form, [name]: val } }, this.validateForm);
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    this.setState({ submittingState: "submitted" });
  };

  handleBackToFrom = () => {
    this.setState({ submittingState: "fillingForm" });
  };

  validateForm = () => {
    const { email, password, acceptRules } = this.state.form;
    const isValid = email.includes("@") && password.length >= 6 && acceptRules;
    this.setState({ formValid: isValid });
  };

  renderForm() {
    return (
      <div
        className="App d-flex justify-content-center align-items-center"
      >
        <div className="container col-md-6 bg-white p-4 shadow-lg">
          <form name="myForm" onSubmit={this.handleSubmitForm}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                onChange={this.handleChange}
                name="email"
                value={this.state.form.email}
                className="form-control"
                id="email"
                placeholder="Email"
                style={{ borderColor: this.state.form.email.includes('@') ? '#28a745' : '#dc3545' }}
              />
              {!this.state.form.email.includes('@') && (
                <div className="text-danger">Email must include '@'</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={this.handleChange}
                value={this.state.form.password}
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Password (min 6 characters)"
                style={{
                  borderColor:
                    this.state.form.password.length >= 6 ? "#28a745" : "#dc3545",
                }}
              />
              {this.state.form.password.length < 6 && (
                <div className="text-danger">Password must be at least 6 characters</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                onChange={this.handleChange}
                value={this.state.form.city}
                type="text"
                className="form-control"
                name="city"
                id="city"
                placeholder="City"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select
                id="country"
                name="country"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.form.country}
              >
                <option value="">Choose</option>
                <option value="argentina">Argentina</option>
                <option value="russia">Russia</option>
                <option value="china">China</option>
              </select>
            </div>

            <div className="mb-3">
              <div className="form-check">
                <input
                  onChange={this.handleChange}
                  checked={this.state.form.acceptRules}
                  id="rules"
                  type="checkbox"
                  name="acceptRules"
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="rules">
                  Accept Rules
                </label>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={!this.state.formValid}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  renderRow = (key) => {
    const { form } = this.state;
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{form[key].toString()}</td>
      </tr>
    );
  };

  renderResult() {
    const { form } = this.state;
    const keys = [...Object.keys(form)].sort();
    return (
      <div className="result-container">
        <table className="table">
          <tbody>{keys.map(this.renderRow)}</tbody>
        </table>
        <button type="button result-button" className="btn btn-primary btn-back" onClick={this.handleBackToFrom}>
          Back
        </button>
      </div>
    );
  }

  render() {
    const { submittingState } = this.state;
    switch (submittingState) {
      case "fillingForm":
        return this.renderForm();
      case "submitted":
        return this.renderResult();
      default:
        throw new Error(`'${submittingState}' - unknown state`);
    }
  }
}