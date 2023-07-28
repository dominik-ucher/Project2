import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPics = (req, res) => {
    const q = "SELECT * FROM homepagemenu";
  
    db.query(q, [], (err, data) => {
      if (err) return res.status(500).send(err);
  
      return res.status(200).json(data);
    });
  };

export const getPic = (req, res) => {
  const q =
  "SELECT `img`, `link` FROM homepagemenu WHERE navbar.id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPic = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q =
        "INSERT INTO homepagemenu(`img`, `link`) VALUES (?)";
  
      const values = [
        req.body.img,
        req.body.link,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Page has been created.");
      });
    });
  };

export const deletePic = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const picId = req.params.id;
    const q = "DELETE FROM homepagemenu WHERE `id` = ?";

    db.query(q, [picId], (err, data) => {
      if (err) return res.status(403).json("You can delete only if logged in");

      return res.json("Page has been deleted!");
    });
  });
};

export const updatePic = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const picId = req.params.id;
      const q =
        "UPDATE homepagemenu SET `img`=?,`link`=? WHERE `id` = ?";
  
      const values = [req.body.img, req.body.link];
  
      db.query(q, [...values, picId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Page has been updated.");
      });
    });
  };