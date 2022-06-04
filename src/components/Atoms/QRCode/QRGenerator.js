import * as React from 'react';
import QRCode from 'qrcode.react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import PropTypes from 'prop-types';

const QRGenerator = ({ size, percentege }) => {
  const qrRef = React.useRef();
  const qrRef2 = React.useRef();
  const links = [];
  const pad = '000000000000000';

  for (let i = 0; i < 1000; i++) {
    links.push({
      url: `https://picsum.photos/id/${i}/200/300`,
      name: `Przedmiot${i}`,
      id: `${pad.substring(0, pad.length - i.toString().length) + i.toString()}`,
    });
  }
  links.forEach((link) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = `50px "Helvetica"`;

    const { actualBoundingBoxLeft, actualBoundingBoxRight, actualBoundingBoxAscent, actualBoundingBoxDescent, width } =
      ctx.measureText(link.id);

    canvas.height = actualBoundingBoxAscent + actualBoundingBoxDescent + 25;

    canvas.width = Math.max(width, Math.abs(actualBoundingBoxLeft) + actualBoundingBoxRight);

    ctx.font = `50px Helvetica`;
    ctx.textBaseline = 'top';
    ctx.fillText(link.id, 0, 0);
    link.image = canvas.toDataURL();
  });

  const zip = new JSZip();
  zip.folder('PNG');
  zip.folder('SVG');

  const generateQRcode = () => {
    const qrs = [...qrRef.current.children];
    const qrs2 = [...qrRef2.current.children];
    qrs.forEach(async (canvas) => {
      if (canvas.tagName === 'CANVAS') {
        const img = canvas.toDataURL('image/png').replace(/^data:image\/[a-z]+;base64,/, '');
        const name = canvas.id;
        await zip.folder('PNG').file(name + '.png', img, { base64: true });
      }
    });
    qrs2.forEach(async (svg) => {
      const svgString = new XMLSerializer().serializeToString(svg);
      const svg64 = btoa(svgString);
      const name = svg.id;
      await zip.folder('SVG').file(name + '.svg', svg64, { base64: true });
    });
    zip.generateAsync({ type: 'blob' }).then(async (content) => {
      await FileSaver.saveAs(content, 'qrcodes.zip');
    });
  };

  return (
    <div className="qr-container">
      <label htmlFor="btn">It will take around 0,5 minutes to generate zip&nbsp;&nbsp;&nbsp;</label>
      <button name="btn" id="btn" onClick={generateQRcode}>
        Download ZIP
      </button>
      <div className="qr-container__qr-code" style={{ display: 'none' }} ref={qrRef}>
        {links.map(({ url, name, image }, index) => (
          <QRCode
            key={index}
            value={url}
            size={size / 2}
            id={name}
            level="H"
            renderAs="canvas"
            imageSettings={{
              src: image,
              width: (size / 2) * percentege,
              excavate: true,
            }}
          />
        ))}
      </div>
      <div className="qr-container__qr-code" style={{ display: 'none' }} ref={qrRef2}>
        {links.map(({ url, name, image }, index) => (
          <QRCode
            key={index}
            value={url}
            size={size}
            id={name}
            level="H"
            renderAs="svg"
            imageSettings={{
              src: image,
              width: percentege * size,
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
  percentege: PropTypes.number.isRequired,
};

export default QRGenerator;
