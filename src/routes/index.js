import authRoute from './authRoute';
import stockRoute from './stockRoute';
import profileRoute from './profileRoute';

const routes = app => {
  authRoute(app);
  stockRoute(app);
  profileRoute(app);
};
export default routes;
