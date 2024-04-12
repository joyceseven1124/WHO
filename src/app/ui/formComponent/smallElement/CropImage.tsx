import Slider from '@mui/material/Slider';
import Image from 'next/image';
import React, { useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';

const CROP_AREA_ASPECT = 3 / 2;

const Output = ({
  croppedArea,
  imageURL,
}: {
  imageURL: string;
  croppedArea: { width: number; height: number; x: number; y: number };
}) => {
  const scale = 100 / croppedArea.width;
  const transform = {
    x: `${-croppedArea.x * scale}%`,
    y: `${-croppedArea.y * scale}%`,
    scale,
    width: 'calc(100% + 0.5px)',
    height: 'auto',
  };

  const imageStyle = {
    transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    width: transform.width,
    height: transform.height,
    position: 'absolute' as 'absolute',
  };

  return (
    <div
      className="output"
      style={{ paddingBottom: `${100 / CROP_AREA_ASPECT}%` }}
    >
      <Image
        width={500}
        height={500}
        alt={'preview'}
        src={imageURL}
        style={imageStyle}
      />
    </div>
  );
};

const CropImageComponent = ({ imageURL }: { imageURL: string }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
    console.log(imageURL);
  };

  return (
    <div className="App">
      <div className="crop-container">
        <Cropper
          image={imageURL}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          onCropAreaChange={() => {
            setCroppedArea;
          }}
        />
      </div>
      <div className="controls">
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(Number(zoom))}
          classes={{ root: 'slider' }}
        />
      </div>
      <button>Save</button>
      <div>
        <div>
          {croppedArea && (
            <>
              1234
              <Output imageURL={imageURL} croppedArea={croppedArea} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropImageComponent;
