import React, { useEffect, useState, useRef } from "react";
import ReportCard from "./ReportCard";
import {
  fetchChannelId,
  fetchMostEarningVideo,
  getVideoIdFromUrl,
} from "../utils/apiHelper";

const Body = () => {
  const [videoLink, setVideoLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(null);
  const isInitialRender = useRef(true);

  const getData = async () => {
    setLoading(true);

    const videoId = getVideoIdFromUrl(videoLink);

    if (!videoId) {
      console.error("Invalid YouTube URL");
      setLoading(false);
      return;
    }

    const channelId = await fetchChannelId(videoId);

    if (channelId) {
      try {
        // Update to fetch the video with the highest earnings
        const mostEarningVideoId = await fetchMostEarningVideo(channelId);
        console.log(mostEarningVideoId);
        setDataFetched(mostEarningVideoId);
      } catch (error) {
        console.error(error.message);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    // Skip the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    getData();
  }, [videoLink]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (dataFetched) {
    return (
      <div>
        {dataFetched.map((eachEle, index) => (
          <ReportCard key={index} {...eachEle} />
        ))}
      </div>
    );
  }

  return (
    <div className="m-auto flex h-80 w-[70%] flex-col items-center justify-center text-center">
      <h2 className="mt-16 w-10/12 text-5xl font-bold text-white">
        Discover your earning potential
      </h2>
      <p className="mt-5 w-full text-[24px] text-white">
        Turn your Youtube expertise into a lucrative income through resource
        sharing
      </p>

      <div className="mt-5 flex">
        <input
          className="w-full rounded border p-2"
          type="text"
          onChange={(e) => {
            setVideoLink(e.target.value);
          }}
          placeholder="Enter YouTube video link"
        />
        <button
          className="ml-3 w-24 rounded bg-red-400 px-4  text-white"
          onClick={getData}
        ></button>
      </div>
    </div>
  );
};

export default Body;
