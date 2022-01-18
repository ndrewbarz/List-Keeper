export const sorting = (arr) => {
  const type = {
    date: "date",
    listTitle: "listTitle",
    category: "category",
  };

  let sortedArr = [...arr].sort((a, b) => {
    if (type.date) {
      return (
        Date.parse(new Date(b.date.split(".").reverse().join("-"))) -
        Date.parse(new Date(a.date.split(".").reverse().join("-")))
      );
    }
    if (type.listTitle) {
      return b.listTitle - a.listTitle;
    }
    if (type.category) {
      return b.category - a.category;
    }
    return sortedArr;
  });
  return sortedArr;
};
