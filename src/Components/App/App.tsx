import { Switch, Route } from 'react-router-dom';
import CalenderPage from '../CalenderPage';

const App = () => {
  return (
    <>
      <Switch>
        <Route path = "/">
          <CalenderPage/>
        </Route>
      </Switch>
    </>
  );
}

export default App;