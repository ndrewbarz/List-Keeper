export const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "500px",
  tablet: "970px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `only screen and (max-width: ${size.mobileS})`,
  mobileM: `only screen and (max-width: ${size.mobileM})`,
  mobileL: `only screen and (max-width: ${size.mobileL})`,
  tablet: `only screen and (max-width: ${size.tablet})`,
  laptop: `only screen and (max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};
