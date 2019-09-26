const {fetchMyIP} = require('./iss.js');
const {fetchCoordsByIP} = require('./iss.js');
const {fetchISSFlyOverTimes} = require('./iss.js');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("Error: IP not found!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);

  fetchCoordsByIP(ip, (error, results) => {
    if (error) {
      console.log("Error: Coordinates not found:", error);
      return;
    } else {
      console.log('Coordinates fetched!', results);

      fetchISSFlyOverTimes(results, (error, results) => {
        if (error) {
          console.log('Error: Flyover times not found:', error);
          return;
        } else {
          console.log('Flyover times found! :', results);
        }
      });
    }
  });
});


// fetchISSFlyOverTimes(firstIP, (error, results) => {
//   if(error) {
//     console.log('Error: Flyover times not found:', error);
//     return;
//   } else {
//     console.log('Flyover times found! :', results);
//   }
// })



// fetchCoordsByIP(ip, (error, data) => {
//   console.log(error, data);
// })

