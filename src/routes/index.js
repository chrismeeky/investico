import authRoute from './authRoute';
import stockRoute from './stockRoute';

const routes = app => {
  authRoute(app);
  stockRoute(app);
};
export default routes;
