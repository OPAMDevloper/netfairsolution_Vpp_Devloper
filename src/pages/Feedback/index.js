import React, { useState } from 'react';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post('http://localhost:5000/feedback', {
          name,
          email,
          message
        });
        toast.success("Feedback Submitted");
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
      } catch (error) {
        console.error('Error submitting feedback:', error);
        // Add error handling for user (e.g., display error message)
      }
    }
  };

  return (
    <div className="feedback-form-container" style={{
      marginLeft: 300,
      maxWidth: '500px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center'
      }}>Feedback Form</h2>
      {submitted && <div className="success-message" style={{
        backgroundColor: '#dff0d8',
        color: '#3c763d',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>Thank you for your feedback!</div>}
      <form onSubmit={handleSubmit} noValidate style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <div className="form-group">
          <label htmlFor="name" style={{
            display: 'block',
            marginBottom: '5px',
            color: '#555'
          }}>Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          {errors.name && <span className="error" style={{
            color: '#d9534f',
            fontSize: '0.9em',
            marginTop: '5px'
          }}>{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email" style={{
            display: 'block',
            marginBottom: '5px',
            color: '#555'
          }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          {errors.email && <span className="error" style={{
            color: '#d9534f',
            fontSize: '0.9em',
            marginTop: '5px'
          }}>{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="message" style={{
            display: 'block',
            marginBottom: '5px',
            color: '#555'
          }}>Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              minHeight: '100px',
              resize: 'vertical'
            }}
          ></textarea>
          {errors.message && <span className="error" style={{
            color: '#d9534f',
            fontSize: '0.9em',
            marginTop: '5px'
          }}>{errors.message}</span>}
        </div>
        <button type="submit" style={{
          backgroundColor: '#5cb85c',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1em',
          transition: 'background-color 0.3s'
        }}>Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;