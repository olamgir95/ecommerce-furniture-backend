const assert = require("assert");
const Definer = require("../lib/mistake");
const eventModel = require("../schema/event.model");
const { shapeIntoMongooseObjectId } = require("../lib/config");

class Event {
  constructor() {}
  async getMySellerEventsData(member) {
    try {
      const id = shapeIntoMongooseObjectId(member?._id);
      const result = await eventModel.find({
        seller_mb_id: id,
      });
      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async addNewEventData(data, member) {
    try {
      data.seller_mb_id = shapeIntoMongooseObjectId(member?._id);

      const new_event = new eventModel(data);
      const result = await new_event.save();

      assert.ok(result, Definer.event_err1);
      console.log("res", result);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = Event;
