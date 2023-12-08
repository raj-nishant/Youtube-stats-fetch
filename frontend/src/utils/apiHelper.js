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
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    // Assuming data.items is an array of videos
    const videos = data.items;

    // Fetch video details for each videoId
    const videoDetailsPromises = videos.map(async (video) => {
      const videoId = video.id.videoId;
      const videoResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`,
      );
      const videoData = await videoResponse.json();
      return videoData.items[0]; // Assuming there is only one item for each videoId
    });

    // Wait for all video details to be fetched
    const videoDetails = await Promise.all(videoDetailsPromises);

    // Calculate earnings for each video and sort them in descending order
    const sortedVideos = videoDetails
      .map((video) => {
        const { statistics } = video;
        const minSubsAndView = Math.min(
          statistics.subscriberCount,
          statistics.viewCount,
        );
        const commentsEarnings = 10 * statistics.commentCount;
        const likesEarnings = 5 * statistics.likeCount;
        const earnings = minSubsAndView + commentsEarnings + likesEarnings;

        return {
          ...video,
          earnings: earnings,
        };
      })
      .sort((a, b) => b.earnings - a.earnings);

    // Return the top 3 earning videos
    return sortedVideos.slice(0, 3);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null; // Return null or an empty array, depending on your use case
  }
};

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

export { fetchChannelId, fetchMostEarningVideo, getVideoIdFromUrl };
