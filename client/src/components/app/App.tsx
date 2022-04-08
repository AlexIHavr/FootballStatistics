import Content from './content/Content';
import Header from './header/Header';
import Preloader from './preloader/Preloader';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Preloader />
      <Header />
      <Content />
    </div>
  );
};

export default App;
