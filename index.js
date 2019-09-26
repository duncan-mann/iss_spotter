
const {nextISSTimesForMyLocation} = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation( (error, passTimes) => {
  if (error) {
    return console.log('Error!', error);
  } else {
    printPassTimes(passTimes);
  }
});

//   fetchMyIP((error, ip) => {
//     if (error) {
//       console.log("Error: IP not found!" , error);
//       return;
//     }
//     console.log('It worked! Returned IP:' , ip);

//     fetchCoordsByIP(ip, (error, results) => {
//       if (error) {
//         console.log("Error: Coordinates not found:", error);
//         return;
//       } else {
//         console.log('Coordinates fetched!', results);

//         fetchISSFlyOverTimes(results, (error, results) => {
//           if (error) {
//             console.log('Error: Flyover times not found:', error);
//             return;
//           } else {
//             console.log('Flyover times found! :', results);
//           }
//         });
//       }
//     });
//   });
// });
