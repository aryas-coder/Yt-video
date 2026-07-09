import React, {useState} from 'react'

export default function Contact(){
  const [sent,setSent] = useState(false)
  return (
    <section className="container">
      <h2 className="h2">Contact</h2>
      <p className="p-muted">Contact us for partnerships, support, or to learn about integrating the frontend with your backend service.</p>

      <div className="card" style={{marginTop:12}}>
        {!sent ? (
          <form onSubmit={e=>{e.preventDefault(); setSent(true)}} aria-label="Contact form">
            <div style={{display:'grid',gap:8}}>
              <label className="p-muted">Full name</label>
              <input required name="name" className="input" aria-label="Name" />
              <label className="p-muted">Email</label>
              <input required name="email" type="email" className="input" aria-label="Email" />
              <label className="p-muted">Subject</label>
              <input name="subject" className="input" aria-label="Subject" />
              <label className="p-muted">Message</label>
              <textarea required name="message" className="input" rows={6} aria-label="Message" />

              <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
                <button type="button" className="btn btn-ghost" onClick={()=>{document.querySelector('form').reset()}}>Clear</button>
                <button className="btn btn-primary" type="submit">Send message</button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <h3 className="h2">Thanks — message queued</h3>
            <p className="p-muted">This is a UI-only form. To send messages, connect a backend or service integration. Your inputs are validated in the browser.</p>
            <button className="btn btn-primary" onClick={()=>setSent(false)}>Send another</button>
          </div>
        )}
      </div>
    </section>
  )
}
