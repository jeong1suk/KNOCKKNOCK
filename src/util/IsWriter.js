export const isWriter = ({ userId, post }) => {
  if (userId == post.user_id) {
    return true;
  } else {
    return false;
  }
};
