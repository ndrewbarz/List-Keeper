export const shareList = (title, category, date, itemLists = []) => {
  return `
      **${title}** %0A
      ${category} %0A
      __${date}__ %0A
      -${itemLists.map((item) => item.itemValue)}- %0A
    `;
};
