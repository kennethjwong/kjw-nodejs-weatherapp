const request = require("postman-request");
const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=8a990bc290fdc4684d548a06ce5d482f&query=${encodeURIComponent(
    address
  )}&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    // console.log("ERROR:" + error, "BODY: " + JSON.stringify(body));
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.error || body.data.length === 0) {
      callback("Unable to find location specified ...", undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].label,
      });
    }
  });
};
module.exports = geocode;
