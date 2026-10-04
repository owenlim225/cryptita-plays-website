# Homepage hero video

The owner requested video-first homepage playback on 2026-10-05 and explicitly approved uploading its derivative to `cryptita-plays-media-staging` and `cryptita-plays-media-production`.

`HeroMedia.tsx` uses `/images/tambunan-outreach-hero.mp4`. It plays muted, inline, and on a loop. A still photo covers loading. The backup photos rotate only after a media error, rejected autoplay, or 15 seconds without startup/buffering recovery. Reduced-motion preferences keep a static photo and avoid requesting the video.

The original `client/public/images/tambunan-outreach.mp4` is preserved locally. It contains HEVC Main 10 video with end-of-file metadata. The derivative preserves the full duration, uses 1280×720 H.264/yuv420p, removes audio for the decorative background, and places metadata first for progressive playback:

```sh
ffmpeg -i client/public/images/tambunan-outreach.mp4 -an -vf scale=1280:-2 -c:v libx264 -preset fast -crf 26 -pix_fmt yuv420p -movflags +faststart client/public/images/tambunan-outreach-hero.mp4
```

Both binaries stay out of Git. The derivative's checksum and R2 object key are registered in `shared/media-assets.json` after upload verification. Cloudflare builds resolve the URL through the existing media handler, including byte-range requests, without bundling the video. Local Vite preview reads the derivative from `client/public/images/`.

Changes to the application and central map still require the normal website deployment. Media upload alone does not change the live homepage. The old Vercel rollback target does not serve this R2-backed video URL and will use the photo fallback.
