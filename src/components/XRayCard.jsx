import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useIsMobile } from "../hooks/animations";

/* ───────────────────────────────────────────────────────────────────────────
   COLOR / STYLE HELPERS
   ─────────────────────────────────────────────────────────────────────────── */

function resolveColor(value, { isDark, skin, bg }) {
  if (!value) return "transparent";

  const colors = {
    accent: skin.accent,
    bg,
    panel: isDark ? "#101810" : "#F8FAFF",
    panelSoft: isDark
      ? "rgba(34,197,94,0.06)"
      : "rgba(0,0,0,0.035)",
    border: isDark
      ? "rgba(34,197,94,0.18)"
      : "rgba(0,0,0,0.10)",
    text: isDark ? "#D1E7D3" : "#374151",
    muted: isDark ? "#6B806E" : "#777777",
    green: "#22C55E",
    red: "#EF4444",
    blue: "#38BDF8",
    yellow: "#F59E0B",
    orange: "#F97316",
    purple: "#8B5CF6",
    white: "#FFFFFF",
    black: "#000000",
  };

  return colors[value] ?? value;
}

/* ───────────────────────────────────────────────────────────────────────────
   GENERIC PROJECT VISUAL
   ───────────────────────────────────────────────────────────────────────────

   IMPORTANT:

   This component knows NOTHING about:
   - project IDs
   - project names
   - specific projects
   - hardware projects
   - software projects

   It only understands generic visual primitives supplied by portfolio.js.
*/

