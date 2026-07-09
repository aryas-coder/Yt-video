import React from 'react'

export default function Downloads(){
  return (
    <section className="container">
      <h2 className="h2">Downloads</h2>
      <p className="p-muted">A dedicated area for active downloads and their states. This page contains the UI templates for progress, success, failed, cancelled and retry states — all visual only.</p>

      <div style={{marginTop:16,display:'grid',gap:16}}>
        <div className="card" aria-live="polite">
          <h3 className="h2">Active Downloads</h3>
          <p className="p-muted">No active downloads. Start a download from the Home page.</p>
        </div>

        <div className="card">
          <h3 className="h2">Progress card examples</h3>
          <p className="p-muted">These are interface templates. They intentionally do not contain any real download data.</p>

          <div style={{display:'grid',gap:12,marginTop:12}}>
            <div className="card header-backdrop" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
              <div style={{display:'flex',gap:12,alignItems:'center'}}>
                <div className="thumbnail-placeholder" aria-hidden>Preview</div>
                <div>
                  <div className="h2">Title — Metadata unavailable</div>
                  <div className="p-muted small">Channel — Unknown • Duration — —</div>
                </div>
              </div>
              <div style={{width:220}}>
                <div className="progress-bar" aria-hidden>
                  <i style={{width:'44%'}}></i>
                </div>
                <div className="row" style={{justifyContent:'space-between',marginTop:8}}>
                  <div className="small p-muted">Downloading — 44%</div>
                  <div className="small p-muted">ETA 00:23</div>
                </div>
              </div>
            </div>

            <div className="card header-backdrop" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
              <div style={{display:'flex',gap:12,alignItems:'center'}}>
                <div className="thumbnail-placeholder" aria-hidden>Preview</div>
                <div>
                  <div className="h2">File successfully ready</div>
                  <div className="p-muted small">Format: MP4 • Quality: 1080p</div>
                </div>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button className="btn btn-primary">Open</button>
                <button className="btn btn-ghost">Remove</button>
              </div>
            </div>

            <div className="card header-backdrop" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
              <div style={{display:'flex',gap:12,alignItems:'center'}}>
                <div className="thumbnail-placeholder" aria-hidden>Preview</div>
                <div>
                  <div className="h2">Failed to download</div>
                  <div className="p-muted small">Network error • Please retry</div>
                </div>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button className="btn btn-primary">Retry</button>
                <button className="btn btn-ghost">Delete</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
