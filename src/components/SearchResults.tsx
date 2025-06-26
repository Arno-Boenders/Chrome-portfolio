import { useTheme } from "@/context/ThemeContext";

interface SearchResult {
    url: string;
    title: string;
    description: string;
    domain: string;
  }
  
  interface SearchResultsProps {
    results: SearchResult[];
  }
  
  const SearchResults = ({ results }: SearchResultsProps) => {
    const {theme} = useTheme()
    return (
      <div className={`px-4 pb-8 flex gap-8 ${theme.background}`}>
        {/* Main search results - left side */}
        <div className="max-w-2xl flex-1">
          {results?.map((result, index) => (
            <div key={index} className="mb-8 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center mb-1">
                <div className="w-6 h-6 bg-blue-600 rounded-full mr-3 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-sm"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">{result.domain}</div>
                  <div className="text-xs text-gray-500">{result.url}</div>
                </div>
              </div>
              <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1 font-normal">
                {result.title}
              </h3>
              <p className="text-sm text-gray-600 leading-6">
                {result.description}
              </p>
            </div>
          ))}
        </div>
  
        {/* Right sidebar with images and info */}
        <div className="w-80 ml-8">
          <div className="rounded-lg p-4 shadow-sm">
            {/* Image gallery */}
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <img 
                    src="/Arno.jpeg" 
                    alt="Profile"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=120&fit=crop" 
                  alt="Coding setup"
                  className="w-full h-24 object-cover rounded"
                />
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=120&fit=crop" 
                    alt="Programming"
                    className="w-full h-24 object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-medium">See more</span>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Profile info */}
            <div className="mb-4">
              <h2 className={`text-2xl font-normal mb-1 ${theme.foreground}`}>Arno Boenders</h2>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 text-sm mr-2">
                  ★★★★★
                </div>
                <span className="text-sm text-gray-600">Programming Student</span>
              </div>
              <p className="text-sm text-gray-600">Fullstack Developer • Ghent, Belgium</p>
            </div>
  
            {/* Action buttons */}
            <div className="flex gap-2 mb-4">
              <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                <span>🌐</span>
                Portfolio
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                <span>📍</span>
                LinkedIn
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                <span>💾</span>
                GitHub
              </button>
            </div>
  
            {/* Contact info */}
            <div className="text-sm text-gray-600 space-y-2">
              <div>
                <span className="font-medium">Education:</span> Artevelde University College
              </div>
              <div>
                <span className="font-medium">Skills:</span> React, JavaScript, PHP, HTML, CSS
              </div>
              <div>
                <span className="font-medium">Location:</span> Ghent, Belgium
              </div>
              <div>
                <span className="font-medium">Age:</span> 22 years old
              </div>
            </div>
  
            {/* Additional info */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Programming student passionate about fullstack development and maintaining an active lifestyle.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SearchResults;