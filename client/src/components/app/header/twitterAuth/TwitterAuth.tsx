import { useCallback, useEffect } from 'react';
import queryString from 'query-string';
import './twitterAuth.scss';
import {
  checkIsAuth,
  setTwitterRequestTokenUrl,
  twitterLogin,
  twitterLogout,
} from '../../../../redux/twitterAuth/thunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { OAUTH_ACCESS_TOKEN } from '../../../../redux/twitterAuth/constants';

const TwitterAuth: React.FC = () => {
  const { isAuth, userName, twitterRequestTokenUrl, isLoading } = useAppSelector(
    (store) => store.twitterAuth
  );
  const dispatch = useAppDispatch();

  const goToTwitterRequestToken = useCallback(() => {
    if (!twitterRequestTokenUrl && !isLoading) dispatch(setTwitterRequestTokenUrl());
  }, [dispatch, twitterRequestTokenUrl, isLoading]);

  const twitterSignIn = useCallback(async () => {
    const oAuthAccessToken = localStorage.getItem(OAUTH_ACCESS_TOKEN);

    if (oAuthAccessToken) {
      return dispatch(checkIsAuth(oAuthAccessToken));
    }

    const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);

    if (oauth_token && oauth_verifier) {
      await dispatch(
        twitterLogin({ oauth_token: String(oauth_token), oauth_verifier: String(oauth_verifier) })
      );

      window.history.pushState({}, '', '/');
    }
  }, [dispatch]);

  const twitterSignOut = useCallback(() => {
    const oAuthAccessToken = localStorage.getItem(OAUTH_ACCESS_TOKEN);
    if (oAuthAccessToken && !isLoading) {
      dispatch(twitterLogout(oAuthAccessToken));
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    twitterSignIn();
  }, [twitterSignIn]);

  useEffect(() => {
    if (twitterRequestTokenUrl) window.location.href = twitterRequestTokenUrl;
  }, [twitterRequestTokenUrl]);

  return (
    <div className="twitterAuth">
      {isAuth ? (
        <>
          <span>Hello, {userName}!</span>
          <a className="waves-effect btn" target="_blank" rel="noreferrer" onClick={twitterSignOut}>
            Sign out
          </a>
        </>
      ) : (
        <>
          <a className="waves-effect btn" onClick={goToTwitterRequestToken}>
            Sign in
          </a>
          <span>or</span>
          <a
            href="https://twitter.com"
            className="waves-effect btn"
            target="_blank"
            rel="noreferrer"
          >
            Sign up
          </a>
        </>
      )}
    </div>
  );
};

export default TwitterAuth;
