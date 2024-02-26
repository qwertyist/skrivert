type ShortformExportType = {
  sf: string;
  p: string;
  u: Date;
};

type ConflictType = {
  sf: string;
  ps: string[];
};

export function merge(
  target: Array<ShortformExportType>,
  from: Array<ShortformExportType>,
) {
  let merged: Array<ShortformExportType> = [];
  let sfs: string[] = [];
  let conflicts: Array<ConflictType> = [];
  target.forEach((item) => {
    sfs.push(item.sf);
    merged.push(item);
  });
  from.forEach((item) => {
    if (sfs.indexOf(item.sf) != -1) {
      const existsInTarget = target.filter((existing) => {
        return existing.sf == item.sf;
      })[0];
      const conflict: ConflictType = {
        sf: item.sf,
        ps: [existsInTarget.p, item.p],
      };
      conflicts.push(conflict);
    } else {
      merged.push(item);
    }
  });
  return { merged, conflicts };
}
