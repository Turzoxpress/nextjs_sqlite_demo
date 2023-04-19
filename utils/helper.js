async function getServerSideProps() {
  // Fetch data from the API endpoint
  const res = await fetch("/api/data");
  const data = await res.json();

  console.log("data" + JSON.stringify(data));

  return data;
}

async function saveData(newData) {
  const res = await fetch("/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  const data = await res.json();
  console.log("saved data: ", data);
}

export default { getServerSideProps, saveData };
