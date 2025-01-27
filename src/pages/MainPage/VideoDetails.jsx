import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import './vedio.css';
function VideoDetails() {
  const location = useLocation();
  const { videoId } = useParams();
  const { video } = location.state || {};

  // If no video data is passed, you might want to fetch video details
  if (!video) {
    return (
      <div className="container mx-auto p-4 text-center">
        Video not found. Please return to search.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="video-container mb-4">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.snippet.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="video-info">
        <h1 className="text-2xl font-bold mb-2">{video.snippet.title}</h1>
        
        <div className="channel-info flex items-center mb-4">
          <img
            src={video.snippet.thumbnails.default.url}
            alt={video.snippet.channelTitle}
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="font-semibold">{video.snippet.channelTitle}</span>
        </div>

        <div className="video-metadata text-sm text-gray-600 mb-4">
          {video.statistics?.viewCount && (
            <span className="mr-4">
              {parseInt(video.statistics.viewCount).toLocaleString()} views
            </span>
          )}
          <span>
            Published on: {new Date(video.snippet.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <p className="video-description text-gray-800">
          {video.snippet.description}
        </p>

        <div className="video-actions mt-4 flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Like
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Dislike
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;
