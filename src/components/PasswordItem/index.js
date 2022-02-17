import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePassword, isChecked} = props
  const {id, website, username, password} = passwordDetails
  const initial = website ? website[0].toUpperCase() : ''

  const starImg =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png '
  const passwordsView = isChecked ? (
    password
  ) : (
    <img src={starImg} alt="stars" className="stars-img" />
  )

  const onDeletePassword = () => {
    deletePassword(id)
  }

  return (
    <li className="password-item">
      <div className="initial-and-details-container">
        <div className="initial-container">
          <p className="initial">{initial}</p>
        </div>
        <div className="password-details-container">
          <p className="website">{website}</p>
          <p className="username">{username}</p>
          <p className="password">{passwordsView}</p>
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onDeletePassword}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default PasswordItem
