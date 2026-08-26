/* SSYouTube standalone iframe API integration
 * The conversion widgets are provided by the configured third-party API.
 * No API key is exposed in browser code.
 */
const input = document.getElementById('videoURL');
const downloadBtn = document.getElementById('download');
const pasteBtn = document.getElementById('paste');
const loader = document.getElementById('loader');
const msg = document.getElementById('message');
const result = document.getElementById('result');

const API = {
  mp3: 'https://mp3api.ytjar.info/?id=',
  mp4: 'https://mp4api.ytjar.info/?id='
};

function getYouTubeId(value) {
  try {
    const u = new URL(value.trim());
    const host = u.hostname.toLowerCase().replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = u.pathname.split('/').filter(Boolean)[0];
      return id && /^[A-Za-z0-9_-]{6,20}$/.test(id) ? id : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (u.pathname === '/watch') {
        const id = u.searchParams.get('v');
        return id && /^[A-Za-z0-9_-]{6,20}$/.test(id) ? id : null;
      }
      const parts = u.pathname.split('/').filter(Boolean);
      if (parts[0] === 'shorts' || parts[0] === 'embed' || parts[0] === 'live') {
        const id = parts[1];
        return id && /^[A-Za-z0-9_-]{6,20}$/.test(id) ? id : null;
      }
    }
  } catch (_) {}
  return null;
}

function validYouTube(url) {
  return !!getYouTubeId(url);
}

function createWidget(type, videoId) {
  const iframe = document.createElement('iframe');
  iframe.src = API[type] + encodeURIComponent(videoId);
  iframe.title = type === 'mp3' ? 'YouTube MP3 download widget' : 'YouTube MP4 download widget';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.scrolling = 'no';
  iframe.style.width = '100%';
  iframe.style.border = '0';
  iframe.style.display = 'block';
  iframe.style.overflow = 'hidden';
  iframe.style.height = type === 'mp3' ? '80px' : '175px';
  return iframe;
}

function renderWidgets(videoId, mode = 'both') {
  result.innerHTML = '';

  if (mode === 'both' || mode === 'mp3') {
    const box = document.createElement('div');
    box.className = 'api-widget';
    box.innerHTML = '<h3>Download MP3</h3>';
    box.appendChild(createWidget('mp3', videoId));
    result.appendChild(box);
  }

  if (mode === 'both') {
    const box = document.createElement('div');
    box.className = 'api-widget';
    box.innerHTML = '<h3>Download MP4</h3>';
    box.appendChild(createWidget('mp4', videoId));
    result.appendChild(box);
  }

  result.hidden = false;
}

if (pasteBtn) {
  pasteBtn.addEventListener('click', async () => {
    try {
      input.value = await navigator.clipboard.readText();
      input.focus();
      msg.textContent = '';
    } catch (_) {
      msg.textContent = 'Clipboard access is blocked. Paste the URL manually.';
    }
  });
}

if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    msg.textContent = '';
    result.hidden = true;

    const url = input.value.trim();
    const videoId = getYouTubeId(url);

    if (!videoId) {
      msg.textContent = 'Please enter a valid YouTube video URL.';
      input.focus();
      return;
    }

    loader.hidden = false;
    downloadBtn.disabled = true;

    // Small delay gives the loading state a chance to render before the iframes load.
    window.setTimeout(() => {
      const mode = document.body.dataset.apiMode || 'both';
      renderWidgets(videoId, mode);
      loader.hidden = true;
      downloadBtn.disabled = false;
    }, 250);
  });
}
