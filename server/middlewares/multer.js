import multer from 'multer';

const storage = multer.memoryStorage();
// console.log("multer is working")
export const singleUpload = multer({ storage: storage }).single('file');