// import axios from "axios";
//
// // Attempt to make an API call.
// // Retry according to operation settings set above in case of network errors.
// // Solution to annoying bug:
// // https://stackoverflow.com/questions/66476583/how-to-await-a-callback-function-call-in-node-js
// export async function runApiCallAttempt(
//     operation,
//   goal,
//   currentAttempt,
//   url,
//   resolve,
//   reject
// ) {
//   try {
//     console.log(`Sending request: ${currentAttempt} attempt for ${goal}`);
//     const response = await axios.get(url);
//     resolve(response);
//     setLoading(false);
//     return response;
//   } catch (err) {
//     // if (operation.retry(err)) {
//     //   throw err;
//     // }
//     setLoading(true);
//     if (err.response.status === 404)
//       throw new Response("Not Found", { status: 404 });
//     else if (operation.retry(err)) return;
//   }
// }
