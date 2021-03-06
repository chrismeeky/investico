import { UserController } from '../controllers';
import Validate from '../validation';
import { Authorization } from '../middlewares';

const authRoutes = app => {
  app.post(
    '/api/v1/auth/signup',
    Validate.validateUserInput,
    UserController.signUp,
  );
  app.post(
    '/api/v1/auth/login',
    Validate.validateUserLogin,
    UserController.login,
  );
  app.get(
    '/api/v1/auth/verify_email',
    Authorization.checkToken,
    UserController.verifyEmail,
  );
  app.patch('/api/v1/user/stock',
    Authorization.checkToken,
    Validate.validateUserInput,
    UserController.updateUserStock);
};

export default authRoutes;
