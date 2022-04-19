import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { params } from '../../../../../../constants/app';
import { useAppDispatch } from '../../../../../../hooks/redux';
import { datesFormNames } from '../../../../../../redux/leagueTeam/constants';
import { setTeamFixtures } from '../../../../../../redux/leagueTeam/thunks';
import { DatesFormNames } from '../../../../../../redux/leagueTeam/types';
import DateField from './dateField/DateField';

import './datesForm.scss';

const DatesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { [params.teamId]: teamId } = useParams();

  const defaultValues = useMemo(
    () => ({
      [datesFormNames.dateFrom]: new Date().toLocaleDateString('sv-SE'),
      [datesFormNames.dateTo]: new Date(
        new Date().getTime() + 60 * 60 * 24 * 1000 * 14
      ).toLocaleDateString('sv-SE'),
    }),
    []
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<DatesFormNames>({ mode: 'onBlur', defaultValues });

  const onBlur: SubmitHandler<DatesFormNames> = ({ dateFrom, dateTo }) => {
    if (teamId && !Object.keys(errors).length)
      dispatch(setTeamFixtures({ teamId, dateFrom, dateTo }));
  };

  useEffect(() => {
    if (teamId)
      dispatch(
        setTeamFixtures({ teamId, dateFrom: defaultValues.dateFrom, dateTo: defaultValues.dateTo })
      );
  }, [dispatch, teamId, defaultValues]);

  return (
    <div className="teamItem">
      <form onBlur={handleSubmit(onBlur)} className="datesForm">
        <DateField fieldValue={datesFormNames.dateFrom} control={control} errors={errors} />
        <DateField fieldValue={datesFormNames.dateTo} control={control} errors={errors} />
      </form>
    </div>
  );
};

export default DatesForm;
