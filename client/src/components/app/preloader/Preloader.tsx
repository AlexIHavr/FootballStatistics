import classNames from 'classnames';
import { useAppSelector } from '../../../hooks/redux';
import './preloader.scss';

const Preloader: React.FC = () => {
  const { isLoading } = useAppSelector((store) => store.twitterAuth);

  return (
    <div className={classNames('preloader-wrapper big', { active: isLoading })}>
      <div className="spinner-layer spinner-green-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
