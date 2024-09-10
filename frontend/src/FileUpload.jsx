import { useState, useRef } from 'react';
import axios from 'axios';

function FileUpload() {
  const fileInput = useRef();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');
  const [resultText, setResultText] = useState('');
  const saveFile = () => {
    setFile(fileInput.current.files[0]);
    setFileName(fileInput.current.files[0].name);
  };
  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    try {
      const res = await axios.post('http://localhost:8000/upload', formData);
      setResultText(res.data.message);
      fileInput.current.value = '';
      setTimeout(() => {
        setResultText('');
      }, 5000);
    } catch (error) {
      setResultText(error.response.data.message);
    }
  };
  return (
    <div className="mt-5">
      <input type="file" ref={fileInput} onChange={saveFile} />
      <button onClick={uploadFile}>Upload</button>
      {resultText ? <p>{resultText}</p> : null}
    </div>
  );
}
export default FileUpload;
