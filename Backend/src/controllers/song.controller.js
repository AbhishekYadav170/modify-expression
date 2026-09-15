const songModel = require("../models/song.model")
const storageService = require("../services/storage.services")
const id3 = require ("node-id3")


async function uploadSong(req,res) {

    const songBuffer = req.file.buffer
    const { mood } = req.body
    const tags = id3.read(songBuffer)


    const [ songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title + ".mp3",
            foldername: "/cohort-2/moodify/song"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])
    

    const song =  await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    res.status(201).json({
        message: "song created successfully",
        song
    })
}

async function getSong(req, res) {
    try {
        const { mood } = req.query;

        if (!mood) {
            return res.status(400).json({
                message: "Mood is required"
            });
        }

        const songs = await songModel.find({
            mood: mood.toLowerCase().trim()
        });

        if (!songs.length) {
            return res.status(404).json({
                message: `No songs found for mood: ${mood}`
            });
        }

        // Random song select
        const randomSong =
            songs[Math.floor(Math.random() * songs.length)];

        return res.status(200).json({
            message: "Song fetched successfully.",
            song: randomSong
        });

    } catch (error) {
        console.error("Get Song Error:", error);

        return res.status(500).json({
            message: "Failed to fetch song"
        });
    }
}

module.exports = { uploadSong, getSong}