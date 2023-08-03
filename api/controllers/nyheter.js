import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getNyheter = (req, res) => {
  const q = "SELECT * FROM nyheter ORDER BY date DESC";

  db.query(q, [], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getNyhet = (req, res) => {
  const q =
  "SELECT nyheter.id, `username`, `title`, `desc`, `img`, `date` FROM users JOIN nyheter ON users.id = nyheter.uid WHERE nyheter.id= ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addNyheter = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO nyheter(`title`, `desc`, `img`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("News has been created.");
    });
  });
};

export const deleteNyheter = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const nyhetId = req.params.id;

    const getImageFilenameQuery = "SELECT img FROM nyheter WHERE id = ?";
      db.query(getImageFilenameQuery, [nyhetId], (err, result) => {
        if (err) return res.status(500).json(err);
  
        const imageFilename = result[0].img;
  
        // Delete the image file from storage
        const imagePath = `../client/upload/Nyheter/Nyheter_Bilder/${imageFilename}`;
        fs.unlink(imagePath, (unlinkErr) => {
          if (unlinkErr) console.error("Error deleting image:", unlinkErr);
  
          // Proceed to delete the sponsor record from the database
          const deleteQuery = "DELETE FROM nyheter WHERE id = ?";
          db.query(deleteQuery, [nyhetId], (deleteErr, data) => {
            if (deleteErr) return res.status(403).json("You can delete only your nyhet!");
  
            return res.json("Nyhet have been deleted!");
          });
        });
      });
  });
};

export const updateNyheter = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const nyhetId = req.params.id;
    const q =
      "UPDATE nyheter SET `title`=?,`desc`=?,`img`=? WHERE `id` = ?";

    const values = [req.body.title, req.body.desc, req.body.img];

    db.query(q, [...values, nyhetId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("News has been updated.");
    });
  });
};