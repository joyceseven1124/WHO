'use client';
import { useAppDispatch } from '@/src/lib/RThooks';
import { cropImageAction } from '@/src/lib/actions/cropImageAction';
import { editFormChildElement } from '@/src/lib/feature/formDataSlice';
import useCropImageState from '@/src/lib/hooks/useCropImageState';
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
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Cropper, { Area, Point } from 'react-easy-crop';
import {
  ChildKeyContext,
  NodeKeyContext,
} from '../../../../../../lib/provider/context';

const CropImageComponent = ({
  imageURL,
  imageInformation,
  setOpenCrop,
  openCrop,
}: {
  imageURL: string;
  imageInformation: string;
  setOpenCrop: Dispatch<SetStateAction<boolean>>;
  openCrop: boolean;
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [cropResult, setCropResult] = useCropImageState(null);
  const nodeKey = useContext(NodeKeyContext);
  const childKey = useContext(ChildKeyContext);
  const dispatch = useAppDispatch();
  const cropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const initialState = {
    message: '',
    errors: {},
    success: false,
    resultData: '',
  };
  const [stateMsg, actionDispatch] = useFormState(
    cropImageAction,
    initialState
  );
  const cropStatus = useFormStatus();

  useEffect(() => {
    if (stateMsg && stateMsg.success && stateMsg.resultData) {
      const elements = { imageURL: stateMsg.resultData };
      dispatch(
        editFormChildElement({
          nodeKey: nodeKey,
          childKey: childKey,
          elements: elements,
        })
      );
      setOpenCrop(false);
    }
  }, [stateMsg, childKey, nodeKey, dispatch, setOpenCrop]);

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
              min={0}
              max={360}
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
            type="button"
          >
            Cancel
          </Button>
          <form action={actionDispatch} id={`${nodeKey}-${childKey}-crop`}>
            <input type="hidden" value={imageURL} name="imageURL" />
            <input
              type="hidden"
              value={imageInformation}
              name="imageInformation"
            />
            <input
              type="hidden"
              value={typeof cropResult === 'string' ? cropResult : ''}
              name="cropResult"
            />
            <Button
              variant="outlined"
              startIcon={<CropIcon />}
              type="submit"
              form={`${nodeKey}-${childKey}-crop`}
              onClick={async () => {
                setCropResult(
                  imageURL,
                  croppedAreaPixels,
                  rotation,
                  imageInformation
                );
              }}
              disabled={cropStatus.pending}
            >
              {cropResult ? (cropStatus.pending ? 'waiting' : 'Save') : 'Crop'}
            </Button>
          </form>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CropImageComponent;

const zoomPercent = (value: number) => {
  return `${Math.round(value * 100)}`;
};
