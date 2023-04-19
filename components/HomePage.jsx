import { Josefin_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import helper from "../utils/helper";

function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    helper
      .getServerSideProps()
      .then((data) => {
        setData(data);
        console.log("not found : " + JSON.stringify(data));
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = { name };
    await helper.saveData(newData);
    setName("");
    setData([...data, newData]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
      {data.map((row) => (
        <div key={row.id}>{row.name}</div>
      ))}
    </div>
  );
}

export default HomePage;
