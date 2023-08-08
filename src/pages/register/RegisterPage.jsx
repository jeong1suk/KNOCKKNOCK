import React, { useState, useContext } from "react";
import RequiredInputs from "./RequiredInputs";
import OptionalInputs from "./OptionalInputs";
import * as S from "./style";
import * as Api from "../../api";
import { DispatchContext } from "../../context/user/UserProvider";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../assets/alert";
import ValidationFields from "./ValidationFields";
const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const [previewURL, setPreviewURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState("phto.png");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // setErrorMessage("");
    setPreviewURL(URL.createObjectURL(file));
  };
  // console.log("부모");
  const handleRegistration = async (formData) => {
    try {
      // console.log("등록버튼함수안: ", formData);
      let response;
      if (selectedFile) {
        const formImgData = new FormData();
        formImgData.append("image", selectedFile);

        response = await Api.post("files", formImgData);
        console.log(response);
        await Api.post("users/register", {
          name: formData.name,
          email: formData.email,
          nickname: formData.nickname,
          password: formData.password,
          gender: formData.gender,
          birthday: formData.birthdate,
          job: formData.job,
          region: formData.region,
          mbti: formData.mbti,
          height: formData.height,
          hobby: formData.hobby,
          personality: formData.personality,
          introduce: formData.introduce || "반가워요!",
          profileImage: ["profile", response.data],
        });
      } else {
        await Api.post("users/register", {
          name: formData.name,
          email: formData.email,
          nickname: formData.nickname,
          password: formData.password,
          gender: formData.gender,
          birthday: formData.birthdate,
          job: formData.job,
          region: formData.region,
          mbti: formData.mbti,
          height: formData.height,
          hobby: formData.hobby,
          personality: formData.personality,
          introduce: formData.introduce || "반가워요!",
          // profileImage: ["profile", "http://placekitten.com/200/200"],
        });
      }
      // console.log(formData);

      // 로그인 페이지로 이동함.
      const res = await Api.post("users/login", {
        email: formData.email,
        password: formData.password,
      });

      const user = res.data;
      const jwtToken = user.token;

      localStorage.setItem("userToken", jwtToken);
      localStorage.setItem("userId", user.userId);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      console.log(err);
      if (err.response.data.message) {
        showAlert(err.response.data.message);
        // console.log(err.response.data.message);
      } else {
        console.log("라우팅 경로가 잘못되었습니다.");
      }
    }
  };

  return (
    <S.Content>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          /*
          const formData = {
            name: e.target.name.value,
            nickname: e.target.nickname.value,
            email: e.target.email.value,
            password: e.target.password.value,
            gender: e.target.gender.value,
            birthdate: e.target.birthdate.value,
            job: e.target.job.value,
            region: e.target.region.value,
            mbti: e.target.mbti.value,
            height: e.target.height.value,
            hobby: e.target.hobby.value,
            personality: e.personality,
            ideal: e.ideal,
            introduce: e.introduce,
          };
          */
          handleRegistration({
            ...RequiredInputs.getFormData(),
            ...ValidationFields.getFormData(),
            ...OptionalInputs.getFormData(), //아무값도 return을 받지 않으면 안됨. 왜지?
          });
        }}
      >
        <S.Header style={{ border: 0 }}>Register</S.Header>

        <S.Header>필수 입력</S.Header>
        <RequiredInputs />
        <S.Heading>사진</S.Heading>
        <S.Box>
          <S.Input type="file" onChange={handleFileChange} />
        </S.Box>
        {selectedFile && (
          <div>
            <h6>미리보기</h6>
            <img
              src={previewURL}
              alt="Selected Image"
              style={{ width: "50%" }}
            />
          </div>
        )}
        <S.Header>선택 입력</S.Header>
        <OptionalInputs />

        <S.JoinButton type="submit" onSubmit={() => handleRegistration()}>Register</S.JoinButton>
      </form>
    </S.Content>
  );
};

export default RegisterPage;
