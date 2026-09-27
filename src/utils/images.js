const avatars = import.meta.glob("../assets/avatars/*", {
  eager: true,
  query: "?url",
  import: "default",
});

export function getAvatar(imagePath) {
  const fileName = imagePath.split("/").pop();
  return avatars[`../assets/avatars/${fileName}`];
}
