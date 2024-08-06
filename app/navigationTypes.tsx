// navigationTypes.ts
export type RootStackParamList = {
  Gallery: undefined;
  Reorder: { media: { uri: string | null; isVideo: boolean }[] };
};
