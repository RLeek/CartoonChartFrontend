import { Switch, Route, Redirect } from 'react-router-dom';
import { monthToSeason } from '../../Utilities/transformer';
import CalenderPage from '../CalenderPage';
import ErrorPage from '../ErrorPage';

const App = () => {

  //Work out regex and then provide redirect
  //In this case then the calender page gets the year and the season
  //Also introduce a 404 page
  const season = monthToSeason(new Date().getMonth());
  const year  = new Date().getFullYear().toString();


  return (
    <>
      <Switch>
        <Route path = "/:season(Summer|Autumn|Winter|Spring)-:year([0-9]{4})" sensitive = {true}>
          <CalenderPage/>
        </Route>
        <Route path = "/" exact={true}>
          <Redirect to={"/"+season+"-"+year} />
        </Route>
        <Route path = "*">
          <ErrorPage/>
        </Route>
      </Switch>
    </>
  );
}

export default App;