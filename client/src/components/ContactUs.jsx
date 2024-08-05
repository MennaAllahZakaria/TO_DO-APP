import React from 'react'

export default function ContactUs() {
  return (
    <div>
      <div className="container mt-4">
            <h1>Contact Us</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Your Name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Your Email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="3" placeholder="Your Message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
  )
}
