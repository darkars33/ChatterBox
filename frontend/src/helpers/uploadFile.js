const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/auto/upload`;


const uploadFile = async (file) =>{
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset','chatter-box');
          
          const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
          })

          const responseData= await response.json();

          return responseData.secure_url;
}

export default uploadFile;