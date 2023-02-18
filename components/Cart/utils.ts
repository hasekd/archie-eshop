export const createDate = (dateFormatFor: "invoice" | "email") => {
  const current = new Date();

  if (dateFormatFor === "invoice") {
    return `${current.getDate()}.${
      current.getMonth() + 1
    }.${current.getFullYear()} \n ${current.getDate()}.${
      current.getMonth() + 1
    }.${current.getFullYear()}`;
  }
  return `${current.getDate()}.${
    current.getMonth() + 1
  }.${current.getFullYear()}`;
};
