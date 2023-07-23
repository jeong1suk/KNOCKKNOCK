import React, { useState } from "react";
import styled from "styled-components";

const Ai = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  const handleDiagnosisClick = () => {
    // 퍼스널 컬러 진단 버튼이 클릭되었을 때 처리할 로직을 추가할 수 있습니다.
    console.log("퍼스널 컬러 진단하기 버튼이 클릭되었습니다.");
  };

  const handleMakeupClick = () => {
    // 메이크업 버튼이 클릭되었을 때 처리할 로직을 추가할 수 있습니다.
    console.log("메이크업 받기 버튼이 클릭되었습니다.");
  };

  return (
    <div style={{ padding: "200px" }}>
      <ImageUploadInput
        type="file"
        onChange={handleFileChange}
        id="image-upload"
      />
      <UploadImageButton htmlFor="image-upload">
        이미지 업로드
      </UploadImageButton>
      {uploadedImage && (
        <UploadedImageContainer>
          <div>업로드된 사진:</div>
          <UploadedImage src={uploadedImage} alt="Uploaded" />
        </UploadedImageContainer>
      )}
      <br />
      <PersonalColorButton onClick={handleDiagnosisClick}>
        퍼스널컬러진단하기
      </PersonalColorButton>
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
