# Book videos

On 2026-10-05 the owner supplied three MP4s and requested R2 upload and playback when each matching book is clicked.

| Book | Public media path |
| --- | --- |
| Barya to Blockchain: Web3 Young Learners Encyclopedia | `/media/books/barya-to-blockchain.mp4` |
| Programming for Youth: Code Like a Cook | `/media/books/code-like-a-cook.mp4` |
| Wave3 Handbook | `/media/books/wave3-handbook.mp4` |

Local playback copies live in the ignored `client/public/media/books/` directory. The supplied originals remain untouched. Copies use lossless MP4 remuxing (`-c copy -movflags +faststart`) for progressive playback, preserving audio and video quality.

The private staging and production buckets store versioned objects under `videos/books/`. Every object is downloaded and SHA-256 verified before its entry is added to `shared/media-assets.json`; see `book-video-verification.json`. Metadata is `video/mp4` and `Cache-Control: public, max-age=3600`. The existing site media handler provides same-origin access and byte ranges.

`BookVideo.tsx` opens an accessible dialog from the book cover or caption. The matching video mounts only after interaction and requests autoplay with native controls. Closing removes the video and stops playback. Escape, keyboard activation, focus restoration, and a media-error fallback are supported. If browser autoplay policy blocks playback, the native play control remains available.

The application and asset map require the normal website deployment to activate these URLs on the live site. Uploading objects alone does not deploy the UI. No video binaries are committed or bundled into the Cloudflare build.
