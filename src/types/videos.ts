// In your types file, e.g., ../../types/videos.ts
export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    medium: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface VideoId {
  kind: string;
  videoId: string;
}

export interface Video {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: VideoSnippet;
}

export interface VideosDataType {
  videos: Video[];
  loading: boolean;
  error?: string;
}
