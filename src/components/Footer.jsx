import React from 'react'

export default function Footer(){
  return (
    <footer style={{maxWidth:1200,margin:'24px auto'}}>
      <div className="footer card">
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <div className="logo">YV</div>
          <div>
            <div style={{fontWeight:700}}>Yt Video</div>
            <div className="p-muted small">Downloader UI</div>
          </div>
        </div>

        <div className="p-muted small">© {new Date().getFullYear()} Yt Video — All rights reserved • <a style={{color:'inherit',textDecoration:'underline'}} href="#">Privacy</a> • <a style={{color:'inherit',textDecoration:'underline'}} href="#">Terms</a></div>
      </div>
    </footer>
  )
}
