/**
 * Completar cuando existan datos oficiales.
 * Mientras estén vacíos, la UI no muestra enlaces ni direcciones ficticias.
 */
export const contactInfo = {
  name: "",
  email: "",
  phone: "",
  tiktok: "",
  instagram: "",
};

export function hasContactValue(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function hasAnyContact() {
  return Object.values(contactInfo).some(hasContactValue);
}
