"use client";

import React, { useState } from 'react';
import styles from './gpt-panel.module.css';

export default function GptPanel() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [panel, setPanel] = useState('#AI_ML');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/assistants', {  // Corrected endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: `${panel} ${input}` }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.assistantId || 'No response received.');
    } catch (error) {
      console.error('Fetch error:', error);
      setResponse('Error fetching response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GPT Panel</h1>
      <div className={styles.inputContainer}>
        <select value={panel} onChange={(e) => setPanel(e.target.value)} className={styles.dropdown}>
          <option value="#AI_ML">AI & Machine Learning</option>
          <option value="#SYS_ENG">Systems Engineering</option>
          <option value="#FINANCE">Computational Finance</option>
          <option value="#FORESIGHT">Strategic Foresight</option>
        </select>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your question..."
          className={styles.input}
        />
        <button onClick={handleSubmit} className={styles.button}>Submit</button>
      </div>
      {loading ? <p className={styles.loading}>Loading...</p> : <p className={styles.response}>Response: {response}</p>}
    </div>
  );
}
