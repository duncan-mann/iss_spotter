const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;

    } else {
      let ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }
    let parse = JSON.parse(body);
    let longitude = parse.data.longitude;
    let latitude = parse.data.latitude;
    let result = {"longitude" : longitude, "latitude" : latitude};
    callback(null, result);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(msg, null);
      return;
    }
    let responses = JSON.parse(body).response;
    callback(null, responses);
  });
};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return;
    }
    fetchCoordsByIP(ip, (error, results) => {
      if (error) {
        return;
      } else {
        fetchISSFlyOverTimes(results, (error, results) => {
          if (error) {
            return;
          } else {
            callback(null, results);
          }
        });
      }
    });
  });
  
};

module.exports = {nextISSTimesForMyLocation};