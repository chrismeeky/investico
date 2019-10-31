import { StockController } from '../controllers';
import Validate from '../validation';
import { Authorization } from '../middlewares';

const questionRoute = app => {
  app.post('/api/v1/stock',
    Authorization.checkToken,
    Validate.validateUserInput,
    StockController.addAStock);
  app.get('/api/v1/stocks',
    StockController.viewAvailableStocks);
};

export default questionRoute;
