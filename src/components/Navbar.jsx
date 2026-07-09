import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'

function MobileMenu({open,onClose}){
  return (
    <div role="dialog" aria-hidden={!open} style={{position:'fixed',inset:0,background:'linear-gradient(180deg, rgba(2,6,23,0.6), rgba(2,6,23,0.85))',display: open ? 'flex':'none',alignItems:'flex-start',padding:20,zIndex:60}}>
      <div style={{width:'100%',maxWidth:420}}>
        <nav style={{display:'flex',flexDirection:'column',gap:12}}>
          <NavLink to="/" onClick={onClose} className={({isActive})=>isActive? 'btn btn-primary':'btn btn-ghost'}>Home</NavLink>
          <NavLink to="/downloads" onClick={onClose} className={({isActive})=>isActive? 'btn btn-primary':'btn btn-ghost'}>Downloads</NavLink>
          <NavLink to="/history" onClick={onClose} className={({isActive})=>isActive? 'btn btn-primary':'btn btn-ghost'}>History</NavLink>
          <NavLink to="/settings" onClick={onClose} className={({isActive})=>isActive? 'btn btn-primary':'btn btn-ghost'}>Settings</NavLink>
          <NavLink to="/about" onClick={onClose} className={({isActive})=>isActive? 'btn btn-primary':'btn btn-ghost'}>About</NavLink>
          <NavLink to="/contact" onClick={onClose} className={({isActive})=>isActive? 'btn btn-primary':'btn btn-ghost'}>Contact</NavLink>
          <div style={{marginTop:12}}>
            <button className="btn btn-ghost" onClick={onClose}>Close</button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default function Navbar(){
  const [open,setOpen] = useState(false)
  return (
    <header className="navbar main" style={{maxWidth:1200,margin:'0 auto'}}>
      <div className="brand">
        <div className="logo" aria-hidden>YV</div>
        <div style={{display:'flex',flexDirection:'column',lineHeight:1}}>
          <div style={{fontWeight:700}}>Yt Video</div>
          <div className="p-muted small">Downloader (UI)</div>
        </div>
      </div>

      <nav className="navlinks" aria-label="Main navigation">
        <div style={{display:'none'}} className="desktop-links">
          <NavLink to="/" end className={({isActive})=>isActive? 'btn btn-primary':'btn btn-ghost'}>Home</NavLink>
          <NavLink to="/downloads" className={({isActive})=>isActive? 'btn btn-primary':'btn btn-ghost'}>Downloads</NavLink>
          <NavLink to="/history" className={({isActive})=>isActive? 'btn btn-primary':'btn btn-ghost'}>History</NavLink>
          <NavLink to="/settings" className={({isActive})=>isActive? 'btn btn-primary':'btn btn-ghost'}>Settings</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive? 'btn btn-primary':'btn btn-ghost'}>About</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive? 'btn btn-primary':'btn btn-ghost'}>Contact</NavLink>
        </div>

        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button aria-label="Open mobile menu" onClick={()=>setOpen(true)} className="btn btn-ghost">Menu</button>
        </div>
      </nav>

      <MobileMenu open={open} onClose={()=>setOpen(false)} />
    </header>
  )
}
