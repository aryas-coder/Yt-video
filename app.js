const config = {
  metadataApi: '/api/metadata',
  downloadApi: '/api/downloads/start',
  historyApi: '/api/history',
  settingsApi: '/api/settings',
};

const state = {
  activePage: 'home',
  downloadState: 'idle',
};

const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const pages = Array.from(document.querySelectorAll('.page'));

function setActivePage(pageId) {
  state.activePage = pageId;
  navLinks.forEach((link) => {
    const isActive = link.dataset.page === pageId;
    link.classList.toggle('active', isActive);
  });
  pages.forEach((page) => {
    page.classList.toggle('active', page.id === pageId);
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    setActivePage(link.dataset.page);
  });
});

setActivePage('home');

const form = document.getElementById('download-form');
const youtubeUrlInput = document.getElementById('youtube-url');
const pasteBtn = document.getElementById('paste-btn');
const clearBtn = document.getElementById('clear-btn');
const downloadBtn = document.getElementById('download-btn');
const qualitySelect = document.getElementById('quality-select');
const formatSelect = document.getElementById('format-select');
const videoTitle = document.getElementById('video-title');
const channelName = document.getElementById('channel-name');
const durationValue = document.getElementById('duration');
const publishedValue = document.getElementById('published');
const sizeValue = document.getElementById('size');
const thumbnail = document.getElementById('thumbnail');
const progressLabel = document.getElementById('download-progress');
const progressBar = document.getElementById('progress-bar');
const statusBadge = document.getElementById('download-status');
const infoCard = document.getElementById('info-card');
const qualityList = document.getElementById('quality-list');
const formatList = document.getElementById('format-list');
const historyList = document.getElementById('history-list');
const settingsForm = document.getElementById('settings-form');
const contactForm = document.getElementById('contact-form');

function populateSelect(select, values) {
  select.innerHTML = '';
  values.forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

async function fetchMetadata(url) {
  const response = await fetch(config.metadataApi, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) {
    throw new Error('Unable to fetch metadata');
  }
  return response.json();
}

async function startDownload(payload) {
  const response = await fetch(config.downloadApi, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Unable to start download');
  }
  return response.json();
}

function renderHistory(items) {
  historyList.innerHTML = '';
  if (!items.length) {
    historyList.innerHTML = '<div class="muted">No history yet. Your downloads will appear here.</div>';
    return;
  }
  items.forEach((item) => {
    const entry = document.createElement('article');
    entry.className = 'history-card';
    entry.innerHTML = `
      <div class="row-between">
        <strong>${item.title || 'Downloaded item'}</strong>
        <span class="badge">${item.status || 'completed'}</span>
      </div>
      <div class="muted">${item.format || 'MP4'} • ${item.quality || '1080p'} • ${item.downloadDate || 'Just now'}</div>
    `;
    historyList.appendChild(entry);
  });
}

async function loadHistory() {
  try {
    const response = await fetch(config.historyApi);
    if (!response.ok) return;
    const data = await response.json();
    renderHistory(data.data || []);
  } catch (error) {
    console.error(error);
  }
}

async function saveSettings(event) {
  event.preventDefault();
  const payload = Object.fromEntries(new FormData(settingsForm));
  await fetch(config.settingsApi, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

async function submitContact(event) {
  event.preventDefault();
  contactForm.reset();
}

pasteBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    youtubeUrlInput.value = text;
  } catch (error) {
    console.error(error);
  }
});

clearBtn.addEventListener('click', () => {
  form.reset();
  videoTitle.textContent = 'Video title will appear here';
  channelName.textContent = 'Channel name will appear here';
  durationValue.textContent = '—';
  publishedValue.textContent = '—';
  sizeValue.textContent = '—';
  thumbnail.innerHTML = '<span>Thumbnail placeholder</span>';
  progressLabel.textContent = 'Idle';
  progressBar.style.width = '0%';
  statusBadge.textContent = 'Ready';
  infoCard.classList.remove('active');
});

downloadBtn.addEventListener('click', async () => {
  const url = youtubeUrlInput.value.trim();
  if (!url) return;

  try {
    statusBadge.textContent = 'Fetching metadata';
    const metadataResult = await fetchMetadata(url);
    const metadata = metadataResult.data || {};
    videoTitle.textContent = metadata.title || 'Ready for metadata';
    channelName.textContent = metadata.channelName || '—';
    durationValue.textContent = metadata.duration || '—';
    publishedValue.textContent = metadata.published || '—';
    sizeValue.textContent = metadata.estimatedSize || '—';
    if (metadata.thumbnail) {
      thumbnail.innerHTML = `<img src="${metadata.thumbnail}" alt="Thumbnail preview" style="width:100%;height:100%;object-fit:cover;border-radius:1rem;">`;
    }
    if (metadata.qualities) populateSelect(qualitySelect, metadata.qualities);
    if (metadata.formats) populateSelect(formatSelect, metadata.formats);
    qualityList.textContent = (metadata.qualities || []).join(' • ');
    formatList.textContent = (metadata.formats || []).join(' • ');
    infoCard.classList.add('active');

    statusBadge.textContent = 'Starting download';
    const downloadResult = await startDownload({
      url,
      format: formatSelect.value,
      quality: qualitySelect.value,
      audioQuality: '128kbps',
    });
    progressLabel.textContent = `${downloadResult.data?.progress || 0}%`;
    progressBar.style.width = `${downloadResult.data?.progress || 0}%`;
    statusBadge.textContent = downloadResult.data?.status || 'Completed';
    await fetch(config.historyApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: metadata.title || 'Downloaded item',
        format: formatSelect.value,
        quality: qualitySelect.value,
        status: downloadResult.data?.status || 'completed',
      }),
    });
    await loadHistory();
  } catch (error) {
    statusBadge.textContent = 'Error';
    progressLabel.textContent = 'Failed';
    console.error(error);
  }
});

settingsForm.addEventListener('submit', saveSettings);
contactForm.addEventListener('submit', submitContact);
loadHistory();
