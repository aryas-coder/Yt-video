import React from 'react'

export default function History(){
  return (
    <section className="container">
      <h2 className="h2">History</h2>
      <p className="p-muted">Your download history is stored locally in your browser. This UI shows a clean empty state until you download items.</p>

      <div style={{display:'grid',gap:12,marginTop:12}}>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <input aria-label="Search history" className="input" placeholder="Search downloads" />
          <select className="input" aria-label="Filter by type" style={{width:160}}>
            <option value="all">All types</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
          <select className="input" aria-label="Sort" style={{width:160}}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="size">File size</option>
          </select>
        </div>

        <div className="card">
          <h3 className="h2">Empty history</h3>
          <p className="p-muted">You have no recorded downloads yet. Downloaded items will appear here with options to re-download or delete. All data is local and can be managed from Settings.</p>
        </div>

      </div>
    </section>
  )
}
