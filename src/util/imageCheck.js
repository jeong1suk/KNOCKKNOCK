export const getImageSrc = (imageUrl) => {
  if (imageUrl) {
    return imageUrl;
  } else {
    return "/defaultImage.png"; // 웹 서버의 루트를 기반으로 합니다.
  }
};
