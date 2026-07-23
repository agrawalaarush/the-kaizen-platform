const extractNameFromEmail = (email) => {
  const username = email.split("@")[0];

  const name = username
    .split(".")
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1).toLowerCase()
    )
    .join(" ");

  return name;
};

module.exports = extractNameFromEmail;