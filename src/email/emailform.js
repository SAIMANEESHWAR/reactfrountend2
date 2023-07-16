import React, { useState } from 'react';
import axios from 'axios';


const EmailForm = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit =async  (e) => {
    e.preventDefault();

    // Send email data to the server
    await axios.get("http://localhost:8000/send-email", {
        params: {
          recipient,
          subject,
          message,}
        })
      .then((response) => {console.log(response);})
      .then((data) => {
        console.log(data); // Email sent successfully
        // Reset form fields
        setRecipient('');
        setSubject('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="email"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
