import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/images/yellowed.png';
import bg from 'assets/images/image_61.png';

const AdminAuth = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
  });
  const [err1, setErr1] = useState(false);
  const [err2, setErr2] = useState(false);
  const [userDbData, setUserDbData] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Fetch user data from the user_db database
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://modiform-api.vercel.app/api/users'); // Replace with your API endpoint
        const data = await response.json();
        setUserDbData(data); // Assuming data is an array of user objects
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (formData.user_id !== '' && formData.password !== '') {
      document.getElementById('login-button').removeAttribute('disabled');
      const userExists = userDbData.some(
        (user) => user.user_id === formData.user_id && user.password === formData.password
      );
      if (!userExists) {
        document.getElementById('login-button').setAttribute('disabled', 'true');
        setErr1(!userDbData.some((user) => user.user_id === formData.user_id));
        setErr2(!userDbData.some((user) => user.password === formData.password));
      } else {
        setErr1(false);
        setErr2(false);
      }
    } else {
      document.getElementById('login-button').removeAttribute('disabled');
    }
  }, [formData, userDbData]);

  const handleSubmit = () => {
    const matchingUser = userDbData.find(
      (user) => user.user_id === formData.user_id && user.password === formData.password && user.user_type === 'admin'
    );

    if (matchingUser) {
      alert('Login successful');
      navigate('/admin/dashboard');
    } else {
      alert('Login failed');
    }
  };

  return (
    <main className='h-100 d-flex justify-content-center align-items-center' style={{backgroundColor: 'var(--bright-black)'}}>
      <section className='rounded-3 d-flex'>
        <div className='rounded-2 d-flex justify-content-center align-items-center p-5 backImage' style={{backgroundImage: `url(${bg})`}}>
            <img src={logo} alt='...' width={'150px'} />
        </div>
        <form className='d-flex align-items-start justify-content-center flex-column p-5 gap-3 rounded-3' style={{backgroundColor: 'var(--light-black)'}}>
            <h3 className='fs-2 header'>Login</h3>
            <div className='d-flex flex-column gap-1'>
                <div className='d-flex flex-column '>
                  <label htmlFor='user_id'>User ID</label>
                  <input type='text' className={`p-2 rounded-2 ${err1 ? 'border-danger' : ''}`} value={formData.user_id} onChange={handleChange} id='user_id' placeholder='User ID' name='user_id'  required />  
                </div>
                <div className='d-flex flex-column'>
                  <label htmlFor='password' >Password</label>
                  <input type='password' className={`p-2 rounded-2 ${err2 ? 'border-danger' : ''}`} id='password' value={formData.password} onChange={handleChange} placeholder='Password' name='password' required />  
                  {err2 ? <span className='error-msg text-danger'>Wrong Password</span> : ''}   
                  {err1 ? <span className='error-msg text-danger'>Wrong User ID</span> : ''}                  
                </div>
            </div>
            <div className='mt-5 w-100'>
              <button id='login-button' className='w-100 rounded-2 py-2 text-uppercase text-dark' onClick={handleSubmit}>LogIn</button>
            </div>
        </form>
      </section>
    </main>
  )
}

export default AdminAuth