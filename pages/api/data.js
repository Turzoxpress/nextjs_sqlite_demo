import sqlite3 from "sqlite3";

export default async function handler(req, res) {
  // Connect to the SQLite database
  const db = new sqlite3.Database("mydatabase.db");

  if (req.method === "POST") {
    // Get the data from the request body
    const { name } = req.body;

    // Insert the data into the database
    db.run("INSERT INTO mytable (name) VALUES (?)", [name], (err) => {
      if (err) {
        console.log("Error : " + err.message);
        return res.json({
          status: 500,
          message: "Error inserting data into the database",
        });
        // res.status(500).send("Error inserting data into the database");
      } else {
        return res.json({ status: 200, message: "Data inserted successfully" });
        // res.status(200).send("Data inserted successfully");
      }
    });
  } else {
    // Query the database for data
    const rows = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM mytable", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    // Return the data as JSON
    res.json(rows);
  }

  // Close the database connection
  db.close();
}
