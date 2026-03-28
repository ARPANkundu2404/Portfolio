import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/* ─── SVG Architecture Skeleton ─────────────────────────────────────────────
   Renders the monochrome schematic diagram from project.skeleton data         */
function ArchSkeleton({ skeleton, mode }) {
  const isDark  = mode === 'dark-hw' || mode === 'dark-sw';
  const isHW    = mode.includes('hw');
  const bg      = isDark ? '#030603' : '#0A0F0A';
  const trace   = isHW   ? '#22FF6B' : '#22C55E';
  const traceB  = isHW   ? '#38BDF8' : '#3B82F6';

  // Build edge paths between nodes
  const getEdgePath = useCallback((fromNode, toNode) => {
    const fx = fromNode.x + fromNode.w;
    const fy = fromNode.y + 11;
    const tx = toNode.x;
    const ty = toNode.y + 11;
    const mx = (fx + tx) / 2;
    return `M${fx},${fy} C${mx},${fy} ${mx},${ty} ${tx},${ty}`;
  }, []);

  const nodeMap = {};
  skeleton.nodes.forEach(n => { nodeMap[n.id] = n; });

  return (
    <svg
      width="100%"
      height="200"
      viewBox="0 0 400 200"
      className="block"
      style={{ background: bg }}
    >
      <defs>
        <marker
          id={`arr-${skeleton.label}`}
          viewBox="0 0 10 10"
          refX="8" refY="5"
          markerWidth="5" markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M1 1 L8 5 L1 9" fill="none" stroke={trace} strokeWidth="1.5" />
        </marker>
        {/* Animated dash for HW mode */}
        <style>{`
          .sk-edge { stroke-dasharray: 6 3; animation: skTrace 1.5s linear infinite; }
          @keyframes skTrace { from { stroke-dashoffset: 18; } to { stroke-dashoffset: 0; } }
        `}</style>
      </defs>

      {/* Grid dots */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={30 + col * 32}
            cy={20 + row * 24}
            r="1"
            fill={trace}
            opacity="0.12"
          />
        ))
      )}

      {/* Edges */}
      {skeleton.edges.map((edge, i) => {
        const from = nodeMap[edge.from];
        const to   = nodeMap[edge.to];
        if (!from || !to) return null;
        return (
          <path
            key={i}
            d={getEdgePath(from, to)}
            fill="none"
            stroke={trace}
            strokeWidth="1.2"
            opacity="0.65"
            className={isHW ? 'sk-edge' : ''}
            markerEnd={`url(#arr-${skeleton.label})`}
          />
        );
      })}

      {/* Nodes */}
      {skeleton.nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height={22}
            rx="3"
            fill="none"
            stroke={trace}
            strokeWidth="1"
            opacity="0.8"
          />
          {/* Color dot */}
          <circle cx={node.x + 8} cy={node.y + 11} r="3" fill={node.color} opacity="0.85" />
          <text
            x={node.x + 16}
            y={node.y + 15}
            fontSize="8.5"
            fill={trace}
            fontFamily="'JetBrains Mono', monospace"
            opacity="0.9"
          >
            {node.label}
          </text>
        </g>
      ))}

      {/* Arch label */}
      <text
        x="200" y="188"
        textAnchor="middle"
        fontSize="8"
        fill={trace}
        fontFamily="'JetBrains Mono', monospace"
        opacity="0.4"
        letterSpacing="2"
      >
        {skeleton.label}
      </text>
    </svg>
  );
}

/* ─── Project UI Skin Mockups ────────────────────────────────────────────────
   Renders a high-fidelity UI preview based on project.id                     */
