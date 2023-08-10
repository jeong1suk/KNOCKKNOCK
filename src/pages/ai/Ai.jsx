import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint";
import spring from "../../assets/spring3.webp";
import summer from "../../assets/summer1.webp";
import fall from "../../assets/fall1.webp";
import winter from "../../assets/winter1.webp";
import wait from "../../assets/wait.jpeg";
import { showAlert } from "../../assets/alert";
const Ai = () => {
  const [result, setResult] = useState("");
  const [base64, setBase64] = useState("");
  const [clickpc, setClickPC] = useState(false);
  const [clickbg, setClickBG] = useState(false);
  const [selectedFile, setSelectedFile] = useState("/phto.png");
  const [previewURL, setPreviewURL] = useState("/phto.png");

  const handleFileChange = (e) => {
    setClickBG(false);
    setClickPC(false);
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile("/phto.png");
      setPreviewURL("/phto.png");
    }
  };

  const handlePersonalColor = async () => {
    if (selectedFile === "/phto.png") {
      showAlert("사진이 없습니다.");
    } else {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        setClickPC(true);
        const response = await axios.post(
          "http://34.64.223.226:5002/analyze",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // 서버에서 받은 결과(response.data)를 사용하여 처리
        setResult(response.data.result);
        // setClick(false);
        // setClickPC(false);
      } catch (err) {
        showAlert("다른 사진으로 다시 시도해보시겠어요?");
      }
    }
  };

  const handleMakeupClick = async () => {
    if (selectedFile === "/phto.png") {
      showAlert("사진이 없습니다.");
    } else {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log(formData);

      // 메이크업 버튼이 클릭되었을 때 처리할 로직을 추가할 수 있습니다.
      try {
        setClickBG(true);
        const res = await axios.post(
          "http://34.64.223.226:5002/makeup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setBase64(res.data.base64_image);
        // setClick(false);
      } catch (err) {
        showAlert("다른 사진으로 다시 시도해보시겠어요?");
      }
    }
  };
  useEffect(() => {
    setResult("");
    setBase64("");
    window.scrollTo(0, 0);
  }, [selectedFile]);

  return (
    <>
      <Container>
        <ButtonSection>
          <Button style={{ cursor: "auto" }}>
            <ImageUploadInput
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
              파일 선택
            </label>
          </Button>
          <Button onClick={handlePersonalColor}>퍼스널컬러</Button>
          <Button onClick={handleMakeupClick}>beautyGAN</Button>
          {/* <Button>StyleGAN(유료/미구현)</Button> */}
        </ButtonSection>

        <UserProfileBox>
          <RightSectionWrapper>
            <LeftSection>
              {selectedFile && (
                <UploadedImageContainer>
                  <UploadedImage src={previewURL} alt="Uploaded" />
                </UploadedImageContainer>
              )}
            </LeftSection>

            {clickbg && (
              <RightSection>
                {/* <br /> */}
                {/* {selectedFile === "phto.png" && clickbg && (
                  <UploadedImageContainer>
                    <UploadedImage src={previewURL} alt="Uploaded" />
                  </UploadedImageContainer>
                )} */}
                {base64 && (
                  <UploadedImageContainer>
                    <UploadedImage
                      src={`data:image/png;base64,${base64}`}
                      alt="Result"
                    />
                  </UploadedImageContainer>
                )}
                {!base64 && selectedFile !== "/phto.png" && (
                  <UploadedImageContainer style={{ border: "none" }}>
                    <UploadedImage src={wait} />
                    <p>cpu 성능이 안좋아 최대 10초정도 걸립니다.</p>
                  </UploadedImageContainer>
                )}
              </RightSection>
            )}
          </RightSectionWrapper>
          <ResultSection>
            {selectedFile === "phto.png" && clickpc && (
              <UploadedImageContainer>
                <UploadedImage src={previewURL} alt="Uploaded" />
              </UploadedImageContainer>
            )}
            {result === "spring" && <ColorImage src={spring} alt="봄 웜톤" />}
            {result === "summer" && <ColorImage src={summer} alt="여름 쿨톤" />}
            {result === "fall" && <ColorImage src={fall} alt="가을 웜톤" />}
            {result === "winter" && <ColorImage src={winter} alt="겨울 쿨톤" />}

            <div>
              {clickpc && !result && selectedFile !== "/phto.png" && (
                <UploadedImage src={wait} />
              )}
            </div>
          </ResultSection>
        </UserProfileBox>
      </Container>
    </>
  );
};
const ImageUploadInput = styled.input`
  display: none;
`;

const UploadedImageContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    /* 태블릿 화면에서 이미지 컨테이너의 너비를 50%로 */
    width: 50%;
    left: 50%;
    transform: translateX(50%);
  }
`;

const UploadedImage = styled.img`
  width: 100%;
  max-height: 300px;
  margin-top: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const UserProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* border: 2px solid red; */
`;

const LeftSection = styled.div`
  margin-right: 2rem;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 100%; /* 모바일 화면에서 가로 폭을 100%로 조정 */
    /* margin-top: 0; 모바일 화면에서 위쪽 여백 제거 */
  }
`;

const RightSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-top: 4.4rem; */
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    flex-direction: column;
    align-items: center;
  }
`;

const RightSection = styled.div`
  margin-top: -1rem;
  margin-right: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  /* width: 40rem; */

  @media (max-width: 768px) {
    width: 100%; /* 모바일 화면에서 가로 폭을 100%로 조정 */
    margin-top: 0; /* 모바일 화면에서 위쪽 여백 제거 */
  }
`;
const ResultSection = styled.div`
  display: flex;
  justify-content: center;
  /* margin-top: 4.5rem; */
  margin-bottom: 2rem;
  /* margin-left: 2rem; */
  /* border: 1px solid black; */
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 100%; /* 모바일 화면에서 가로 폭을 100%로 조정 */
    margin-top: 0; /* 모바일 화면에서 위쪽 여백 제거 */
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6rem;
  margin-bottom: 2rem;
  border: 1px solid black;
  max-width: 300px;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 70%;
    height: 7rem;
  }
`;

const Button = styled.button`
  font-size: 100%;
  font-family: "KIMM_Bold";
  padding: 10px 10px;
  background-color: #f7cbd0;
  color: black;
  border: 10px double #fff;
  border-radius: 50px;
  cursor: pointer;
  margin: 50px 0 30px 0;
  width: 20%;
  height: 80px;
  transition: 0.3s;

  &:hover {
    border: 10px double #3b0b0b;
    color: #3b0b0b;
    transform: scale(1.02);
  }

  @media (max-width: 750px) {
    margin: 20px 0;
    width: 50%;
    height: 60px;
    font-size: 70%;
  }
`;
const ButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;
`;

const ColorImage = styled.img`
  height: 80%;
  margin-top: 10px;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 70%; /* 모바일 화면에서 가로 폭을 100%로 조정 */
    /* margin-top: 0; 모바일 화면에서 위쪽 여백 제거 */
  }
`;
export default Ai;
