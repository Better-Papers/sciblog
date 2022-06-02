export function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(" ")
    .join("_");
}
