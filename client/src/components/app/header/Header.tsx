import { NavLink } from 'react-router-dom';

import { URLS_ENTRIES } from '../../../constants/app';
import { useAppSelector } from '../../../hooks/redux';

import './header.scss';
import TwitterAuth from './twitterAuth/TwitterAuth';

const Header: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.twitterAuth);

  return (
    <nav>
      <div className="nav-wrapper">
        <span className="brand-logo">Football statistics</span>
        <ul id="nav-mobile" className="left">
          {URLS_ENTRIES.map(
            (url) =>
              (!url[1].private || isAuth) && (
                <li key={url[1].path}>
                  <NavLink to={url[1].path}>{url[0]}</NavLink>
                </li>
              ),
          )}
        </ul>
        <TwitterAuth />
      </div>
    </nav>
  );
};

export default Header;
