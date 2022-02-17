import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    passwordsCount: 0,
    isChecked: false,
    searchInput: '',
  }

  onChangeWebsiteInput = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onChangeUsernameInput = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onChangePasswordInput = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onAddPassword = event => {
    event.preventDefault()

    const {websiteInput, usernameInput, passwordInput} = this.state

    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      passwordsCount: prevState.passwordsCount + 1,
    }))
  }

  deletePassword = id => {
    const {passwordsList} = this.state

    this.setState(prevState => ({
      passwordsList: passwordsList.filter(
        eachPassword => eachPassword.id !== id,
      ),
      passwordsCount: prevState.passwordsCount - 1,
    }))
  }

  onToggleCheckbox = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  getSearchResults = () => {
    const {searchInput, passwordsList} = this.state

    const searchResults = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return searchResults
  }

  renderPasswordsView = () => {
    const {isChecked} = this.state
    const searchResults = this.getSearchResults()

    if (searchResults.length === 0) {
      return (
        <div className="no-passwords-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-passwords-image"
          />
          <p className="no-passwords-text">No Passwords</p>
        </div>
      )
    }
    return (
      <ul className="passwords-list">
        {searchResults.map(eachPassword => (
          <PasswordItem
            key={eachPassword.id}
            passwordDetails={eachPassword}
            deletePassword={this.deletePassword}
            isChecked={isChecked}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsCount,
      searchInput,
    } = this.state
    return (
      <div className="app-container">
        <div className="password-manager-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="website-password-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-image-sm"
            />
            <form className="inputs-container" onSubmit={this.onAddPassword}>
              <h1 className="input-description">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-logo"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  value={websiteInput}
                  onChange={this.onChangeWebsiteInput}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-logo"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  value={usernameInput}
                  onChange={this.onChangeUsernameInput}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-logo"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  value={passwordInput}
                  onChange={this.onChangePasswordInput}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-image-lg"
            />
          </div>
          <div className="passwords-container">
            <div className="passwords-count-and-search-container">
              <div className="your-passwords-container">
                <h1 className="your-passwords-heading">Your Passwords</h1>
                <p className="passwords-count">{passwordsCount}</p>
              </div>
              <div className="search-input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-image"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="show-passwords-container">
              <div className="label-container">
                <input
                  type="checkbox"
                  id="checkboxId"
                  className="checkbox"
                  onClick={this.onToggleCheckbox}
                />
                <label htmlFor="checkboxId" className="label">
                  Show Passwords
                </label>
              </div>
            </div>
            {this.renderPasswordsView()}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
