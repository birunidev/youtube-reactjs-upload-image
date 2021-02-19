const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post(`/api/upload`, upload.single("photo"), (req, res) => {
  // save filename nya ke database
  // return url ke user

  let finalImageURL =
    req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;

  res.json({ image: finalImageURL });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, (e) => {
  if (e) throw e;

  console.log(`Server is running on PORT : ${PORT}`);
});
