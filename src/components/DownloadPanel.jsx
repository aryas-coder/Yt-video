import React from 'react'

export default function DownloadPanel(){
  return (
    <section className="card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h2 className="h2">Download</h2>
          <p className="p-muted">Use the controls above to prepare a download. This panel is the primary workflow area that designers and developers can hook up to a backend.</p>
        </div>
        <div className="p-muted small">Ready</div>
      </div>

      <div style={{display:'grid',gap:12,marginTop:12}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr',gap:12}}>
          <div className="card header-backdrop" style={{display:'flex',gap:12,alignItems:'center'}}>
            <div style={{flex:1}}>
              <label className="p-muted">URL</label>
              <input aria-label="download url" className="input" placeholder="Add a video URL to fetch metadata" />
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <select className="input" aria-label="quality" style={{width:140}}>
                <option>Best</option>
                <option>1080p</option>
                <option>720p</option>
              </select>
              <select className="input" aria-label="format" style={{width:120}}>
                <option>MP4</option>
                <option>MP3</option>
              </select>
              <button className="btn btn-primary">Start</button>
            </div>
          </div>

          <div className="card">
            <h3 className="h2">Download information</h3>
            <div style={{display:'grid',gap:6,marginTop:8}}>
              <div className="p-muted small">Title</div>
              <div className="h2">—</div>
              <div className="p-muted small">Channel</div>
              <div className="p-muted">—</div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:6}}>
                <div className="p-muted small">Duration — —</div>
                <div className="p-muted small">Published — —</div>
                <div className="p-muted small">Views — —</div>
                <div className="p-muted small">File size — —</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
