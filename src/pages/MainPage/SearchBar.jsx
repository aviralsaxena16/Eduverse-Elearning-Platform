
import { useState,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import './login.css';
import { API_KEY } from '../../config.js'; // Import the API key


// const API_KEY=process.env.VITE_API_KEY;
console.log('API_KEY:', API_KEY); // Debug: Check if the API key is loaded

function YouTubeVideoSearch() {
  console.log('API_KEY:', API_KEY)
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchYouTubeVideos = useCallback(async () => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=100&key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data = await response.json();
      
      // Fetch additional video details to get view count
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const detailsResponse = await fetch(
       ` https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
      );

      const detailsData = await detailsResponse.json();
      
      // Merge snippet and statistics
      const enrichedVideos = data.items.map(video => {
        const stats = detailsData.items.find(
          item => item.id === video.id.videoId
        )?.statistics || {};
        return { ...video, statistics: stats };
      });

      setVideos(enrichedVideos);
    } 
    catch (err) {
      setError(err.message);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [query, API_KEY]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchYouTubeVideos();
    }
  };

  const handleVideoClick = (video) => {
    navigate(`/home/course/video/${video.id.videoId}`, { state: { video } });
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="search-container mb-4 flex">
        <input
          type="text"
          placeholder="Search YouTube Videos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown ={handleKeyPress}
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchYouTubeVideos}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center text-gray-500">Loading videos...</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            onClick={() => handleVideoClick(video)}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="font-bold text-sm line-clamp-2">
                {video.snippet.title}
              </h3>
              <p className="text-xs text-gray-600">
                {video.snippet.channelTitle}
              </p>
              {video.statistics?.viewCount && (
                <p className="text-xs text-gray-500">
                  {parseInt(video.statistics.viewCount).toLocaleString()} views
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubeVideoSearch;
