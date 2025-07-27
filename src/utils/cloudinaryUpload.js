import axios from 'axios';

const CLOUD_NAME = 'dmliwnwaq';
const API_KEY = '937527456454449';
const API_SECRET = 'UyFYnvjz10ugTB_SboE8FcYD6Hc';
const UPLOAD_PRESET = 'garbage_reports';
const UPLOAD_FOLDER = 'reports';

export const uploadToCloudinary = async (fileUri) => {
    const data = new FormData();

    data.append('file', {
        uri: fileUri,
        type: 'image/jpeg',
        name: 'garbage.jpg',
    });

    data.append('upload_preset', UPLOAD_PRESET);
    data.append('folder', UPLOAD_FOLDER);


    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return res.data.secure_url;

};
