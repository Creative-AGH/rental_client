import React, { useState, useTransition } from 'react';

import QRGenerator from './QRGenerator';

import css from './QRCode.module.scss';

const QRCode = () => {
  const [size, setSize] = useState(100);
  const [percentege, setPercentege] = useState(0.8);
  const [generate, setGenerate] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <div className={css.container}>
      <label htmlFor="size"> Size: </label>
      <input
        type="number"
        value={size}
        onChange={(e) => {
          setSize(parseInt(e.target.value));
          setGenerate(false);
        }}
      />
      <label htmlFor="percentege"> Percentege: </label>
      <input
        type="number"
        value={percentege}
        onChange={(e) => {
          setPercentege(parseInt(e.target.value));
          setGenerate(false);
        }}
      />
      <button onClick={() => startTransition(() => setGenerate(true))}>Generate</button>
      {isPending && <div>Loading...</div>}
      {generate && <QRGenerator size={size} percentage={percentege} />}
    </div>
  );
};

export default QRCode;
