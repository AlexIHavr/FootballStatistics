import { useCallback, useEffect } from 'react';
import { twitterApi } from '../../../../api/serverApi';
import queryString from 'query-string';
import './twitterAuth.scss';
import { checkIsAuth, twitterLogin, twitterLogout } from '../../../../redux/twitterAuth/thunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { oAuthRequestTokenType } from '../../../../types/twitterAuth';
import { OAUTH_ACCESS_TOKEN } from '../../../../redux/twitterAuth/constants';

const TwitterAuth: React.FC = () => {
  const { isAuth, userName } = useAppSelector((store) => store.twitterAuth);
  const dispatch = useAppDispatch();
  const goToTwitterRequestToken = useCallback(async () => {
    try {
      const response = await twitterApi.post<oAuthRequestTokenType>(`/oauth/getRequestToken`);

      const { oAuthToken } = response.data;
      window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oAuthToken}`;
    } catch (err) {
      console.log(err);
    }
  }, []);

  const twitterSignIn = useCallback(async () => {
    const oAuthAccessToken = localStorage.getItem(OAUTH_ACCESS_TOKEN);

    if (oAuthAccessToken) {
      return dispatch(checkIsAuth(oAuthAccessToken));
    }

    const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);
    if (oauth_token && oauth_verifier) {
      await dispatch(twitterLogin(oauth_token as string, oauth_verifier as string));
      window.location.href = '/';
    }
  }, [dispatch]);

  const twitterSignOut = useCallback(() => {
    const oAuthAccessToken = localStorage.getItem(OAUTH_ACCESS_TOKEN);
    if (oAuthAccessToken) {
      dispatch(twitterLogout(oAuthAccessToken));
    }
  }, [dispatch]);

  useEffect(() => {
    twitterSignIn();
  }, [twitterSignIn]);

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
