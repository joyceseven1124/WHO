import { useRef, useState } from 'react';

interface ImageData {
  name: string;
  url: string;
}
interface ImageHook {
  image: ImageData | null;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => {
    result: boolean;
    error?: string;
  };
  handleRemove: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

function useImage(): ImageHook {
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<ImageData | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageURL = URL.createObjectURL(file);
      const fileSize = file.size / 1024;
      if (fileSize < 1000) {
        setImage({ name: file.name, url: imageURL });
        return { result: true };
      } else {
        return { result: false, error: '照片不能大於1MB' };
      }
    }

    return { result: false, error: '请選擇文件' };
  };

  const handleRemove = () => {
    if (image) {
      URL.revokeObjectURL(image.url);
      setImage(null);
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return {
    image,
    handleUpload,
    handleRemove,
    inputRef,
  };
}

export default useImage;
