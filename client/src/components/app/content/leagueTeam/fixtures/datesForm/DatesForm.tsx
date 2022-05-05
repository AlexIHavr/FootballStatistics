import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { PARAMS } from '../../../../../../constants/app';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import {
  DATES_FORM_NAMES,
  DEFAULT_VALUES_DATES,
} from '../../../../../../redux/leagueTeam/constants';
import { setDatesFormFields } from '../../../../../../redux/leagueTeam/reducer';
import { setTeamFixtures } from '../../../../../../redux/leagueTeam/thunks';
import { DatesFormFields, DatesFormNames } from '../../../../../../redux/leagueTeam/types';
import FormField from '../../../../../common/formField/FormField';

import './datesForm.scss';

const DatesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { datesFormFields } = useAppSelector((state) => state.leagueTeam);
  const { [PARAMS.teamId]: teamId } = useParams();

  const { control, handleSubmit } = useForm<DatesFormFields>({
    mode: 'onBlur',
    defaultValues: datesFormFields,
  });

  const onBlur: SubmitHandler<DatesFormFields> = useCallback(
    (data) => {
      if (
        teamId &&
        (Object.keys(data) as DatesFormNames[]).some(
          (key) => datesFormFields && datesFormFields[key] !== data[key],
        )
      ) {
        dispatch(setTeamFixtures({ teamId, dateFrom: data.dateFrom, dateTo: data.dateTo }));
        dispatch(setDatesFormFields(data));
      }
    },
    [dispatch, teamId, datesFormFields],
  );

  useEffect(() => {
    if (teamId) dispatch(setTeamFixtures({ teamId, ...DEFAULT_VALUES_DATES }));
  }, [dispatch, teamId]);

  return (
    <div className="teamItem">
      <form onBlur={handleSubmit(onBlur)}>
        <FormField fieldName={DATES_FORM_NAMES.dateFrom} control={control} type="date" />
        <FormField fieldName={DATES_FORM_NAMES.dateTo} control={control} type="date" />
      </form>
    </div>
  );
};

export default DatesForm;
