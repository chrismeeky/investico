import { ProfileController } from '../controllers';
import Validate from '../validation';
import { Authorization } from '../middlewares';

const profileRoute = app => {
  app.post('/api/v1/profile',
    Authorization.checkToken,
    Validate.validateUserInput,
    ProfileController.addAStock);
};

export default profileRoute;
