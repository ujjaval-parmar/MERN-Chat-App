const url = `https://api.cloudinary.com/v1_1/dpxxfb4dv/auto/upload`;

export const uploadFile = async(file) =>{

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mern-chat-app');


    const response = await fetch(url, {
        method: 'POST',
        body: formData,
        "Access-Control-Allow-Origin": "*"
       
        
    });

    const responseData = await response.json();

    return responseData;

}