function fetchData(callback) {
  setTimeout(() => {
    const isSuccess = Math.random() > 0.5;

    if (isSuccess) {
      const users = ["Alice", "Bob", "Charlie", "David"];
      callback(null, users);
    } else {
      callback("Error: Failed to fetch data", null);
    }
  }, 2000);
}

function handleResponse(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log("Fetched Users:", data);
  }
}

fetchData(handleResponse);

/*
when error :   Error: Failed to fetch data
when no error:  Fetched Users: ["Alice", "Bob", "Charlie", "David"]
 */
