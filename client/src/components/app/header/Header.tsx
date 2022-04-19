import { NavLink } from 'react-router-dom';
import { urls } from '../../../constants/app';
import './header.scss';
import TwitterAuth from './twitterAuth/TwitterAuth';

const Header: React.FC = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <span className="brand-logo">Football statistics</span>
        <ul id="nav-mobile" className="left">
          {Object.entries(urls).map((url) => {
            return (
              <li key={url[0]}>
                <NavLink to={url[1]}>{url[0]}</NavLink>
              </li>
            );
          })}
        </ul>
        <TwitterAuth />
      </div>
    </nav>
  );
};

export default Header;
