// so that indices are correct between the album click and album open -> play

export const makeTrackId = (sourceIdOrTitle: string | number, idx?: number) =>
  String(sourceIdOrTitle).replace(/\s+/g, "-").toLowerCase() + (typeof idx === "number" ? `-${idx}` : "");
