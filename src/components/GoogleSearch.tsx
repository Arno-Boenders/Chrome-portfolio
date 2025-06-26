
import { Search, Mic, Camera } from 'lucide-react';
import { useTheme } from '@context/ThemeContext';
interface GoogleSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
}

const GoogleSearch = ({ query, onQueryChange, onSearch }: GoogleSearchProps) => {
    const { isDarkMode, theme } = useTheme();
  return (
    <div className={`p-4 ${theme.background}`}>
      {/* Google header */}
      <div className={`flex items-center justify-between p-4 border-b border-gray-200 ${theme.foreground}`}>
        <div className="flex items-center space-x-8">
          <img 
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" 
            alt="Google" 
            className="h-8"
          />
          <div className="flex items-center rounded-full border border-gray-200 shadow-sm px-4 py-2 w-96">
            <Search className={`w-4 h-4 ${theme.foreground} mr-3`} />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="flex-1 outline-none text-sm"
              placeholder="Search Google or type a URL"
            />
            <div className="flex items-center space-x-2 ml-3">
              <Mic className={`w-4 h-4 ${theme.foreground} cursor-pointer hover:text-gray-600`} />
              <Camera className={`w-4 h-4 ${theme.foreground} cursor-pointer hover:text-gray-600`} />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className={`text-sm ${theme.foreground} hover:underline hover:text-gray-600 ${isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-900'}`}>Gmail</button>
          <button className={`text-sm ${theme.foreground} hover:underline hover:text-gray-600 ${isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-900'}`}>Images</button>
          <div className={`w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold ${theme.foreground}`}>
            A
          </div>
        </div>
      </div>

      {/* Search filters */}
      <div className={`px-4 pt-3 pb-1 border-b border-gray-100 ${theme.foreground}`}>
        <div className="flex items-center space-x-6 text-sm">
          <button className={`text-blue-600 border-b-2 border-blue-600 pb-2 ${theme.foreground}`}>All</button>
          <button className={`pb-2 ${theme.foreground} hover:cursor-pointer ${isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-900'}`}>Images</button>
          <button className={`pb-2 ${theme.foreground} hover:cursor-pointer ${isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-900'}`}>Videos</button>
          <button className={`pb-2 ${theme.foreground} hover:cursor-pointer ${isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-900'}`}>News</button>
          <button className={`pb-2 ${theme.foreground} hover:cursor-pointer ${isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-900'}`}>Maps</button>
          <button className={`pb-2 ${theme.foreground} hover:cursor-pointer ${isDarkMode ? 'hover:text-gray-400' : 'hover:text-gray-900'}`}>More</button>
        </div>
      </div>

      {/* Results info */}
      <div className={`px-4 py-3 ${theme.foreground}`}>
        About 2,340,000 results (0.45 seconds)
      </div>
    </div>
  );
};

export default GoogleSearch;
