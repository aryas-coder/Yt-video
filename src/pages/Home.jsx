import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import DownloadPanel from '../components/DownloadPanel'

export default function Home(){
  return (
    <section className="container">
      <div style={{display:'grid',gap:20}}>
        <Hero />
        <DownloadPanel />
      </div>
    </section>
  )
}
