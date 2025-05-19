export const setPostLoginRedirect = () => {
  const fullPath = window.location.pathname + window.location.search;
  sessionStorage.setItem("postLoginRedirect", fullPath);
};

export const getPostLoginRedirect = () => {
  return sessionStorage.getItem("postLoginRedirect");
};

export const removePostLoginRedirect = () => {
  sessionStorage.removeItem("postLoginRedirect");
};
