export const sanitizePostUrl = (post_title) => {
  return post_title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?!<>{}]/g, "");
};
