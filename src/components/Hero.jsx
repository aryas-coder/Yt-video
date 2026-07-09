import React from 'react'

export default function Hero(){
  return (
    <section className="card header-backdrop" style={{display:'grid',gap:12}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h1 className="h1">Fast & reliable YouTube download UI</h1>
          <p className="p-muted">A premium, production-ready frontend for downloading videos. This UI is ready to be connected to a secure backend for metadata and file handling.</p>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <div style={{textAlign:'right'}} className="small p-muted">Built for performance</div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr',gap:12}}>
        <div className="card" style={{display:'flex',flexDirection:'column',gap:8}}>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <div style={{flex:1}}>
              <div className="p-muted small">Enter a YouTube video URL</div>
              <input aria-label="YouTube url" className="input" placeholder="https://youtube.com/watch?v=..." />
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-ghost">Paste</button>
              <button className="btn btn-ghost">Clear</button>
              <button className="btn btn-primary">Download</button>
            </div>
          </div>

          <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
            <select aria-label="quality" className="input" style={{width:160}}>
              <option>Best</option>
              <option>1080p</option>
              <option>720p</option>
              <option>480p</option>
            </select>

            <select aria-label="format" className="input" style={{width:160}}>
              <option>MP4</option>
              <option>WebM</option>
              <option>MP3</option>
            </select>

            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <label className="p-muted">Video</label>
              <input aria-label="video option" type="radio" name="type" defaultChecked />
              <label className="p-muted">Audio</label>
              <input aria-label="audio option" type="radio" name="type" />
            </div>

            <div style={{marginLeft:'auto',display:'flex',gap:8,alignItems:'center'}}>
              <div className="thumbnail-placeholder" aria-hidden>Thumbnail</div>
              <div className="card" style={{padding:10}}>
                <div className="p-muted small">Title</div>
                <div className="h2">No metadata — connect backend to fetch</div>
                <div className="p-muted small">Channel • Duration • Views • Published</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
