import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config()

const videoPath = process.env.VIDEO_PATH;
const overlaysFolder = process.env.OVERLAYS_FOLDER;
const outputFolder = process.env.OUTPUTS_FOLDER;

(async () => {
    const overlayFiles = (await fs.readdir(overlaysFolder)).filter(file => file.endsWith('.png'));
    if (overlayFiles.length === 0) {
        console.error('No PNG overlays found in the folder.');
        return;
    }

    try {
        for (const overlayFile of overlayFiles) {
            console.log(`Adding ${overlayFile} overlay`);

            const overlayPath = path.join(overlaysFolder, overlayFile);
            const { name: overlayFileName } = path.parse(overlayFile);
            const outputPath = path.join(outputFolder, `${overlayFileName}.mp4`)

            ffmpeg()
                .on('progress', (progress) => {
                    console.log(`${overlayFileName} | In progress: ${progress.timemark}`);
                })
                .on('error', (err, stdout, stderr) => {
                    console.error(`${overlayFileName} | Error: ${err.message}`);
                })
                .on('end', () => {
                    console.log(`${overlayFileName} | Finished`);
                })
                .input(videoPath)
                .input(overlayPath)
                .complexFilter(["overlay"])
                .output(outputPath)
                .run();
        }
    } catch (err) {
        console.error('Error:', err);
    }
})();