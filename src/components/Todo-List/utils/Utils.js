export const getDataFromLocalstorage = () => {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
};
