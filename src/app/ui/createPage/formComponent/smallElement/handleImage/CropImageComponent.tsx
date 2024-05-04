import { useAppDispatch } from '@/src/lib/RThooks';
import { editFormChildElement } from '@/src/lib/feature/formDataSlice';
import { deleteImage, saveImage } from '@/src/lib/handleData';
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
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { ChildKeyContext, NodeKeyContext } from '../../../../../../lib/context';

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

          const fileFormat = new File([file], imageInformation, {
            type: file.type, // 可以复用原 Blob 的类型
            lastModified: new Date().getTime(), // 可以指定文件的最后修改时间
          });

          // 先儲存後刪除圖片
          const imageUploadValue = await saveImage(
            fileFormat,
            imageInformation
          );

          if (imageUploadValue.status) {
            deleteImage(imageURL);
            const elements = { imageURL: imageUploadValue.url };

            dispatch(
              editFormChildElement({
                nodeKey: nodeKey,
                childKey: childKey,
                elements: elements,
              })
            );

            setOpenCrop(false);
          }
          // const elements = { imageURL: url };
        }
      }
    } catch (error) {
      throw error;
      // console.log(error);
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
            variant="outlined"
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
