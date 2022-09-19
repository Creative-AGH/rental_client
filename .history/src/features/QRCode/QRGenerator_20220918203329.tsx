import React from 'react';
import QRCode from 'qrcode.react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import PropTypes from 'prop-types';
import { useEffect, useDeferredValue } from 'react';
import clsx from 'clsx';
import css from './QRGenerator.module.scss';
import loader from '../../assets/images/loaders/cube.gif';
import { QRGeneratorT } from '../../types/QRT';

const pad = '000000000000000';

const QRGenerator = ({ size, percentage }: QRGeneratorT) => {
  const qrRef = React.useRef<HTMLDivElement>(null);
  const qrRef2 = React.useRef<HTMLDivElement>(null);
  const [images, setImages] = React.useState([
    {
      url: '',
      name: '',
      id: '',
      image: '',
    },
  ]);
  const [count, setCount] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();

  const deferred = useDeferredValue(count);

  const zip = new JSZip();
  zip.folder('PNG');
  zip.folder('SVG');

  useEffect(() => {
    setCount(0);
    startTransition(() => {
      const links = [];
      for (let i = 0; i < 1000; i++) {
        links.push({
          url: `https://picsum.photos/id/${i}/200/300`,
          name: `Przedmiot${i}`,
          id: `${pad.substring(0, pad.length - i.toString().length) + i.toString()}`,
          image: '',
        });
      }
      setImages(links);
    });
  }, []);

  useEffect(() => {
    startTransition(() => {
      images.forEach((link: { url: string; name: string; id: string; image: string }) => {
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.font = `50px "Helvetica"`;

        const {
          actualBoundingBoxLeft,
          actualBoundingBoxRight,
          actualBoundingBoxAscent,
          actualBoundingBoxDescent,
          width,
        } = ctx.measureText(link.id);

        canvas.height = actualBoundingBoxAscent + actualBoundingBoxDescent + 25;

        canvas.width = Math.max(width, Math.abs(actualBoundingBoxLeft) + actualBoundingBoxRight);

        ctx.font = `50px Helvetica`;
        ctx.textBaseline = 'top';
        ctx.fillText(link.id, 0, 0);
        link.image = canvas.toDataURL();
      });
    });
    setCount((prev) => prev + 1);
  }, [images]);

  const generateQRcode = () => {
    startTransition(() => {
      if (qrRef.current?.children && qrRef2.current?.children) {
        const qrs = Array.from(qrRef.current.children);
        const qrs2 = Array.from(qrRef2.current.children);
        qrs.forEach((canvas: any) => {
          if (canvas.tagName === 'CANVAS') {
            const img = canvas.toDataURL('image/png').replace(/^data:image\/[a-z]+;base64,/, '');
            const name = canvas.id;
            zip?.folder('PNG')?.file(name + '.png', img, { base64: true });
          }
        });
        qrs2.forEach((svg: any) => {
          const svgString = new XMLSerializer().serializeToString(svg);
          const svg64 = btoa(svgString);
          const name = svg.id;
          zip?.folder('SVG')?.file(name + '.svg', svg64, { base64: true });
        });
        zip.generateAsync({ type: 'blob' }).then((content) => {
          FileSaver.saveAs(content, 'qrcodes.zip');
        });
      }
    });
  };

  return (
    <div className="qr-container">
      <ul className={css.statusList}>
        <li
          className={clsx(css.status, {
            [css.pending]: isPending && !deferred,
            [css.done]: deferred > 0,
          })}>
          <img src={loader} alt="loader" style={{ opacity: deferred === 0 ? 1 : 0 }} />
          <span>Ładowanie kodów qr</span>
        </li>
        <li
          className={clsx(css.status, {
            [css.pending]: isPending && deferred === 1,
            [css.done]: deferred > 1,
          })}>
          <img src={loader} alt="loader" style={{ opacity: deferred === 1 ? 1 : 0 }} />
          <span>Dodawanie numeru ID</span>
        </li>
        {deferred > 1 && (
          <li
            className={clsx(css.status, {
              [css.pending]: isPending && deferred === 2,
              [css.done]: deferred > 2,
            })}>
            <img src={loader} alt="loader" style={{ opacity: deferred === 2 && isPending ? 1 : 0 }} />
            <span>Pakowanie kodów qr</span>
          </li>
        )}
      </ul>

      {deferred > 1 && (
        <button name="btn" id="btn" onClick={generateQRcode}>
          Download ZIP
        </button>
      )}
      <div className="qr-container__qr-code" style={{ display: 'none' }} ref={qrRef}>
        {images.map(({ url, name, image }, index) => (
          <QRCode
            key={index}
            value={url}
            size={size / 2}
            id={name}
            level="H"
            renderAs="canvas"
            imageSettings={{
              src: image,
              width: (size / 2) * percentage,
              height: (size / 2) * 0.1,
              excavate: true,
            }}
          />
        ))}
      </div>
      <div className="qr-container__qr-code" style={{ display: 'none' }} ref={qrRef2}>
        {images.map(({ url, name, image }, index) => (
          <QRCode
            key={index}
            value={url}
            size={size}
            id={name}
            level="H"
            renderAs="svg"
            imageSettings={{
              src: image,
              width: percentage * size,
              height: (size / 2) * 0.1,
              excavate: true,
            }}
          />
        ))}
      </div>
    </div>
  );
};

QRGenerator.propTypes = {
  size: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default QRGenerator;
