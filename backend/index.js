const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express();
const port = 5200;

app.use(cors());

app.use(express.json());

app.post("/download", async (req, res) => {
  console.log("entrou");
  try {
    const { videoUrl } = req.body;
    const videoInfo = await ytdl.getInfo(videoUrl);
    const info = ytdl.downloadFromInfo(videoUrl);
    const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioandvideo");
    console.log(audioFormats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// if (!videoUrl || !ytdl.validateURL(videoUrl)) {
//   console.log("Invalid YouTube URL");
//   return res.status(400).json({ error: "Invalid YouTube URL" });
// }

// const info = await ytdl.getInfo(videoUrl);
// const formats = ytdl.filterFormats(info.formats, "videoandaudio");

// if (formats.length === 0) {
//   return res.status(400).json({ error: "No suitable format found for download" });
// }

// const videoStream = ytdl(videoUrl, { format: formats[0].itag });

// res.header("Content-Disposition", `attachment; filename="${info.title}.mp4"`);
// videoStream.pipe(res);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
