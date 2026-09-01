export const markets = [
  { country: "Argentina", percentage: 11.3 },
  { country: "México", percentage: 11.1 },
  { country: "Venezuela", percentage: 10.2 },
  { country: "Perú", percentage: 7.9 },
  { country: "Chile", percentage: 7.6 },
];

export const geoNameToCountry = {
  Argentina: "Argentina",
  Mexico: "México",
  Venezuela: "Venezuela",
  Peru: "Perú",
  Chile: "Chile",
};

export const latamGeoNames = new Set([
  "Argentina",
  "Belize",
  "Bolivia",
  "Brazil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Dominican Rep.",
  "Ecuador",
  "El Salvador",
  "Guatemala",
  "Guyana",
  "Haiti",
  "Honduras",
  "Jamaica",
  "Mexico",
  "Nicaragua",
  "Panama",
  "Paraguay",
  "Peru",
  "Puerto Rico",
  "Suriname",
  "Trinidad and Tobago",
  "Uruguay",
  "Venezuela",
]);

export function getMarketByCountry(country) {
  return markets.find((item) => item.country === country) ?? null;
}

export function getMarketByGeoName(name) {
  const country = geoNameToCountry[name];
  return country ? getMarketByCountry(country) : null;
}
