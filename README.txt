SSYouTube Standalone - MP3 + MP4 iframe API version
====================================================

This is a clean HTML/CSS/JavaScript rebuild. WordPress and HTTrack are not required.

INSTALLATION
------------
1. Extract this ZIP.
2. Upload all files and folders into your hosting document root, commonly public_html/.
3. Open https://ssyoutube.work/ after your DNS and hosting are configured.
4. No PHP, yt-dlp or FFmpeg installation is required for the included iframe widgets.

HOW THE DOWNLOAD WIDGET WORKS
-----------------------------
The JavaScript extracts the YouTube video ID from:
- youtube.com/watch?v=VIDEO_ID
- youtu.be/VIDEO_ID
- youtube.com/shorts/VIDEO_ID
- youtube.com/live/VIDEO_ID
- youtube.com/embed/VIDEO_ID

It then creates these external iframe widgets:
MP3: https://mp3api.ytjar.info/?id=VIDEO_ID
MP4: https://mp4api.ytjar.info/?id=VIDEO_ID

The iframe is created only after the visitor clicks Download.

IMPORTANT
---------
The conversion service is third-party infrastructure. Your website does not control its uptime,
terms, download behavior, or availability. Verify that the service is permitted for your intended
use before putting the site into production. Do not use iframe sandbox restrictions with the widget.

API CUSTOMIZATION
------------------
The endpoints are configured at the top of js/downloader.js:

const API = {
  mp3: 'https://mp3api.ytjar.info/?id=',
  mp4: 'https://mp4api.ytjar.info/?id='
};

If the provider gives you a different endpoint later, change these two values and re-upload
js/downloader.js.

LEGAL
-----
Only provide downloads for content you own or are authorized to download, and comply with the
terms of the source platform and applicable law. Review and replace the included legal-page
placeholders before launch.
