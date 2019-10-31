import { Stock } from '../models';
import { HelperMethods } from '../utils';

/**
 * Class representing the stock controller
 * @class StockController
 * @description stock controller
 */
class StockController {
  /**
   * Add a new Stock
   * Route: POST: /api/v1/stock
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof StockController
   */
  static async addAStock(req, res) {
    const { body, decoded: { id } } = req;

    const stock = new Stock({ ...body, userId: id, });
    try {
      const newStock = await stock.save();
      if (newStock) {
        return HelperMethods.requestSuccessful(res, {
          success: true,
          question: newStock
        });
      }
    } catch (e) {
      return HelperMethods.serverError(res, e.message);
    }
  }

  /**
   * View all available stocks
   * Route: GET: /api/v1/stocks
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof StockController
   */
  static async viewAvailableStocks(req, res) {
    const stocks = await Stock.find({});
    try {
      if (!stocks.length) return HelperMethods.clientError(res, 'no stocks found');
      return HelperMethods.requestSuccessful(res, {
        success: true,
        stocks,
      });
    } catch (e) {
      return HelperMethods.serverError(res, e.message);
    }
  }
}

export default StockController;
