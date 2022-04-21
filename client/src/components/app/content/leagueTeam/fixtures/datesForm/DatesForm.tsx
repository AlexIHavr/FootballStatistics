import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { params } from '../../../../../../constants/app';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { datesFormNames, DEFAULT_VALUES_DATES } from '../../../../../../redux/leagueTeam/constants';
import { setDatesFormFields } from '../../../../../../redux/leagueTeam/reducer';
import { setTeamFixtures } from '../../../../../../redux/leagueTeam/thunks';
import { DatesFormFields, DatesFormNames } from '../../../../../../redux/leagueTeam/types';
import DateField from './dateField/DateField';

import './datesForm.scss';

const DatesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { datesFormFields } = useAppSelector((state) => state.leagueTeam);
  const { [params.teamId]: teamId } = useParams();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<DatesFormFields>({
    mode: 'onBlur',
    defaultValues: datesFormFields || DEFAULT_VALUES_DATES,
  });

  const onBlur: SubmitHandler<DatesFormFields> = useCallback(
    (data) => {
      if (
        teamId &&
        !Object.keys(errors).length &&
        ((Object.keys(data) as DatesFormNames[]).some(
          (key) => datesFormFields && datesFormFields[key] !== data[key]
        ) ||
          !datesFormFields)
      ) {
        dispatch(setTeamFixtures({ teamId, dateFrom: data.dateFrom, dateTo: data.dateTo }));
        dispatch(setDatesFormFields(data));
      }
    },
    [dispatch, teamId, errors, datesFormFields]
  );

  useEffect(() => {
    if (!datesFormFields) onBlur(DEFAULT_VALUES_DATES);
  }, [onBlur, datesFormFields]);

  return (
    <div className="teamItem">
      <form onBlur={handleSubmit(onBlur)} className="datesForm">
        <DateField fieldName={datesFormNames.dateFrom} control={control} errors={errors} />
        <DateField fieldName={datesFormNames.dateTo} control={control} errors={errors} />
      </form>
    </div>
  );
};

export default DatesForm;
