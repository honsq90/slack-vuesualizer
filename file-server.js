const express = require("express");
const multer = require("multer");
const cors = require("cors");

const staticDirectory = 'uploads';
const emojiDest = `${staticDirectory}/emojis`;
const attachmentDest = `${staticDirectory}/attachments`;

const createStorage = dest => {
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dest);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });
    return multer({ storage: storage });
};

const emojiStore = createStorage(emojiDest);
const attachmentStore = createStorage(attachmentDest);

const app = express();
app.use('/static', express.static(staticDirectory));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Hi" });
});

app.use(express.static('public'));

app.post("/upload/emoji", emojiStore.single("file"), uploadFiles);
app.post("/upload/attachment", attachmentStore.single("file"), uploadFiles);

function uploadFiles(req, res) {
    res.json({ message: "Successfully uploaded files" });
}

app.listen(5000, () => {
    console.log(`Server started...`);
});