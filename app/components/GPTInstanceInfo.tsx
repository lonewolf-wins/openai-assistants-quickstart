"use client";

import React, { useEffect, useState } from 'react';
import styles from './GPTInstanceInfo.module.css';

interface GPTInstance {
  id: string;
  name: string;
  status: string;
  link: string;
}

const GPTInstanceInfo = () => {
  const [instances, setInstances] = useState<GPTInstance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstances = async () => {
    try {
      const response = await fetch('/api/assistants');
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data: GPTInstance[] = await response.json();
      setInstances(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstances();
  }, []);

  if (loading) {
    return <div className={styles.loader} aria-live="polite">Loading GPT instances...</div>;
  }

  if (error) {
    return (
      <div className={styles.error} aria-live="assertive">
        <p>{error}</p>
        <button onClick={fetchInstances} className={styles.button}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>GPT Instance Information</h2>
      <div className={styles.infoContainer}>
        {instances.length === 0 ? (
          <p>No GPT instances available at the moment.</p>
        ) : (
          instances.map((instance) => (
            <div key={instance.id} className={styles.instanceItem}>
              <h3 className={styles.instanceTitle}>{instance.name}</h3>
              <p className={styles.status}>Status: {instance.status}</p>
              <a href={instance.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                Learn More
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GPTInstanceInfo;
