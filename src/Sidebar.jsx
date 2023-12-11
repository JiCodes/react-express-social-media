import "./Sidebar.css";

function Sidebar({ username, onLogout }) {
  return (
    <ul className="sidebar-list">
      <li className="sidebar-item">
        <i className="user-icon"> </i>
        <span className="username"> {username} </span>
      </li>
      <li className="sidebar-item">
        <button
          type="button"
          onClick={() => onLogout()}
          className="logout-button"
        >
          Logout
        </button>
      </li>
    </ul>
  );
}

export default Sidebar;
