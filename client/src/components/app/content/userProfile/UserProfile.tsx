import { Button } from '@mui/material';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { USER_DATA } from '../../../../redux/twitterAuth/constants';
import { setUserData } from '../../../../redux/twitterAuth/thunks';
import { UserData } from '../../../../redux/twitterAuth/types';
import FormField from '../../../common/formField/FormField';

import './userProfile.scss';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { userData, userDataError, isLoading } = useAppSelector((state) => state.twitterAuth);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...userData,
      [USER_DATA.birthDay]: userData?.birthDay || new Date().toLocaleDateString('sv-SE'),
    },
  });

  const onBlur: SubmitHandler<UserData> = useCallback(
    ({ name, birthDay, email }) => {
      dispatch(setUserData({ name: name?.trim(), birthDay, email: email?.trim() }));
    },
    [dispatch],
  );

  return (
    <div className="leagueTeamContent">
      <div className="teamItem">
        <form className="profileForm" onSubmit={handleSubmit(onBlur)}>
          <FormField fieldName={USER_DATA.name} control={control} required />
          <FormField fieldName={USER_DATA.birthDay} control={control} type="date" />
          <FormField fieldName={USER_DATA.email} control={control} type="email" />
          {userDataError !== null &&
            (!userDataError ? (
              <p className="success">Data has changed successfully.</p>
            ) : (
              <p className="error">{userDataError}</p>
            ))}
          <Button className="btn" type="submit" variant="contained" disabled={isLoading}>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