function ProjectVisual({ visual, isDark, skin }) {
  const bg = isDark ? skin.bg : skin.bgAlt;

  if (!visual) {
    return (
      <div
        className="h-[200px]"
        style={{ background: bg }}
      />
    );
  }

  const resolve = (value) =>
    resolveColor(value, {
      isDark,
      skin,
      bg,
    });

  const elements = visual.elements ?? [];

  return (
    <svg
      width="100%"
      height="200"
      viewBox="0 0 400 200"
      className="block"
      style={{
        background: bg,
      }}
    >
      <defs>
        <style>{`
          .visual-pulse {
            animation: visualPulse 1.8s ease-in-out infinite;
          }

          .visual-flow {
            stroke-dasharray: 6 4;
            animation: visualFlow 1.5s linear infinite;
          }

          @keyframes visualPulse {
            0%, 100% {
              opacity: 0.55;
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes visualFlow {
            from {
              stroke-dashoffset: 20;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </defs>

      {/* ── Background grid ───────────────────────────────────────────── */}
      {visual.grid && (
        <>
          {Array.from({
            length: visual.grid.rows,
          }).map((_, row) =>
            Array.from({
              length: visual.grid.columns,
            }).map((_, column) => (
              <circle
                key={`grid-${row}-${column}`}
                cx={
                  visual.grid.startX +
                  column * visual.grid.gapX
                }
                cy={
                  visual.grid.startY +
                  row * visual.grid.gapY
                }
                r={visual.grid.radius ?? 1}
                fill={resolve(
                  visual.grid.color ?? "accent",
                )}
                opacity={
                  visual.grid.opacity ?? 0.12
                }
              />
            )),
          )}
        </>
      )}

      {/* ── Visual elements ──────────────────────────────────────────── */}
      {elements.map((element, index) => {
        const key = `${element.type}-${index}`;

        /* TEXT */
        if (element.type === "text") {
          return (
            <text
              key={key}
              x={element.x}
              y={element.y}
              textAnchor={
                element.anchor ?? "start"
              }
              fontSize={element.size ?? 8}
              fontWeight={
                element.weight ?? "normal"
              }
              fill={resolve(
                element.color ?? "text",
              )}
              fontFamily={
                element.fontFamily ??
                "'JetBrains Mono', monospace"
              }
              opacity={element.opacity ?? 1}
              letterSpacing={
                element.letterSpacing ?? 0
              }
            >
              {element.value}
            </text>
          );
        }

        /* RECTANGLE */
        if (element.type === "rect") {
          return (
            <rect
              key={key}
              x={element.x}
              y={element.y}
              width={element.width}
              height={element.height}
              rx={element.radius ?? 0}
              fill={resolve(
                element.fill ?? "transparent",
              )}
              stroke={
                element.stroke
                  ? resolve(element.stroke)
                  : "none"
              }
              strokeWidth={
                element.strokeWidth ?? 0
              }
              opacity={element.opacity ?? 1}
              className={
                element.animate
                  ? "visual-pulse"
                  : ""
              }
            />
          );
        }

        /* CIRCLE */
        if (element.type === "circle") {
          return (
            <circle
              key={key}
              cx={element.x}
              cy={element.y}
              r={element.radius ?? 5}
              fill={resolve(
                element.fill ?? "accent",
              )}
              stroke={
                element.stroke
                  ? resolve(element.stroke)
                  : "none"
              }
              strokeWidth={
                element.strokeWidth ?? 0
              }
              opacity={element.opacity ?? 1}
              className={
                element.animate
                  ? "visual-pulse"
                  : ""
              }
            />
          );
        }

        /* LINE */
        if (element.type === "line") {
          return (
            <line
              key={key}
              x1={element.x1}
              y1={element.y1}
              x2={element.x2}
              y2={element.y2}
              stroke={resolve(
                element.color ?? "accent",
              )}
              strokeWidth={
                element.width ?? 1
              }
              opacity={element.opacity ?? 1}
              className={
                element.animate
                  ? "visual-flow"
                  : ""
              }
            />
          );
        }

        /* BAR */
        if (element.type === "bar") {
          return (
            <rect
              key={key}
              x={element.x}
              y={
                element.y +
                element.height -
                element.value
              }
              width={element.width}
              height={element.value}
              rx={element.radius ?? 1}
              fill={resolve(
                element.color ?? "accent",
              )}
              opacity={
                element.opacity ?? 0.7
              }
            />
          );
        }

        /* PILL */
        if (element.type === "pill") {
          return (
            <g key={key}>
              <rect
                x={element.x}
                y={element.y}
                width={element.width}
                height={element.height}
                rx={element.height / 2}
                fill={resolve(
                  element.fill ?? "panel",
                )}
                stroke={resolve(
                  element.border ?? "border",
                )}
                strokeWidth={
                  element.borderWidth ?? 0.8
                }
              />

              <text
                x={
                  element.x +
                  element.width / 2
                }
                y={
                  element.y +
                  element.height / 2 +
                  (element.textOffset ?? 2.5)
                }
                textAnchor="middle"
                fontSize={
                  element.size ?? 6
                }
                fontFamily="'JetBrains Mono', monospace"
                fill={resolve(
                  element.color ?? "text",
                )}
              >
                {element.value}
              </text>
            </g>
          );
        }

        /* GRID */
        if (element.type === "grid") {
          const {
            columns = 5,
            rows = 2,
            cellWidth = 40,
            cellHeight = 22,
            gap = 4,
            occupied = [],
          } = element;

          return (
            <g key={key}>
              {Array.from({
                length: rows * columns,
              }).map((_, cellIndex) => {
                const column =
                  cellIndex % columns;
                const row = Math.floor(
                  cellIndex / columns,
                );

                const x =
                  element.x +
                  column *
                    (cellWidth + gap);

                const y =
                  element.y +
                  row *
                    (cellHeight + gap);

                const isOccupied =
                  occupied.includes(
                    cellIndex,
                  );

                return (
                  <g key={cellIndex}>
                    <rect
                      x={x}
                      y={y}
                      width={cellWidth}
                      height={cellHeight}
                      rx={element.radius ?? 3}
                      fill={resolve(
                        isOccupied
                          ? element.occupiedFill ??
                              "red"
                          : element.freeFill ??
                              "panelSoft",
                      )}
                      stroke={resolve(
                        isOccupied
                          ? element.occupiedBorder ??
                              "red"
                          : element.freeBorder ??
                              "green",
                      )}
                      strokeWidth={0.8}
                    />

                    <text
                      x={
                        x +
                        cellWidth / 2
                      }
                      y={
                        y +
                        cellHeight / 2 +
                        3
                      }
                      textAnchor="middle"
                      fontSize={
                        element.textSize ??
                        6
                      }
                      fontFamily="'JetBrains Mono', monospace"
                      fill={resolve(
                        isOccupied
                          ? element.occupiedText ??
                              "red"
                          : element.freeText ??
                              "green",
                      )}
                    >
                      {isOccupied
                        ? element.occupiedLabel ??
                          "■"
                        : `${element.freeLabel ?? "P"}${cellIndex + 1}`}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        }

        return null;
      })}

      {/* ── Optional visual label ────────────────────────────────────── */}
      {visual.label && (
        <text
          x={visual.label.x ?? 200}
          y={visual.label.y ?? 190}
          textAnchor={
            visual.label.anchor ?? "middle"
          }
          fontSize={
            visual.label.size ?? 7
          }
          fill={resolve(
            visual.label.color ?? "muted",
          )}
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing={
            visual.label.letterSpacing ?? 1.5
          }
          opacity={
            visual.label.opacity ?? 0.7
          }
        >
          {visual.label.value}
        </text>
      )}
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   GENERIC X-RAY ARCHITECTURE
   ─────────────────────────────────────────────────────────────────────────── */

function ArchSkeleton({ skeleton, mode }) {
  const isDark =
    mode === "dark-hw" ||
    mode === "dark-sw";

  const isHW = mode.includes("hw");

  const bg = isDark
    ? "#030603"
    : "#0A0F0A";

  const trace = isHW
    ? "#22FF6B"
    : "#22C55E";

  const getEdgePath = useCallback(
    (fromNode, toNode) => {
      const fx =
        fromNode.x + fromNode.w;

      const fy =
        fromNode.y + 11;

      const tx = toNode.x;
      const ty =
        toNode.y + 11;

      const mx = (fx + tx) / 2;

      return `M${fx},${fy} C${mx},${fy} ${mx},${ty} ${tx},${ty}`;
    },
    [],
  );

  const nodeMap = {};

  skeleton.nodes.forEach((node) => {
    nodeMap[node.id] = node;
  });

  return (
    <svg
      width="100%"
      height="200"
      viewBox="0 0 400 200"
      className="block"
      style={{
        background: bg,
      }}
    >
      <defs>
        <marker
          id={`arr-${skeleton.label}`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path
            d="M1 1 L8 5 L1 9"
            fill="none"
            stroke={trace}
            strokeWidth="1.5"
          />
        </marker>

        <style>{`
          .sk-edge {
            stroke-dasharray: 6 3;
            animation: skTrace 1.5s linear infinite;
          }

          @keyframes skTrace {
            from {
              stroke-dashoffset: 18;
            }

            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </defs>

      {/* Grid */}
      {Array.from({
        length: 8,
      }).map((_, row) =>
        Array.from({
          length: 12,
        }).map((_, column) => (
          <circle
            key={`${row}-${column}`}
            cx={30 + column * 32}
            cy={20 + row * 24}
            r="1"
            fill={trace}
            opacity="0.12"
          />
        )),
      )}

      {/* Connections */}
      {skeleton.edges.map(
        (edge, index) => {
          const from =
            nodeMap[edge.from];

          const to =
            nodeMap[edge.to];

          if (!from || !to) {
            return null;
          }

          return (
            <path
              key={index}
              d={getEdgePath(
                from,
                to,
              )}
              fill="none"
              stroke={trace}
              strokeWidth="1.2"
              opacity="0.65"
              className={
                isHW
                  ? "sk-edge"
                  : ""
              }
              markerEnd={`url(#arr-${skeleton.label})`}
            />
          );
        },
      )}

      {/* Nodes */}
      {skeleton.nodes.map(
        (node) => (
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

            <circle
              cx={
                node.x + 8
              }
              cy={
                node.y + 11
              }
              r="3"
              fill={node.color}
              opacity="0.85"
            />

            <text
              x={
                node.x + 16
              }
              y={
                node.y + 15
              }
              fontSize="8.5"
              fill={trace}
              fontFamily="'JetBrains Mono', monospace"
              opacity="0.9"
            >
              {node.label}
            </text>
          </g>
        ),
      )}

      {/* Architecture label */}
      <text
        x="200"
        y="188"
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

/* ───────────────────────────────────────────────────────────────────────────
   MAIN XRAY CARD
   ─────────────────────────────────────────────────────────────────────────── */

export default function XRayCard({ project }) {
  const { themeKey } = useTheme();

  const isDark =
    themeKey.startsWith("dark");

  const cardRef = useRef(null);

  const isMobile =
    useIsMobile();

  const [flipped, setFlipped] =
    useState(false);

  const [lensPos, setLensPos] =
    useState({
      x: 50,
      y: 50,
    });

  const [hovering, setHovering] =
    useState(false);

  const tiltX =
    useMotionValue(0);

  const tiltY =
    useMotionValue(0);

  const springTiltX =
    useSpring(tiltX, {
      stiffness: 200,
      damping: 20,
    });

  const springTiltY =
    useSpring(tiltY, {
      stiffness: 200,
      damping: 20,
    });

  const handleMouseMove =
    useCallback(
      (event) => {
        const rect =
          cardRef.current?.getBoundingClientRect();

        if (!rect) return;

        const lx =
          ((event.clientX -
            rect.left) /
            rect.width) *
          100;

        const ly =
          ((event.clientY -
            rect.top) /
            rect.height) *
          100;

        setLensPos({
          x: lx,
          y: ly,
        });

        const tx =
          ((event.clientX -
            rect.left) /
            rect.width -
            0.5) *
          14;

        const ty =
          ((event.clientY -
            rect.top) /
            rect.height -
            0.5) *
          -10;

        tiltX.set(ty);
        tiltY.set(tx);
      },
      [tiltX, tiltY],
    );

  const handleMouseLeave =
    useCallback(() => {
      setHovering(false);
      tiltX.set(0);
      tiltY.set(0);
    }, [tiltX, tiltY]);

  const lensRadius =
    hovering ? 90 : 0;

  const lensTransition =
    hovering
      ? { duration: 0.1 }
      : {
          duration: 0.4,
          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        };

  return (
    <motion.div
      ref={cardRef}
      onClick={() => {
        if (isMobile) {
          setFlipped(
            (previous) =>
              !previous,
          );
        }
      }}
      onMouseMove={
        !isMobile
          ? handleMouseMove
          : undefined
      }
      onMouseEnter={
        !isMobile
          ? () =>
              setHovering(true)
          : undefined
      }
      onMouseLeave={
        !isMobile
          ? handleMouseLeave
          : undefined
      }
      style={{
        rotateX: !isMobile
          ? springTiltX
          : 0,

        rotateY: !isMobile
          ? springTiltY
          : undefined,
      }}
      className="card-base group will-change-transform"
    >
      {/* ── PREVIEW ──────────────────────────────────────────────────── */}
      <div className="relative h-[200px] perspective-1000 overflow-hidden">
        <motion.div
          animate={{
            rotateY:
              isMobile &&
              flipped
                ? 180
                : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 18,
          }}
          style={{
            transformStyle:
              "preserve-3d",
            width: "100%",
            height: "100%",
          }}
        >
          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden">
            <ProjectVisual
              visual={
                project.skin?.visual
              }
              isDark={isDark}
              skin={project.skin}
            />

            {/* X-Ray lens */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath: `circle(${lensRadius}px at ${lensPos.x}% ${lensPos.y}%)`,
                }}
                transition={
                  lensTransition
                }
              >
                <ArchSkeleton
                  skeleton={
                    project.skeleton
                  }
                  mode={themeKey}
                />
              </motion.div>
            )}

            {/* Lens ring */}
            {!isMobile &&
              hovering && (
                <motion.div
                  className="absolute pointer-events-none rounded-full"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  style={{
                    width: 180,
                    height: 180,
                    left: `${lensPos.x}%`,
                    top: `${lensPos.y}%`,
                    transform:
                      "translate(-50%, -50%)",
                    border:
                      "1.5px solid var(--color-accent)",
                    boxShadow:
                      "0 0 16px var(--color-accent-glow)",
                    transition:
                      "left 0.04s, top 0.04s",
                  }}
                />
              )}

            {/* Hover hint */}
            <div
              className={`
                absolute top-2 right-2
                px-2 py-0.5 rounded
                text-[9px] font-mono tracking-wider
                transition-opacity duration-300
                ${
                  hovering &&
                  !isMobile
                    ? "opacity-0"
                    : "opacity-100"
                }
              `}
              style={{
                background:
                  "var(--color-bg-card)",
                border:
                  "1px solid var(--color-border)",
                color:
                  "var(--color-accent)",
              }}
            >
              {isMobile
                ? "TAP TO VIEW ARCH"
                : "◎ HOVER TO X-RAY"}
            </div>
          </div>

          {/* MOBILE BACK */}
          {isMobile && (
            <div
              className="absolute inset-0 backface-hidden"
              style={{
                transform:
                  "rotateY(180deg)",
              }}
            >
              <ArchSkeleton
                skeleton={
                  project.skeleton
                }
                mode={themeKey}
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <div
        className="pointer-events-auto p-5"
        style={{
          background: isDark
            ? "color-mix(in srgb, var(--color-bg-card) 90%, transparent)"
            : "var(--color-bg-card)",
          borderTop:
            "1px solid var(--color-border)",
        }}
      >
        <div className="section-label text-[9px] mb-1">
          {project.type}
        </div>

        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-lg font-bold text-theme leading-tight">
              {project.title}
            </h3>

            <p className="text-xs text-theme-faint font-mono">
              {project.subtitle}
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            {project.links?.map(
              (link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    text-[10px] font-mono
                    px-2 py-1 rounded
                    border border-theme
                    text-theme-muted
                    hover:text-accent
                    hover:border-accent
                    transition-colors duration-200
                  "
                >
                  {link.label} ↗
                </a>
              ),
            )}
          </div>
        </div>

        <p className="text-xs text-theme-muted leading-relaxed mb-3">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(
            (tag) => (
              <span
                key={tag}
                className="tag"
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </div>
    </motion.div>
  );
}