function ProjectSkin({ project, isDark }) {
  const { id, skin } = project;
  const bg = isDark ? skin.bg : skin.bgAlt;

  if (id === 'alor-shohor') {
    return (
      <div className="h-[200px] overflow-hidden relative" style={{ background: bg }}>
        {/* Browser chrome */}
        <div
          className="h-7 flex items-center px-3 gap-1.5 border-b"
          style={{ background: isDark ? '#111D11' : '#E8EDFF', borderColor: 'rgba(34,197,94,0.2)' }}
        >
          {['#EF4444','#F59E0B','#22C55E'].map(c => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
          ))}
          <div
            className="flex-1 h-4 rounded ml-2 text-[8px] flex items-center px-2"
            style={{ background: isDark ? '#1A2E1A' : '#DDE4FF', color: isDark ? '#4ADE80' : '#5B6FBE' }}
          >
            alor-shohor.render.com
          </div>
        </div>
        {/* App layout */}
        <div className="flex h-[calc(100%-28px)]">
          {/* Sidebar */}
          <div className="w-28 border-r p-2 flex flex-col gap-1" style={{ borderColor: 'rgba(34,197,94,0.15)', background: isDark ? '#0A110A' : '#F5F5FF' }}>
            <div className="text-[7px] font-mono px-1 mb-1" style={{ color: skin.accent, letterSpacing: '0.15em' }}>PANDALS</div>
            {['Shyambazar','Kumartuli','Bagbazar','Coll. Street'].map((n, i) => (
              <div
                key={n}
                className="px-1.5 py-1 rounded text-[7.5px] font-mono"
                style={{
                  background:  i === 1 ? `${skin.accent}22` : 'transparent',
                  color:       i === 1 ? skin.accent : isDark ? '#7AAF82' : '#6B8E6B',
                }}
              >{n}</div>
            ))}
          </div>
          {/* Map area */}
          <div className="flex-1 relative" style={{ background: isDark ? '#091409' : '#EDF0FF' }}>
            {[{x:28,y:38,c:'#22C55E'},{x:55,y:22,c:'#F59E0B'},{x:72,y:55,c:'#EF4444'},{x:42,y:68,c:'#22C55E'}].map((p,i) => (
              <div
                key={i}
                style={{
                  position:'absolute', left:`${p.x}%`, top:`${p.y}%`,
                  width:11, height:11, borderRadius:'50%',
                  background: p.c, boxShadow:`0 0 8px ${p.c}88`,
                  transform:'translate(-50%,-50%)',
                }}
              />
            ))}
            <div
              className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[7px] font-mono"
              style={{ background: isDark ? '#0D1A0D' : 'white', color: skin.accent, border: '1px solid rgba(34,197,94,0.3)' }}
            >
              LIVE MAP
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'smart-parking') {
    const occupied = [1, 3, 5, 7];
    return (
      <div className="h-[200px] p-3" style={{ background: bg }}>
        <div className="text-[7.5px] font-mono mb-2" style={{ color: skin.accent, letterSpacing: '0.2em' }}>PARKING GRID — LIVE</div>
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const occ = occupied.includes(i);
            return (
              <div
                key={i}
                className="h-7 rounded flex items-center justify-center text-[8px] font-mono"
                style={{
                  background: occ ? (isDark ? 'rgba(239,68,68,0.22)' : '#FECACA') : (isDark ? 'rgba(34,197,94,0.15)' : '#DCFCE7'),
                  border:     `1px solid ${occ ? '#EF444455' : '#22C55E55'}`,
                  color:      occ ? '#EF4444' : '#22C55E',
                }}
              >
                {occ ? '■' : `P${i+1}`}
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 mt-2">
          {[{ l: 'FREE', v: 6, c: '#22C55E' }, { l: 'OCC.', v: 4, c: '#EF4444' }, { l: 'ESP32', v: '●', c: skin.accent }].map(s => (
            <div
              key={s.l}
              className="flex-1 rounded p-1.5 text-center"
              style={{ background: isDark ? `${s.c}11` : '#F8FAFF', border: '1px solid rgba(34,197,94,0.15)' }}
            >
              <div className="text-[7px] font-mono mb-0.5" style={{ color: isDark ? '#5A7A5E' : '#888' }}>{s.l}</div>
              <div className="text-base font-bold font-mono" style={{ color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === 'taskflow') {
    return (
      <div className="h-[200px] p-3" style={{ background: bg }}>
        <div className="text-[7.5px] font-mono mb-2" style={{ color: skin.accent, letterSpacing: '0.2em' }}>TASKFLOW — KANBAN</div>
        <div className="grid grid-cols-3 gap-2 h-[calc(100%-20px)]">
          {['TO DO', 'IN PROGRESS', 'DONE'].map((col, ci) => (
            <div key={col}>
              <div className="text-[7px] font-mono mb-1.5" style={{ color: skin.accent, letterSpacing: '0.12em' }}>{col}</div>
              {[0, 1].map(j => (
                <div
                  key={j}
                  className="p-1.5 mb-1.5 rounded"
                  style={{
                    background: isDark ? 'rgba(34,197,94,0.06)' : 'rgba(0,0,0,0.04)',
                    border:     `0.5px solid ${isDark ? 'rgba(34,197,94,0.15)' : 'rgba(0,0,0,0.08)'}`,
                  }}
                >
                  <div
                    className="h-1 rounded mb-1"
                    style={{ background: isDark ? 'rgba(34,197,94,0.4)' : 'rgba(0,0,0,0.18)', width: `${55+ci*12+j*14}%` }}
                  />
                  <div
                    className="h-1 rounded"
                    style={{ background: isDark ? 'rgba(34,197,94,0.2)' : 'rgba(0,0,0,0.09)', width: '50%' }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === 'weather-iot') {
    return (
      <div className="h-[200px] p-3" style={{ background: bg }}>
        <div className="text-[7.5px] font-mono mb-2" style={{ color: skin.accent, letterSpacing: '0.2em' }}>WEATHER MONITOR</div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {[
            { label: 'TEMP', value: '28.4°C', icon: '🌡' },
            { label: 'HUMIDITY', value: '67%',  icon: '💧' },
          ].map(m => (
            <div
              key={m.label}
              className="rounded p-2"
              style={{ background: isDark ? `${skin.accent}11` : 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)' }}
            >
              <div className="text-[7px] font-mono mb-1" style={{ color: isDark ? '#7AA' : '#888' }}>{m.icon} {m.label}</div>
              <div className="text-xl font-mono font-bold" style={{ color: skin.accent }}>{m.value}</div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1 h-14 px-1">
          {[40,55,48,70,62,58,75,50,65,68].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{
                height: `${h}%`,
                background: `${skin.accent}${i === 9 ? 'FF' : '66'}`,
              }}
            />
          ))}
        </div>
        <div className="text-[7px] font-mono text-center mt-1" style={{ color: isDark ? '#4A6B6B' : '#888' }}>
          LAST 10 READINGS · ESP32
        </div>
      </div>
    );
  }

  return <div className="h-[200px]" style={{ background: bg }} />;
}

/* ─── Main XRayCard Component ────────────────────────────────────────────── */
export default function XRayCard({ project }) {
  const { themeKey, isHardware } = useTheme();
  const isDark = themeKey.startsWith('dark');
  const cardRef = useRef(null);

  // Mouse tracking for X-Ray lens
  const [lensPos,  setLensPos]  = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  // 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Update lens
    const lx = ((e.clientX - rect.left) / rect.width)  * 100;
    const ly = ((e.clientY - rect.top)  / rect.height) * 100;
    setLensPos({ x: lx, y: ly });

    // Update tilt
    const tx = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const ty = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    tiltX.set(ty);
    tiltY.set(tx);
  }, [tiltX, tiltY]);

  const handleMouseLeave = useCallback(() => {
    setHovering(false);
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  const lensRadius = hovering ? 90 : 0;
  const lensTransition = hovering
    ? { duration: 0.1 }
    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX:       springTiltX,
        rotateY:       springTiltY,
        transformStyle: 'preserve-3d',
        perspective:   '800px',
      }}
      className="card-base group will-change-transform"
    >
      {/* ── Layer 1: Project UI Skin ──────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <ProjectSkin project={project} isDark={isDark} />

        {/* ── Layer 2: Architecture Skeleton (revealed by lens) ─────── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            clipPath: `circle(${lensRadius}px at ${lensPos.x}% ${lensPos.y}%)`,
          }}
          transition={lensTransition}
        >
          <ArchSkeleton skeleton={project.skeleton} mode={themeKey} />
        </motion.div>

        {/* ── Lens ring indicator ───────────────────────────────────── */}
        {hovering && (
          <motion.div
            className="absolute pointer-events-none rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              width:       180,
              height:      180,
              left:        `${lensPos.x}%`,
              top:         `${lensPos.y}%`,
              transform:   'translate(-50%, -50%)',
              border:      '1.5px solid var(--color-accent)',
              boxShadow:   '0 0 16px var(--color-accent-glow)',
              transition:  'left 0.04s, top 0.04s',
            }}
          />
        )}

        {/* ── Hover hint badge ─────────────────────────────────────── */}
        <div
          className={`
            absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider
            transition-opacity duration-300
            ${hovering ? 'opacity-0' : 'opacity-100'}
          `}
          style={{
            background: 'var(--color-bg-card)',
            border:     '1px solid var(--color-border)',
            color:      'var(--color-accent)',
          }}
        >
          ◎ HOVER TO X-RAY
        </div>
      </div>

      {/* ── Card footer info ─────────────────────────────────────────── */}
      <div
        className="p-5"
        style={{
          background:  isDark
            ? 'color-mix(in srgb, var(--color-bg-card) 90%, transparent)'
            : 'var(--color-bg-card)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        {/* Type label */}
        <div className="section-label text-[9px] mb-1">
          {project.type}
        </div>

        {/* Title + subtitle */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-lg font-bold text-theme leading-tight">
              {project.title}
            </h3>
            <p className="text-xs text-theme-faint font-mono">{project.subtitle}</p>
          </div>
          {/* Links */}
          <div className="flex gap-2 shrink-0">
            {project.links?.map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono px-2 py-1 rounded border border-theme text-theme-muted hover:text-accent hover:border-accent transition-colors duration-200"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-theme-muted leading-relaxed mb-3">
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}