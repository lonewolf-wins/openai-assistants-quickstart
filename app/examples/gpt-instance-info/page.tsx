"use client";

import React, { useEffect, useState } from 'react';
import styles from '../../components/GPTInstanceInfo.module.css';

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

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        // Updated to match the correct API endpoint structure
        const response = await fetch('/api/assistants');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: GPTInstance[] = await response.json();
        setInstances(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInstances();
  }, []);

  if (loading) {
    return (
      <div className={styles.loader}>
        <p>Loading GPT instances...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()} className={styles.button}>
          Retry
        </button>
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
              <p className={styles.status}>{instance.status}</p>
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
