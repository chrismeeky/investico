import { Profile, Stock } from '../models';
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

    try {
      const originalStock = await Stock.findOne({ tradingCode });
      const availableVolume = originalStock.volume;
      const volumeAfterSale = availableVolume - numberOfUnits;
      const stock = new Profile(newStock);
      const addedStock = await stock.save();
      if (addedStock) {
        const removedStock = await Stock.updateOne({ tradingCode }, { $set: { volume: volumeAfterSale } });
        if (removedStock) {
          return HelperMethods.requestSuccessful(res, {
            success: true,
            stock: addedStock
          });
        }
      }
    } catch (e) {
      return HelperMethods.serverError(res, e.message);
    }
  }

  /**
   * View current stocks
   * Route: GET: /api/v1/stocks
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof ProfileController
   */
  static async viewCurrentStock(req, res) {
    const { id } = req.decoded;
    const stocks = await Profile.find({ userId: id });
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

  /**
   * Sell a Stock
   * Route: PATCH: /api/v1/profile
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof ProfileController
   */
  static async sellAStock(req, res) {
    const { tradingCode } = req.body;
    let { numberOfUnits } = req.body;
    numberOfUnits = parseInt(numberOfUnits, 10);

    try {
      const originalStock = await Stock.findOne({ tradingCode });
      const availableVolume = originalStock.volume;
      const volumeAfterSale = availableVolume + numberOfUnits;

      const stockForSale = await Profile.findOne({ tradingCode });
      
      const stockForSaleVolume = stockForSale.numberOfUnits;
      const remainingVolumeAfterSale = stockForSaleVolume - numberOfUnits;
      const soldStock = await Profile.updateOne({ tradingCode }, { $set: { numberOfUnits: remainingVolumeAfterSale } });

      if (soldStock) {
        const addedStock = await Stock.updateOne({ tradingCode }, { $set: { volume: volumeAfterSale } });
        if (addedStock) {
          return HelperMethods.requestSuccessful(res, {
            success: true,
            message: 'you have successfully sold your stock'
          });
        }
      }
    } catch (e) {
      return HelperMethods.serverError(res, e.message);
    }
  }
}

export default ProfileController;
