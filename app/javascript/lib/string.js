export const capitalize = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

export const displayDate = (string) => {
  const date = new Date(string);

  return date.toLocaleDateString("en-US", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
};

export const displayDateTime = (string) => {
  const date = new Date(string);

  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}`;
};

export const displayShortDate = (string) => {
  const date = new Date(string);

  return date.toLocaleDateString("en-US");
};

export const displayTime = (string) => {
  if(!string) { return; }

  const hours = Math.floor(string / (60 * 60));
  let minutes = Math.floor(string / 60);
  let seconds = string % 60;

  if(minutes < 10) { minutes = `0${minutes}`; }
  if(seconds < 10) { seconds = `0${seconds}`; }

  return [hours, minutes, seconds].filter(Boolean).join(":");
};

export const isBlankHTML = (string) => {
  if(string == null || string === "") { return true; }

  const updatedString = string
    .replaceAll("<div class=\"trix-content\">", "")
    .replaceAll("</div>", "")
    .trim();

  return updatedString === "";
};
