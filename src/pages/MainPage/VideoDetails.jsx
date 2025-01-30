import { useLocation, useParams } from 'react-router-dom';
import './video.css';
function VideoDetails() {
  const location = useLocation();
  const { videoId } = useParams();
  const { video } = location.state || {};
  console.log(video)
  // If no video data is passed, you might want to fetch video details
  if (!video) {
    return (
      <div className="container mx-auto p-4 text-center">
        Video not found. Please return to search.
      </div>
    );
  }
  console.log(videoId)
  
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="video-container mb-4">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.snippet.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="video-info">
        <h1 className="title">{video.snippet.title}</h1>
        
        <div className="channel-info">
          <img
            src={video.snippet.thumbnails.default.url}
            alt={video.snippet.channelTitle}
            className="image"
          />
          <span className="font-semibold">{video.snippet.channelTitle}</span>
        </div>

        <div className="vedio-text">
          {video.statistics?.viewCount && (
            <span className="contain">
              {parseInt(video.statistics.viewCount).toLocaleString()} views
            </span>
          )}
          <span>
            Published on: {new Date(video.snippet.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <p className="video-description">
          {video.snippet.description}
        </p>

        <div className="video-actions">
          <button className="like">
            Like
          </button>
          <button className="dislike">
            Dislike
          </button>
          <button className="share">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;
