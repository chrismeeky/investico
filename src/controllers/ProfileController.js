import { Profile } from '../models';
import { HelperMethods } from '../utils';

/**
 * Class representing the Profile controller
 * @class StockController
 * @description stock controller
 */
class ProfileController {
  /**
   * Add a new Stock
   * Route: POST: /api/v1/profile
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof ProfileController
   */
  static async addAStock(req, res) {
    const { id } = req.decoded;
    const { tradingCode, numberOfUnits } = req.body;
    const newStock = {
      userId: id,
      tradingCode,
      numberOfUnits,
    };

    const stock = new Profile(newStock);
    try {
      const addedStock = await stock.save();
      if (addedStock) {
        return HelperMethods.requestSuccessful(res, {
          success: true,
          stock: addedStock
        });
      }
    } catch (e) {
      return HelperMethods.serverError(res, e.message);
    }
  }
}

export default ProfileController;