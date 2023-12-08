import { API_KEY } from "../config";

const fetchChannelId = async (videoId) => {
  try {
    // Make a GET request to the YouTube API's videos.list endpoint
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch channel ID for video ${videoId}`);
    }

    const data = await response.json();

    // Extract the channel ID from the API response
    const channelId = data.items[0]?.snippet?.channelId;

    if (!channelId) {
      throw new Error(`Channel ID not found for video ${videoId}`);
    }
    return channelId;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const fetchMostEarningVideo = async (channelId) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=viewCount&maxResults=1&type=video&key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch most earning video for channel ${channelId}`,
      );
    }

    const data = await response.json();

    if (data.items.length === 0) {
      throw new Error(`No videos found for channel ${channelId}`);
    }

    const mostEarningVideoId = data.items[0].id.videoId;

    // Fetch detailed video data using videos.list endpoint
    const videoData = await getVideoData(mostEarningVideoId);

    if (!videoData) {
      throw new Error(
        `Failed to fetch video data for video ${mostEarningVideoId}`,
      );
    }

    const earnings =
      Math.min(
        videoData.statistics.subscriberCount || 0,
        videoData.statistics.viewCount || 0,
      ) +
      10 * (videoData.statistics.commentCount || 0) +
      5 * (videoData.statistics.likeCount || 0);

    if (earnings > 0) {
      return { mostEarningVideoId, videoData };
    } else {
      throw new Error(`Video with ID ${mostEarningVideoId} has zero earnings`);
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const fetchSubscriberCount = async (channelId, setSubscriberCount) => {
  try {
    // Make a GET request to the YouTube API's channels.list endpoint
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch subscriber count for channel ${channelId}`,
      );
    }

    const data = await response.json();

    // Extract the subscriber count from the API response
    const subscriberCount = data.items[0]?.statistics?.subscriberCount;

    if (subscriberCount) {
      setSubscriberCount(subscriberCount);
    }
    return subscriberCount;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

// const getVideoData = async (videoId, setVideoData) => {
//   try {
//     // Make a GET request to the YouTube API's videos.list endpoint
//     const response = await fetch(
//       `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${API_KEY}`,
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to fetch video data for video ${videoId}`);
//     }

//     const data = await response.json();

//     // Extract the video data from the API response
//     const videoData = data.items[0];

//     if (videoData) {
//       setVideoData(videoData);
//     }
//     return videoData;
//   } catch (error) {
//     console.error(error.message);
//     return null;
//   }
// };

const getVideoIdFromUrl = (url) => {
  try {
    // Use a regular expression to extract the video ID from the YouTube video URL
    const match = url.match(/[?&]v=([^?&]+)/);

    // Check if a match is found
    if (match) {
      return match[1];
    } else {
      throw new Error("Invalid YouTube URL");
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export {
  fetchChannelId,
  fetchMostEarningVideo,
  fetchSubscriberCount,
  getVideoData,
  getVideoIdFromUrl,
};
