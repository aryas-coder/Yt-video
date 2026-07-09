import React, {useState, useEffect} from 'react'

export default function Settings(){
  const [theme,setTheme] = useState(localStorage.getItem('theme') || 'light')
  useEffect(()=>{document.querySelector('.app-root').setAttribute('data-theme', theme); localStorage.setItem('theme', theme)},[theme])

  return (
    <section className="container">
      <h2 className="h2">Settings</h2>
      <p className="p-muted">Configure defaults and appearance. Settings persist locally in your browser.</p>

      <div style={{display:'grid',gap:12,marginTop:12}}>
        <div className="card">
          <h3 className="h2">Appearance</h3>
          <div style={{display:'flex',gap:12,alignItems:'center',marginTop:12}}>
            <label className="p-muted">Theme</label>
            <select value={theme} onChange={e=>setTheme(e.target.value)} className="input" style={{width:160}} aria-label="Theme selector">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div style={{display:'grid',gap:8,marginTop:12}}>
            <label className="p-muted">Animations</label>
            <select className="input" aria-label="Animation settings" style={{width:240}}>
              <option value="full">Full animations</option>
              <option value="reduced">Reduced motion</option>
              <option value="none">No animations</option>
            </select>
          </div>
        </div>

        <div className="card">
          <h3 className="h2">Downloads</h3>
          <div style={{display:'grid',gap:8,marginTop:12}}>
            <label className="p-muted">Default quality</label>
            <select className="input" aria-label="Default quality" style={{width:240}}>
              <option>Highest available</option>
              <option>1080p</option>
              <option>720p</option>
              <option>480p</option>
            </select>

            <label className="p-muted">Default format</label>
            <select className="input" aria-label="Default format" style={{width:240}}>
              <option>MP4</option>
              <option>WebM</option>
              <option>MP3 (audio)</option>
            </select>

            <label className="p-muted">Download location</label>
            <input className="input" aria-label="Download location" placeholder="Browser default (no backend)" />
          </div>
        </div>

      </div>
    </section>
  )
}
