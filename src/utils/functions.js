// ** Function to Capitalize First Letter
export const capitalizeFirstLetter = (str) => {
  let capitalized = "";
  if (str) {
    capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  }

  return capitalized;
};

// ** Function to Check Bookmarks
export const isBookmarked = (id, bookmarks) => {
  const found = bookmarks?.some((item) => item.id === id);
  return found ? "active" : "";
};
