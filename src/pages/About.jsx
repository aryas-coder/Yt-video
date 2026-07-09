import React from 'react'

export default function About(){
  return (
    <section className="container">
      <h2 className="h2">About Yt Video Downloader (UI)</h2>
      <p className="p-muted">This project is the frontend UI of a professional video downloader web app. It is intentionally backend-agnostic — the UI is designed to integrate with a secure backend for metadata fetching and file handling.</p>

      <div style={{display:'grid',gap:12,marginTop:12}}>
        <div className="card">
          <h3 className="h2">Features</h3>
          <ul className="p-muted">
            <li>Premium modern UI — mobile-first, responsive and accessible.</li>
            <li>Download workflow components: quality, format, audio/video toggles.</li>
            <li>Download progress templates and states (progress, success, failed, cancelled).</li>
            <li>Persistent appearance & settings stored locally.</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="h2">Technologies used</h3>
          <ul className="p-muted">
            <li>React + React Router</li>
            <li>Vite for fast development and production builds</li>
            <li>Modern CSS with variables for theming and animations</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="h2">Security & Privacy</h3>
          <p className="p-muted">This UI makes no network requests on its own. For a fully functioning downloader, implement a secure server-side component that performs metadata fetching and file retrieval. Client-side downloading of protected content can violate terms — follow platform policies and legal requirements.</p>
        </div>
      </div>
    </section>
  )
}
