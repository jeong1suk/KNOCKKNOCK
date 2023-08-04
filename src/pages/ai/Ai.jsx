import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
const Ai = () => {
  const [result, setResult] = useState("");
  const [base64, setBase64] = useState("");
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

  const handleMakeupClick = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData);
    // 메이크업 버튼이 클릭되었을 때 처리할 로직을 추가할 수 있습니다.
    // console.log("메이크업 받기 버튼이 클릭되었습니다.");
    try {
      const res = await axios.post("http://127.0.0.1:5001/makeup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res);
      // console.log(res.data.base64_image);
      setBase64(res.data.base64_image);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <UserProfileBox>
        <RightSectionWrapper>
          <LeftSection>
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

            {/* <MakeupButton>styleGAN</MakeupButton> */}
          </LeftSection>
          <RightSection>
            <Section>
              <SectionButton onClick={handleFileUpload}>
                퍼스널컬러진단하기
              </SectionButton>
              <div>{result ? <p>분석 결과: {result}</p> : null}</div>

              <SectionButton onClick={handleMakeupClick}>
                beautyGAN
              </SectionButton>

              <br />
              {base64 && (
                <img src={`data:image/png;base64,${base64}`} alt="Result" />
              )}
              <SectionButton onClick={handleMakeupClick}>
                StyleGAN
              </SectionButton>
            </Section>
          </RightSection>
        </RightSectionWrapper>
      </UserProfileBox>
    </Container>
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
  margin-bottom: 10px;
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 150vh;
  background-color: #f2f2f2e2;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 30vh;
  background: linear-gradient(to left, #f0987f, #f8d6cc);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: center;
  position: relative;
  &:hover {
    background: gray;
    cursor: pointer;
  }
`;
const ChangeBackgroundButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background-color: white;
  border: 2px solid #f0987f;
  border-radius: 4px;
  color: #f0987f;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
const ProfilePicture = styled.img`
  width: 8rem;
  height: 8rem;
  border-color: #f2f2f2e2;
  border-width: 4px;
  border-style: solid;
  border-radius: 100%;
  margin-top: -5.5rem;
  margin-right: 50rem;
  z-index: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const LeftSection = styled.div`
  margin-right: 2rem;
`;

const RightSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4.4rem;
`;

const RightSection = styled.div`
  background-color: #f2f2f2e2;
  margin-top: -7rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 40rem;
`;

const MessageChat = styled.div`
  display: flex;
  height: 80vh;
  justify-content: space-between;
  flex-direction: column;
  background-color: #f5f5f7;
  padding: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const MessageBox = styled.div``;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`;

const ProfileImageBox = styled.div`
  display: flex;
  margin-bottom: 3rem;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Bubble = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 20px;
  margin: 0 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-top: 1rem;
  font-size: 1.1rem;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 1rem 0rem 1rem;
`;

const ChatInput = styled.input`
  border: none;
  width: 50rem;
  height: 1.8rem;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SendButton = styled.button`
  margin-left: 10px;
  width: 6rem;
  height: 3rem;
  padding: 10px 20px;
  background-color: #ffffff;
  color: #b5b5b5;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f2f2f2;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4.5rem;
  margin-bottom: 2rem;
`;

const SectionButton = styled.button`
  padding: 10px;
  margin: 0 10px;
  background-color: ${(props) => (props.isactive ? "#ddd" : "transparent")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
export default Ai;
