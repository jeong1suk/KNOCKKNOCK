export const getImageSrc = (imageUrl) => {
  if (imageUrl) {
    return imageUrl;
  } else {
    return "http://placekitten.com/200/200";
  }
};
