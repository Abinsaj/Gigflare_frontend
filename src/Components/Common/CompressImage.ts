import imageCompression from "browser-image-compression";

export const compressImage = async (file: any) => {
    try {
      const options = {
        maxSizeMB: 1,          
        maxWidthOrHeight: 1920, 
        useWebWorker: true,   
      };
      const compressedFile = await imageCompression(file, options);
      console.log('Original size:', file.size / 1024 / 1024, 'MB');
      console.log('Compressed size:', compressedFile.size / 1024 / 1024, 'MB');
      return compressedFile;
    } catch (error) {
      console.error('Error while compressing image:', error);
      throw error;
    }
  };