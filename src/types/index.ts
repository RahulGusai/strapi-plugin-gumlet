export interface CustomVideo {
  title: string;
  description: string;
  videoId: string;
  playbackUrl: string;
  thumbnail: string;
  tags: string[];
  metadata: {
    key: string;
    value: string;
  }[];
  createdAt: Date;
  id: number;
  updatedAt: Date;
}
export interface CustomAssets {
  playbackUrl: string;
}

export interface CustomSettings {
  apiKey: string;
  defaultPublic: boolean;
  collectionIds: string[];
}

export interface InputData {
  title: string;
  description: string;
  tags?: string[];
  metadata?: {
    key: string;
    value: string;
  }[];
  collectionId?: string;
}

export interface InputDataMetadata {
  key: string;
  value: string;
}
