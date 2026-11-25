import { COURSES } from '../data/campus';

const BUILDINGS = [
  { name: 'MAIN BLOCK', x: 60, y: 60, w: 210, h: 120 },
  { name: 'LIBRARY BLOCK', x: 320, y: 45, w: 180, h: 100 },
  { name: 'SCIENCE BLOCK', x: 300, y: 195, w: 120, h: 95 },
  { name: 'CSE ANNEXE', x: 445, y: 195, w: 160, h: 110 },
  { name: 'DRAWING HALL', x: 60, y: 235, w: 175, h: 100 },
];

const TREES: [number, number, number][] = [
  [283, 205, 6],
  [430, 165, 7],
  [545, 60, 8],
  [35, 200, 7],
  [255, 300, 6],
  [560, 165, 6],
  [620, 295, 8],
  [40, 375, 6],
];

export default function CampusMap({ courseId, room }: { courseId: string; room: string }) {
  const course = COURSES.find((c) => c.id === courseId) ?? COURSES[0];
  const [doorX, doorY] = course.map.door;
  const [landX, landY] = course.map.landmarkAt;

  return (
    <div className="map-wrap">
      <svg
        className="campus-map"
        viewBox="0 0 640 420"
        role="img"
        aria-label={`Campus map from the north gate to ${room}, ${course.building}`}
      >
        <defs>
          <pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
          </pattern>
          <pattern id="maphatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeOpacity="0.16" strokeWidth="2" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="640" height="420" className="map-ground" />
        <rect x="0" y="0" width="640" height="420" fill="url(#mapgrid)" />

        <text x="175" y="400" textAnchor="middle" className="map-quad-label">
          THE QUAD
        </text>

        {TREES.map(([x, y, r], i) => (
          <g key={`tree-${i}`} className="map-tree">
            <circle cx={x} cy={y} r={r} />
            <circle cx={x - 2} cy={y - 2} r={r * 0.45} className="map-tree-light" />
          </g>
        ))}

        {BUILDINGS.map((b) => {
          const isTarget = b.name.toLowerCase() === course.building.toLowerCase();
          return (
            <g key={b.name} className={`map-building ${isTarget ? 'is-target' : ''}`}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="4" />
              {isTarget && <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="4" fill="url(#maphatch)" />}
              <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 4} textAnchor="middle" className="map-building-label">
                {b.name}
              </text>
            </g>
          );
        })}

        <g className="map-start">
          <circle cx="300" cy="384" r="16" className="map-start-pulse" />
          <circle cx="300" cy="384" r="7" />
          <text x="320" y="414" textAnchor="middle" className="map-pin-label">
            YOU ARE HERE · NORTH GATE
          </text>
        </g>

        <path d={course.map.path} className="route-casing" />
        <path d={course.map.path} className="route-dash" />

        <g className="map-landmark">
          <circle cx={landX} cy={landY} r="8" />
          <circle cx={landX} cy={landY} r="3" className="map-landmark-core" />
          <text x={landX} y={landY - 14} textAnchor="middle" className="map-pin-label">
            {course.map.landmarkShort}
          </text>
        </g>

        <g className="map-dest">
          <circle cx={doorX} cy={doorY} r="15" className="map-dest-halo" />
          <path
            d={`M${doorX} ${doorY + 4} c-8 -8 -10 -12 -10 -17 a10 10 0 0 1 20 0 c0 5 -2 9 -10 17 Z`}
            className="map-dest-pin"
          />
          <circle cx={doorX} cy={doorY - 13} r="3.4" className="map-dest-dot" />
          <g transform={`translate(${doorX + 20}, ${doorY - 26})`}>
            <rect x="0" y="0" width={room.length * 8.4 + 18} height="24" rx="12" className="map-dest-label-bg" />
            <text x={room.length * 4.2 + 9} y="16" textAnchor="middle" className="map-dest-label">
              {room}
            </text>
          </g>
        </g>

        <g className="map-compass">
          <path d="M600 40 l6 22 -6 -6 -6 6 Z" />
          <text x="600" y="30" textAnchor="middle">
            N
          </text>
        </g>

        <g className="map-scale">
          <line x1="520" y1="400" x2="588" y2="400" />
          <line x1="520" y1="396" x2="520" y2="404" />
          <line x1="588" y1="396" x2="588" y2="404" />
          <text x="554" y="392" textAnchor="middle">
            50 m
          </text>
        </g>
      </svg>
      <p className="map-caption">
        Route from the north gate · {course.walk} · {course.building}, {course.floor}
      </p>
    </div>
  );
}
