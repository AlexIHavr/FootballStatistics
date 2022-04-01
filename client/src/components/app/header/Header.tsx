import { NavLink } from 'react-router-dom';
import './header.scss';
import TwitterAuth from './twitterAuth/TwitterAuth';

const Header: React.FC = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <NavLink to="/" className="brand-logo">
          Football statistics
        </NavLink>
        <ul id="nav-mobile" className="left">
          <li className="tableItem">
            <NavLink to="/table">table</NavLink>
          </li>
          <li className="teamsItem">
            <NavLink to="/teams">teams</NavLink>
          </li>
        </ul>
        <TwitterAuth />
      </div>
    </nav>
  );
};

export default Header;
