import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './course.css';
import { ArrowLeft } from 'lucide-react';
const API_KEY = 'AIzaSyDw9Xp4oJEnDNP-hn5BjQ7-xgxbgXYtB2c';
const DEFAULT_SEARCH_TERMS = [
  'AI/Ml',
  'javascript programming tutorial ',
  'apna college videos',
  'web development tutorial',
  'Code with harry videos',
  'college wallah videos'
];

function YouTubeVideoSearch() {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchYouTubeVideos = useCallback(async (searchQuery) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&videoDuration=medium&maxResults=100&key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data = await response.json();

      // Fetch additional video details to get view count
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY}`
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
  }, []);

  // Load default programming videos on component mount
  useEffect(() => {
    const randomTerm = DEFAULT_SEARCH_TERMS[Math.floor(Math.random() * DEFAULT_SEARCH_TERMS.length)];
    fetchYouTubeVideos(randomTerm);
  }, [fetchYouTubeVideos]);

  const handleSearch = () => {
    if (!query.trim()) {
      // If search is empty, fetch random programming videos
      const randomTerm = DEFAULT_SEARCH_TERMS[Math.floor(Math.random() * DEFAULT_SEARCH_TERMS.length)];
      fetchYouTubeVideos(randomTerm);
    } else {
      fetchYouTubeVideos(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleVideoClick = (video) => {
    navigate(`/home/course/video/${video.id.videoId}`, { state: { video } });
  };

  return (
    <div className="youtube-search">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search YouTube Videos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
  
      {error && <div className="alert">{error}</div>}
      {loading && <div className="loading">Loading videos...</div>}

      <div className="grid">
        {videos.map((video) => (
          <div 
            key={video.id.videoId} 
            onClick={() => handleVideoClick(video)} 
            className="video-item"
          >
            <img 
              src={video.snippet.thumbnails.medium.url} 
              alt={video.snippet.title} 
            />
            <div className="video-details">
              <h3>{video.snippet.title}</h3>
              <p>{video.snippet.channelTitle}</p>
              {video.statistics?.viewCount && (
                <p>{parseInt(video.statistics.viewCount).toLocaleString()} views</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubeVideoSearch;