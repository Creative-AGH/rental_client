import { useState } from 'react';
import styles from './Modal.module.scss';

import { createModal } from 'react-modal-promise';

const MyBootrapModal = ({ onResolve, onReject }: any) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const submit = () => onResolve({ name, description });
  const reject = () => onReject('');

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>Wpisz nazwę</h3>
        </div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <div className={styles.header}>
          <h3>Wpisz opis</h3>
        </div>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button color="primary" onClick={submit}>
          Submit
        </button>{' '}
        <button color="secondary" onClick={reject}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export const newPlaceModal = createModal(MyBootrapModal);
