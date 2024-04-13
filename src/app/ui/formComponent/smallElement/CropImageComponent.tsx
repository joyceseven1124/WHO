// import Slider from '@mui/material/Slider';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import Cropper, { Area, Point } from 'react-easy-crop';

// const CROP_AREA_ASPECT = 3 / 2;

// const Output = ({
//   croppedArea,
//   imageURL,
// }: {
//   imageURL: string;
//   croppedArea: { width: number; height: number; x: number; y: number };
// }) => {
//   const scale = 100 / croppedArea.width;
//   const transform = {
//     x: `${-croppedArea.x * scale}%`,
//     y: `${-croppedArea.y * scale}%`,
//     scale,
//     width: 'calc(100% + 0.5px)',
//     height: 'auto',
//   };

//   const imageStyle = {
//     transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
//     width: transform.width,
//     height: transform.height,
//     position: 'absolute' as 'absolute',
//   };

//   return (
//     <div
//       className="output"
//       style={{ paddingBottom: `${100 / CROP_AREA_ASPECT}%` }}
//     >
//       <Image
//         width={500}
//         height={500}
//         alt={'preview'}
//         src={imageURL}
//         style={imageStyle}
//       />
//     </div>
//   );
// };

// const CropImageComponent = ({ imageURL }: { imageURL: string }) => {
//   const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedArea, setCroppedArea] = useState(null);

//   const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
//     console.log(croppedArea, croppedAreaPixels);
//     console.log(imageURL);
//   };

//   return (
//     <div className="App">
//       <div className="crop-container">
//         <Cropper
//           image={imageURL}
//           crop={crop}
//           zoom={zoom}
//           aspect={4 / 3}
//           onCropChange={setCrop}
//           onCropComplete={onCropComplete}
//           onZoomChange={setZoom}
//           onCropAreaChange={() => {
//             setCroppedArea;
//           }}
//         />
//       </div>
//       <div className="controls">
//         <Slider
//           value={zoom}
//           min={1}
//           max={3}
//           step={0.1}
//           aria-labelledby="Zoom"
//           onChange={(e, zoom) => setZoom(Number(zoom))}
//           classes={{ root: 'slider' }}
//         />
//       </div>
//       <button>Save</button>
//       <div>
//         <div>
//           {croppedArea && (
//             <>
//               1234
//               <Output imageURL={imageURL} croppedArea={croppedArea} />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CropImageComponent;

import { editFormChildElement } from '@/src/lib/feature/formDataSlice';
import { useAppDispatch } from '@/src/lib/hooks';
import getCroppedImg, { CroppedImageResult } from '@/src/lib/utils/cropImage';
import { Cancel } from '@mui/icons-material';
import CropIcon from '@mui/icons-material/Crop';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { ChildKeyContext, NodeKeyContext } from '../../../../lib/context';

const CropImageComponent = ({
  imageURL,
  setOpenCrop,
  openCrop,
}: {
  imageURL: string;
  setOpenCrop: Dispatch<SetStateAction<boolean>>;
  openCrop: boolean;
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // const fileData = useAppSelector((state) => state.FormData.formData);
  const nodeKey = useContext(NodeKeyContext);
  const childKey = useContext(ChildKeyContext);
  const dispatch = useAppDispatch();
  const cropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // const { setAlert, setLoading } = useAuth();

  const cropImage = async () => {
    // setLoading(true);
    try {
      if (imageURL && croppedAreaPixels) {
        const result = await getCroppedImg(
          imageURL,
          croppedAreaPixels,
          rotation
        );

        if (typeof result !== null) {
          const { file, url } = result as CroppedImageResult;
          const elements = { imageURL: url };
          dispatch(
            editFormChildElement({
              nodeKey: nodeKey,
              childKey: childKey,
              elements: elements,
            })
          );
          setOpenCrop(false);
        }
      }
    } catch (error) {
      console.log(error);
      // setAlert({
      //   isAlert: true,
      //   severity: 'error',
      //   message: error.message,
      //   timeout: 5000,
      //   location: 'modal',
      // });
    }

    // setLoading(false);
  };
  return (
    <Dialog open={openCrop}>
      <DialogTitle sx={{ textAlign: 'left' }}>Image Cropper</DialogTitle>
      <DialogContent
        dividers
        sx={{
          backgroundColor: '#333',
          position: 'relative',
          margin: 'auto',
          height: 400,
          width: 'auto',
          maxWidth: 600,
          minWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={imageURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        ></Cropper>
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
        <Box sx={{ width: '100%', mb: 1, maxWidth: '600px' }}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => {
                if (typeof zoom === 'number') {
                  setZoom(zoom);
                }
              }}
            ></Slider>
          </Box>
          <Box>
            <Typography>Rotation: {rotation}</Typography>
            <Slider
              valueLabelDisplay="auto"
              // valueLabelFormat={zoomPercent}
              min={0}
              max={360}
              // step={0o1}
              value={rotation}
              onChange={(e, rotation) => {
                if (typeof rotation === 'number') {
                  setRotation(rotation);
                }
              }}
            ></Slider>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => setOpenCrop(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={cropImage}
          >
            Crop
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CropImageComponent;

const zoomPercent = (value: number) => {
  return `${Math.round(value * 100)}`;
};
