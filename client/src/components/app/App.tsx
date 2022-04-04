import Header from './header/Header';
import Preloader from './preloader/Preloader';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Preloader />
      <Header />
    </div>
  );
};

export default App;
