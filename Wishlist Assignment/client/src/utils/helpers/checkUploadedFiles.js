import { toast } from "react-toastify";

export function isImageValid(file,size){
    //size should be in KB
    const allowedTypes = ["image/png", "image/jpeg"];
    //   const maxSizeInKB = 100;
      // Check file type
      if(!file){
        toast.error("please upload the required file");
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        toast.warning("Please upload an image in PNG or JPEG format.");
        return false;
      }
    
      // Check file size (convert size to KB)
      if(size){
        const fileSizeInKB = file.size / 1024;
        if (fileSizeInKB > size) {
          toast.warning(`File size should be under ${size}.`);
          return false;
      }
      }
      return true;
}

export function isFileValid(file,size){
    //size should be in KB
    if(!file){
      toast.error("please upload the required file");
      return false;
    }
    const allowedTypes = ["image/png", "image/jpeg","application/pdf"];
    //   const maxSizeInKB = 100;
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        toast.warning("Please upload a valid image or pdf file.");
        return false;
      }
    
      // Check file size (convert size to KB)
      if(size){
        const fileSizeInKB = file.size / 1024;
        if (fileSizeInKB > size) {
          toast.warning(`File size should be under ${size}KB.`);
          return false;
      }
      }
      return true;
}