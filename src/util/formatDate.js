export const formatDate = (data) => {
  const date = new Date(data);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  return koreanTime.toLocaleString("ko-KR", options);
};
