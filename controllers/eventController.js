const assert = require("assert");
const Definer = require("../lib/mistake");
const Event = require("../models/Event");

const eventController = {
  addNewEvent: async (req, res) => {
    try {
      console.log("POST: cont/addNewEvent");
      assert(req.file, Definer.general_err3);

      const event = new Event();
      const data = req.body;
      data.seller_mb_nick = req.member?.mb_nick;
      data.event_image = req?.file?.path.replace(/\\/g, "/");

      const result = await event.addNewEventData(data, req.member);

      const html = `<script> alert("New Event added successfully");
      window.location.replace('/maltimart/events/menu')</script>`;
      res.end(html);
    } catch (err) {
      console.log(`ERROR, cont/addNewEvent, ${err.message}`);
    }
  },
};
module.exports = eventController;
