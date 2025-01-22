import React, { useEffect, useState } from 'react';
import styles from './GPTInstanceInfo.module.css';

interface GPTInstance {
  id: string;
  name: string;
  status: string;
  link: string;
}

const GPTInstanceInfo: React.FC = () => {
  const [instances, setInstances] = useState<GPTInstance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const response = await fetch('/api/gpt-instances');
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

  if (loading)
    return (
      <div className={styles.loader}>
        <p>Loading GPT instances...</p>
      </div>
    );

  if (error)
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );

  return (
    <div className={styles.container}>
      <h2>GPT Instance Information</h2>
      {instances.length === 0 ? (
        <p>No GPT instances available at the moment.</p>
      ) : (
        <ul>
          {instances.map((instance) => (
            <li key={instance.id} className={styles.instanceItem}>
              <h3>{instance.name}</h3>
              <p>Status: {instance.status}</p>
              <a href={instance.link} target="_blank" rel="noopener noreferrer">
                More Information
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GPTInstanceInfo;
