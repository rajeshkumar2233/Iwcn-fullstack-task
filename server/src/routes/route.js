const express = require("express")
const router = express.Router()
const { mysqlModel } = require("../db")

router.post('/notes', (req, res) => {
    try {
      const { title, description ,  data } = req.body;
      const option = `INSERT INTO note (title, description, date) VALUES ('${title}', '${description}', NOW())`;
  
      mysqlModel.query(option, (err, data) => {
        if (err) {
          res.status(400).send(err.message);
        } else {
          res.status(201).send(data);      
        }
      });
    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
  });
  
router.get("/notes", (req, res) => {
    try {
        const query = "SELECT * FROM note"
        mysqlModel.query(query, (err, result) => {
            if (err) {
                res.status(400).send(err.message)
            } else {
                res.status(200).send(result)
            }
        })
    } catch (err) {
        res.status(500).send({status: false, message: err.message})
    }
})

router.delete("/notes/:id", (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(400).send("Please provide an ID in the URL params")
        }
        const query = `DELETE FROM note WHERE id=${id}`
        mysqlModel.query(query, (err, result) => {
            if (err) {
                console.error(err) // log the error to the console for debugging
                return res.status(400).send(err.message)
            } else {
                console.log(result) // log the query result to the console for debugging
                return res.status(200).send("Deleted")
            }
        })
    } catch (err) {
        console.error(err) // log the error to the console for debugging
        return res.status(500).send({status: false, message: err.message})
    }
})


router.get("/*", (req, res) => {
    res.send("Page not found")
})

module.exports = router
