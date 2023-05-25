const request = require("postman-request");
const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=99efb4d483556a155762ae11abd97747&query=${encodeURIComponent(
    lat
  )},${encodeURIComponent(lng)}&units=f`;
  // const url = `http://api.weatherstack.com/current?access_key=10736a56f8148096fc8243f65942cb03&query=${latitude},${longitude}&units=f`;
  //   console.log(url);
  request({ url, json: true }, (error, { body }) => {
    // console.log(response);
    // const data = JSON.parse(response.body);
    if (error) {
      callback(
        "Unable to connect to weather service, please try again later ...",
        undefined
      );
    } else if (body.error) {
      callback("Unable to find location specified ...", undefined);
    } else {
      // console.log(body?.current);
      callback(
        undefined,
        `${body?.current.weather_descriptions[0]}. It's now ${body?.current.temperature} degrees and it feels like ${body?.current.feelslike} degrees and there is a ${body?.current.precip}% chance of rain`
      );
    }
  });
};
module.exports = forecast;
