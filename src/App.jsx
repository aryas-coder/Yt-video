import { useState } from 'react'
import './App.css'
import { historyItems, navItems, features, settingsOptions } from './data/siteContent'
import SectionHeading from './components/SectionHeading'

const initialVideo = {
  title: 'Aurora Horizons — A cinematic journey through the city lights',
  channel: 'North Studio',
  duration: '07:42',
  published: '2 days ago',
  views: '1.8M views',
  size: '134.6 MB',
  thumbnail:
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
}

function App() {
  const [theme, setTheme] = useState('dark')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [downloadState, setDownloadState] = useState('downloading')
  const [activeSection, setActiveSection] = useState('home')

  const handleNavClick = (section) => {
    setActiveSection(section)
    setMobileNavOpen(false)
  }

  return (
    <div className={`app-shell theme-${theme}`}>
      <header className="topbar">
        <a className="brand" href="#home" onClick={() => handleNavClick('home')}>
          <span className="brand-mark">▶</span>
          <span>FluxTube</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.label.toLowerCase() ? 'active' : ''}
              onClick={() => handleNavClick(item.label.toLowerCase())}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="icon-button"
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀︎' : '☾'}
        </button>
        <button
          className="hamburger"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {mobileNavOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.label.toLowerCase())}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}

      <main id="home">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Premium video extraction</p>
            <h1>Download your favorite content with clarity and speed.</h1>
            <p className="hero-text">
              Experience a refined, secure way to capture audio and video from the web in the formats you need.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#downloads">Start download</a>
              <a className="secondary-btn" href="#about">Explore platform</a>
            </div>
            <div className="hero-stats">
              <div>
                <strong>4K</strong>
                <span>support</span>
              </div>
              <div>
                <strong>MP3</strong>
                <span>audio</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>ready</span>
              </div>
            </div>
          </div>
          <div className="hero-card">
            <div className="input-row">
              <input aria-label="Video URL" placeholder="Paste a video URL here" />
              <button type="button" className="ghost-btn">Paste</button>
            </div>
            <div className="input-grid">
              <label>
                <span>Quality</span>
                <select defaultValue="1080p">
                  <option>1080p</option>
                  <option>720p</option>
                  <option>480p</option>
                </select>
              </label>
              <label>
                <span>Format</span>
                <select defaultValue="MP4">
                  <option>MP4</option>
                  <option>MKV</option>
                  <option>MP3</option>
                </select>
              </label>
              <label>
                <span>Type</span>
                <select defaultValue="Video">
                  <option>Video</option>
                  <option>Audio</option>
                  <option>Both</option>
                </select>
              </label>
            </div>
            <div className="hero-preview">
              <img src={initialVideo.thumbnail} alt="Video preview thumbnail" />
              <div className="preview-content">
                <div className="preview-tags">
                  <span>HD</span>
                  <span>Creative</span>
                </div>
                <h3>{initialVideo.title}</h3>
                <p>{initialVideo.channel}</p>
              </div>
            </div>
            <div className="hero-actions-row">
              <button type="button" className="ghost-btn">Clear</button>
              <button type="button" className="primary-btn">Download</button>
            </div>
          </div>
        </section>

        <section className="info-grid" id="downloads">
          <div className="card large-card">
            <SectionHeading
              eyebrow="Media details"
              title="Everything you need before export"
              description="A refined summary of file metadata, stream quality, and delivery expectations."
            />
            <div className="meta-list">
              <div><span>Title</span><strong>{initialVideo.title}</strong></div>
              <div><span>Channel</span><strong>{initialVideo.channel}</strong></div>
              <div><span>Duration</span><strong>{initialVideo.duration}</strong></div>
              <div><span>Published</span><strong>{initialVideo.published}</strong></div>
              <div><span>Views</span><strong>{initialVideo.views}</strong></div>
              <div><span>Estimated size</span><strong>{initialVideo.size}</strong></div>
            </div>
          </div>

          <div className="card download-card">
            <div className="download-header">
              <div>
                <p className="eyebrow">Download status</p>
                <h3>Export in progress</h3>
              </div>
              <span className={`status-pill ${downloadState}`}>{downloadState}</span>
            </div>
            <div className="progress-track" aria-label="Download progress">
              <div className="progress-bar" style={{ width: '72%' }} />
            </div>
            <div className="download-details">
              <div>
                <span>Progress</span>
                <strong>72% complete</strong>
              </div>
              <div>
                <span>Speed</span>
                <strong>3.4 MB/s</strong>
              </div>
              <div>
                <span>ETA</span>
                <strong>00:48</strong>
              </div>
            </div>
            <div className="download-actions">
              <button type="button" className="ghost-btn" onClick={() => setDownloadState('canceled')}>Cancel</button>
              <button type="button" className="primary-btn" onClick={() => setDownloadState('success')}>Retry</button>
            </div>
          </div>
        </section>

        <section className="section-block" id="history">
          <SectionHeading
            eyebrow="History"
            title="Your recent downloads"
            description="Keep track of every export, ready to resume or re-download instantly."
          />
          <div className="history-list">
            {historyItems.map((item) => (
              <article className="history-card" key={item.id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.channel}</p>
                </div>
                <div className="history-meta">
                  <span>{item.quality}</span>
                  <span>{item.format}</span>
                  <span>{item.size}</span>
                </div>
                <div className="history-actions">
                  <span className="muted">{item.completedAt}</span>
                  <button type="button" className="ghost-btn">Re-download</button>
                  <button type="button" className="ghost-btn">Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="settings">
          <SectionHeading
            eyebrow="Settings"
            title="Customize your workflow"
            description="Adjust defaults for quality, format, motion, and download preferences."
          />
          <div className="settings-grid">
            <div className="card">
              <h3>Appearance</h3>
              <label className="toggle-row">
                <span>Dark mode</span>
                <input type="checkbox" checked={theme === 'dark'} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
              </label>
              <label>
                <span>Language</span>
                <select defaultValue="English">
                  <option>English</option>
                  <option>Español</option>
                  <option>Deutsch</option>
                </select>
              </label>
            </div>
            <div className="card">
              <h3>Defaults</h3>
              <label>
                <span>Default quality</span>
                <select defaultValue="high">
                  {settingsOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Default format</span>
                <select defaultValue="MP4">
                  <option>MP4</option>
                  <option>MP3</option>
                  <option>MKV</option>
                </select>
              </label>
            </div>
            <div className="card">
              <h3>Preferences</h3>
              <label className="toggle-row">
                <span>Animated transitions</span>
                <input type="checkbox" defaultChecked />
              </label>
              <label className="toggle-row">
                <span>Auto-open downloads</span>
                <input type="checkbox" defaultChecked />
              </label>
            </div>
          </div>
        </section>

        <section className="about-contact-grid" id="about">
          <div className="card">
            <SectionHeading
              eyebrow="About"
              title="Built for creators, researchers, and modern teams"
              description="A professional platform focused on privacy, clarity, and polished delivery."
            />
            <ul className="feature-list">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <p className="about-text">
              FluxTube combines secure media handling, accessible interfaces, and elegant export controls in one premium experience.
            </p>
          </div>
          <div className="card" id="contact">
            <SectionHeading
              eyebrow="Contact"
              title="Reach the team"
              description="Share your workflow or feedback with our product team."
            />
            <form className="contact-form">
              <label>
                <span>Name</span>
                <input type="text" placeholder="Alex Morgan" />
              </label>
              <label>
                <span>Email</span>
                <input type="email" placeholder="alex@studio.com" />
              </label>
              <label>
                <span>Subject</span>
                <input type="text" placeholder="Enterprise access" />
              </label>
              <label>
                <span>Message</span>
                <textarea rows="4" placeholder="How can we support your workflow?" />
              </label>
              <button type="submit" className="primary-btn">Send message</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="brand">
          <span className="brand-mark">▶</span>
          <span>FluxTube</span>
        </div>
        <p>© 2026 FluxTube. Crafted for smooth media workflows.</p>
        <div className="footer-links">
          <a href="#about">Privacy</a>
          <a href="#about">Terms</a>
          <a href="#contact">Contact</a>
          <a href="#home">Social</a>
        </div>
      </footer>
    </div>
  )
}

export default App
