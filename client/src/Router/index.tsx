import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './routes';
import AdminPanel from '@src/components/AdminPanel';
import CandidatePanel from '@src/components/CandidatePanel';

const RouterSwitch = () => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.CANDIDATE} component={CandidatePanel} />
      <Route exact path={ROUTES.ADMIN} component={AdminPanel} />
    </Switch>
  </Router>
);

export default RouterSwitch;