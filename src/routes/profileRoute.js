import { ProfileController } from '../controllers';
import Validate from '../validation';
import { Authorization } from '../middlewares';

const profileRoute = app => {
  app.post('/api/v1/profile',
    Authorization.checkToken,
    Validate.validateUserInput,
    ProfileController.addAStock);
  app.get('/api/v1/profile',
    Authorization.checkToken,
    Validate.validateUserInput,
    ProfileController.viewCurrentStock);
};

export default profileRoute;
