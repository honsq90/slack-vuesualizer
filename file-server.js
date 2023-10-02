const express = require("express");
const multer = require("multer");
const cors = require("cors");
const serveIndex = require("serve-index")

const staticDirectory = 'uploads';
const emojiDest = `${staticDirectory}/emojis`;
const attachmentDest = `${staticDirectory}/attachments`;

const createStorage = dest => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dest);
        },
        filename: function (req, file, cb) {
            let filename = req.params.name;
            cb(null, filename);
        },
    });
    return multer({ storage: storage });
};

const emojiStore = createStorage(emojiDest);
const attachmentStore = createStorage(attachmentDest);

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Hi" });
});

app.post("/upload/emoji/:name", emojiStore.single("file"), uploadFiles);
app.post("/upload/attachment/:name", attachmentStore.single("file"), uploadFiles);
app.use("/static", express.static(staticDirectory), serveIndex(staticDirectory, {'icons': true}));

function uploadFiles(req, res) {
    res.json({ message: "Successfully uploaded files" });
}

app.listen(5000, () => {
    console.log(`Server started...`);
});