export type PackageVersion = {
  packageName: string,
  packageTypeName: string,
  version: string,
  publishTime: number
};

export type Package = {
  packageName: string,
  packageTypeName: string,
  latestVersion: string,
  latestModifyTime: number,
  latestCheckTime: number,
};
