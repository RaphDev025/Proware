import React, { useState } from 'react';

const Messages = () => {
  const [to, setTo] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for the POST request
    const data = {
      to,
      title,
      content,
    };

    try {
      // Send a POST request to the notif_db endpoint
      const response = await fetch('https://proware-api.vercel.app/api/notif', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log('Notification sent successfully');
      } else {
        // Handle error, e.g., show an error message
        console.error('Failed to send notification:', response.status);
      }
    } catch (error) {
      console.error('Error sending notification:', error.message);
    }
  };

  return (
    <main id='new-item' className='container-fluid vh-100 container-fluid d-flex gap-3'>
      <div className='d-flex flex-column w-25 pt-5 p-3 gap-3'>
        <button className='rounded-5 p-2 button-def'>Compose</button>
        <button className='rounded-5 p-2 button-def'>Sent</button>
      </div>
      <section className='w-75 p-3 pt-3 pe-5'>
        <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <label htmlFor="to">To:</label>
            <input
              type="text"
              style={{ backgroundColor: 'var(--bright-black)' }}
              className="p-2 w-25 rounded-2"
              id="to"
              placeholder="To:"
              name="to"
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="title">Subject</label>
            <input
              type="text"
              style={{ backgroundColor: 'var(--bright-black)' }}
              className="p-2 w-100 rounded-2"
              id="title"
              placeholder="Subject"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <textarea
            id='content'
            className='p-3 rounded-3'
            style={{ height: '400px', backgroundColor: '#2E3039', color: 'var(--blue)' }}
            placeholder='Compose message...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className='d-flex justify-content-end'>
            <button style={{ width: '100px', backgroundColor: 'var(--dark-blue)' }} className='btn text-light' type="submit">
              Send
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Messages;
