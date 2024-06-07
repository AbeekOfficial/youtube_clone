type VideoDetailsType = {
  contentDetails: {
    duration: string;
    definition: string;
    caption: string;
  };
  id: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: string;
    defaultAudioLanguage: string;
    defaultLanguage: string;
    tags: string[];
    localized: {
      title: string;
      description: string;
    };
    thumbnails: {
      default: {
        url: string;
      };
      high: {
        url: string;
      };
      maxres: {
        url: string;
      };
      medium: {
        url: string;
      };
      standard: {
        url: string;
      };
    };
    title: string;
  };
  statistics: {
    commentCount: string;
    dislikeCount: string;
    favoriteCount: string;
    likeCount: string;
    viewCount: string;
  };
};

export default VideoDetailsType;
