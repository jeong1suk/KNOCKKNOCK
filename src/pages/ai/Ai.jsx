import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Ai = () => {
  const [result, setResult] = useState("");
  // const [uploadedImage, setUploadedImage] = useState("phto.png");
  const [selectedFile, setSelectedFile] = useState("phto.png");
  const [previewURL, setPreviewURL] = useState("phto.png");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setSelectedFile(file);
    // Create a FileReader to read the file and generate the preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      // reader.result contains the Base64 encoded image data
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      // 서버에서 받은 결과(response.data)를 사용하여 처리
      setResult(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setUploadedImage(imageUrl);
  //     handleDiagnosisClick(imageUrl);
  //   }
  // };

  const handleDiagnosisClick = async (imageUrl) => {
    // 퍼스널 컬러 진단 버튼이 클릭되었을 때 처리할 로직을 추가할 수 있습니다.
    try {
      const response = await axios.post("http://192.168.10.105:5001/analyze", {
        image_url: imageUrl,
      });

      console.log(response.data);
      // setResult(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMakeupClick = () => {
    // 메이크업 버튼이 클릭되었을 때 처리할 로직을 추가할 수 있습니다.
    console.log("메이크업 받기 버튼이 클릭되었습니다.");
  };

  return (
    <div style={{ padding: "200px" }}>
      <UploadImageButton htmlFor="image-upload">
        <input type="file" onChange={handleFileChange} />
      </UploadImageButton>

      {selectedFile && (
        <UploadedImageContainer>
          <div>업로드된 사진:</div>
          <UploadedImage src={previewURL} alt="Uploaded" />
        </UploadedImageContainer>
      )}
      <br />

      <PersonalColorButton onClick={handleFileUpload}>
        퍼스널컬러진단하기
      </PersonalColorButton>
      <div>{result ? <p>분석 결과: {result}</p> : null}</div>
      <br />
      <MakeupButton onClick={handleMakeupClick}>메이크업 받기</MakeupButton>
    </div>
  );
};

const UploadImageButton = styled.label`
  display: inline-block;
  background-color: #f0f0f0;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const UploadedImageContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
`;

const UploadedImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 10px;
`;

const PersonalColorButton = styled.button`
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const MakeupButton = styled.button`
  display: inline-block;
  background-color: #ff4500;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default Ai;
