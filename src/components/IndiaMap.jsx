import { useState } from 'react';
import India from '@svg-maps/india';

const IndiaMap = ({ activeStates = [] }) => {
  const [hoveredState, setHoveredState] = useState(null);

  // States not in activeStates will be gray
  // States in activeStates will be blue

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg 
        viewBox={India.viewBox} 
        className="w-full max-w-[500px] h-auto drop-shadow-xl" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {India.locations.map(location => {
            // Note: svg-maps ids are lowercase (e.g., 'up', 'dl')
            const isActive = activeStates.map(s => s.toLowerCase()).includes(location.id.toLowerCase());
            
            return (
              <path
                key={location.id}
                id={location.id}
                name={location.name}
                d={location.path}
                onMouseEnter={() => setHoveredState(location.name)}
                onMouseLeave={() => setHoveredState(null)}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'fill-blue-600 hover:fill-blue-500' 
                    : 'fill-slate-200 hover:fill-slate-300'
                } stroke-white stroke-[1px]`}
              />
            );
          })}
        </g>
      </svg>
      
      {/* Tooltip for hover */}
      {hoveredState && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-blue-900 border border-blue-100 px-4 py-2 rounded-xl shadow-lg font-semibold animate-in fade-in zoom-in duration-200 pointer-events-none">
          {hoveredState}
        </div>
      )}
    </div>
  );
};

export default IndiaMap;
