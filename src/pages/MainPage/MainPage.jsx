
import Navbar2 from '../../components/Navbar2/Navbar2.jsx';
import BotPage from './BotPage.jsx';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../../config.js'

// const API_KEY=process.env.VITE_API_KEY;
console.log('API_KEY:', API_KEY); // Debug: Check if the API key is loaded


const DEFAULT_SEARCH_TERMS = [
  'AI/Ml',
  'javascript programming tutorial ',
  'apna college videos',
  'web development tutorial',
  'Code with harry videos',
  'college wallah videos'
];

const MainPage = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  
  // YouTube search states
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Authentication check
  useEffect(() => {
    axios.get('https://eduverse-backend-15ur.onrender.com/home')
      .then(res => {
        if(res.data !== 'Success') {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, []);

  // YouTube video fetch function
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

  // Load default videos on mount
  useEffect(() => {
    const randomTerm = DEFAULT_SEARCH_TERMS[Math.floor(Math.random() * DEFAULT_SEARCH_TERMS.length)];
    fetchYouTubeVideos(randomTerm);
  }, [fetchYouTubeVideos]);

  const handleSearch = () => {
    if (!query.trim()) {
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
    <div>
      <Navbar2 />
      <BotPage />
      
      {/* YouTube Search Section */}
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
    </div>
  );
};

export default MainPage;