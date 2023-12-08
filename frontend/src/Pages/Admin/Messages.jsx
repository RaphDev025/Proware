import React, { useState, useEffect } from 'react';

const Messages = () => {
  const [to, setTo] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [viewCompose, setViewCompose] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for the POST request
    setLoading(true);
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

        // Fetch the updated notifications to include the newly created one
        fetchNotifications();
      } else {
        // Handle error, e.g., show an error message
        console.error('Failed to send notification:', response.status);
      }
    } catch (error) {
      console.error('Error sending notification:', error.message);
    } finally {
      // Set loading to false when the request is complete
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      // Fetch notifications from the server
      const response = await fetch('https://proware-api.vercel.app/api/notif');
      const json = await response.json();

      if (response.ok) {
        // Update the component state with the fetched notifications
        setNotifications(json);
      } else {
        // Handle error, e.g., show an error message
        console.error('Failed to fetch notifications:', response.status);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  }, []);

  return (
    <main id='new-item' className='container-fluid vh-100 container-fluid d-flex gap-3'>
      <div className='d-flex flex-column w-25 pt-5 p-3 gap-3'>
        <button className='rounded-5 p-2 button-def' type='button' onClick={() => setViewCompose(true)} >Compose</button>
        <button className='rounded-5 p-2 button-def' type='button' onClick={() => setViewCompose(false)} >Sent</button>
      </div>
      {viewCompose ? (
        <section className='w-75 p-3 pt-3 pe-5'>
        <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <label htmlFor="to">To:</label>
            <input type="text" style={{ backgroundColor: 'var(--bright-black)' }} className="p-2 w-25 rounded-2" id="to" placeholder="To:" name="to" required value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="title">Subject</label>
            <input type="text" style={{ backgroundColor: 'var(--bright-black)' }} className="p-2 w-100 rounded-2" id="title" placeholder="Subject" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <textarea id='content' className='p-3 rounded-3' style={{ height: '400px', backgroundColor: '#2E3039', color: 'var(--blue)' }} placeholder='Compose message...' value={content} onChange={(e) => setContent(e.target.value)}  ></textarea>
          <div className='d-flex justify-content-end'>
                <button style={{ width: '100px', backgroundColor: 'var(--dark-blue)' }} className='btn text-light' type="submit">
                {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </form>
      </section>
      ) : (
        <section className='w-75 p-3 pt-3 pe-5'>
      {notifications.map((notification) => (
          <div key={notification._id} className='notification'>
            <h4>{notification.title}</h4>
            <p>{notification.content}</p>
          </div>
        ))}
      </section>
      )}
    </main>
  );
};

export default Messages;
