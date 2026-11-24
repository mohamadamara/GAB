"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * The GAB business model, built from the same pixels as "the GAB signal":
 * Idea (a loose cloud of pixels) → GAB (a ring of pixels that sorts them)
 * → Builders (a grid of studios) → Product (a pixel-art screen).
 * Pixel cubes carry the flow between each stage.
 */

const C = {
  coral: "#c6a052",
  deep: "#a84a32",
  light: "#e3c789",
  cream: "#f3ece0",
  warm: "#8a8680",
  grey: "#3c3c40",
  dark: "#2a2a2d",
  card: "#1c1c1e",
  screen: "#141416",
};

export const STAGE_X = [-4.8, -1.6, 1.6, 4.8];

type Vox = { p: [number, number, number]; c: string; ph: number };

/** One instanced mesh of cubes; `move` positions each cube every frame. */
function Voxels({
  items,
  size,
  move,
}: {
  items: Vox[];
  size: [number, number, number];
  move?: (t: number, v: Vox, i: number, o: THREE.Object3D) => void;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const col = useMemo(() => new THREE.Color(), []);

  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    items.forEach((v, i) => {
      dummy.position.set(...v.p);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      m.setColorAt(i, col.set(v.c));
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [items, dummy, col]);

  useFrame((s) => {
    const m = mesh.current;
    if (!m || !move) return;
    const t = s.clock.elapsedTime;
    items.forEach((v, i) => {
      dummy.position.set(...v.p);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(1);
      move(t, v, i, dummy);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, items.length]}>
      <boxGeometry args={size} />
      <meshStandardMaterial roughness={0.85} metalness={0} />
    </instancedMesh>
  );
}

const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)];

/** Idea: an unformed cloud of pixels, breathing. */
function Idea({ x }: { x: number }) {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(() => {
    const out: Vox[] = [];
    const step = 0.22;
    for (let i = -4; i <= 4; i++)
      for (let j = -4; j <= 4; j++)
        for (let k = -4; k <= 4; k++) {
          const d = Math.hypot(i, j, k) * step;
          if (d > 0.82 || Math.random() > 0.42 - d * 0.18) continue;
          out.push({
            p: [i * step, j * step, k * step],
            c: pick([C.cream, C.cream, C.warm, C.grey, C.coral]),
            ph: Math.random() * Math.PI * 2,
          });
        }
    return out;
  }, []);
  useFrame((s, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.3;
    group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.3) * 0.25;
    group.current.position.y = Math.sin(s.clock.elapsedTime * 0.9) * 0.1;
  });
  return (
    <group position={[x, 0, 0]}>
      <group ref={group}>
        <Voxels
          items={items}
          size={[0.15, 0.15, 0.15]}
          move={(t, v, _i, o) => {
            const b = 1 + Math.sin(t * 1.4 + v.ph) * 0.12;
            o.position.set(v.p[0] * b, v.p[1] * b, v.p[2] * b);
            o.scale.setScalar(0.75 + 0.25 * Math.sin(t * 2 + v.ph));
          }}
        />
      </group>
    </group>
  );
}

/** GAB: two counter-rotating rings of pixels around a coral core. */
function Hub({ x }: { x: number }) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const ring = (n: number, r: number, colours: string[]) =>
    Array.from({ length: n }, (_, i): Vox => {
      const a = (i / n) * Math.PI * 2;
      return { p: [Math.cos(a) * r, Math.sin(a) * r, 0], c: colours[i % colours.length], ph: a };
    });
  const outerItems = useMemo(() => ring(28, 0.95, [C.coral, C.coral, C.deep]), []);
  const innerItems = useMemo(() => ring(14, 0.55, [C.cream, C.warm]), []);
  const core = useMemo(() => {
    const out: Vox[] = [];
    for (const i of [-1, 1]) for (const j of [-1, 1]) for (const k of [-1, 1])
      out.push({ p: [i * 0.085, j * 0.085, k * 0.085], c: i + j + k > 0 ? C.light : C.coral, ph: 0 });
    return out;
  }, []);
  useFrame((s, dt) => {
    const t = s.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.x = Math.sin(t * 0.4) * 0.35 + 0.4;
      outer.current.rotation.y += dt * 0.5;
    }
    if (inner.current) {
      inner.current.rotation.y -= dt * 0.8;
      inner.current.rotation.z += dt * 0.3;
    }
  });
  return (
    <group position={[x, 0, 0]}>
      <group ref={outer}>
        <Voxels
          items={outerItems}
          size={[0.16, 0.16, 0.16]}
          move={(t, v, _i, o) => {
            o.rotation.z = v.ph;
            o.scale.setScalar(0.8 + 0.25 * Math.max(0, Math.sin(t * 3 - v.ph * 2)));
          }}
        />
      </group>
      <group ref={inner}>
        <Voxels items={innerItems} size={[0.1, 0.1, 0.1]} move={(_t, v, _i, o) => (o.rotation.z = v.ph)} />
      </group>
      <Voxels
        items={core}
        size={[0.15, 0.15, 0.15]}
        move={(t, v, _i, o) => {
          const b = 1 + Math.sin(t * 2.2) * 0.25;
          o.position.set(v.p[0] * b, v.p[1] * b, v.p[2] * b);
        }}
      />
    </group>
  );
}

/** Builders: a grid of studios, one lit up as the match. */
function Builders({ x }: { x: number }) {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(() => {
    const out: Vox[] = [];
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        out.push({ p: [(i - 1) * 0.5, (j - 1) * 0.5, 0], c: i === 2 && j === 1 ? C.coral : j === 2 ? C.grey : C.dark, ph: i * 0.7 + j * 1.3 });
    return out;
  }, []);
  useFrame((s) => {
    if (group.current) group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.35) * 0.45 - 0.2;
  });
  return (
    <group ref={group} position={[x, 0, 0]} rotation={[0.25, 0, 0]}>
      <Voxels
        items={items}
        size={[0.38, 0.38, 0.38]}
        move={(t, v, _i, o) => {
          o.position.z = Math.sin(t * 1.2 + v.ph) * 0.12 + (v.c === C.coral ? 0.24 : 0);
        }}
      />
    </group>
  );
}

/** Product: a finished screen drawn in pixel tiles. */
function Product({ x }: { x: number }) {
  const ref = useRef<THREE.Group>(null);
  const COLS = 14;
  const ROWS = 9;
  const PITCH = 0.142;
  const items = useMemo(() => {
    const bars = [2, 4, 3, 5, 4, 7, 6, 5];
    const out: Vox[] = [];
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        let col = C.screen;
        if (r === 0) col = c === 0 ? C.coral : c < 3 ? "#5c5c61" : C.dark;
        else if (c < 4) col = r === 2 && c > 0 && c < 3 ? C.coral : (r === 4 || r === 5 || r === 6) && c > 0 && c < 3 ? "#5c5c61" : C.card;
        else if (r === 1 && c > 4 && c < 10) col = C.grey;
        else if (c > 4 && c < 13 && ROWS - r <= bars[c - 5]) col = bars[c - 5] === 7 ? C.coral : "#6b3c2f";
        out.push({
          p: [(c - (COLS - 1) / 2) * PITCH, ((ROWS - 1) / 2 - r) * PITCH, 0],
          c: col,
          ph: c * 0.45 + r * 0.2,
        });
      }
    return out;
  }, []);
  const base = useMemo(
    () => Array.from({ length: COLS }, (_, c): Vox => ({ p: [(c - (COLS - 1) / 2) * PITCH, -0.78, 0], c: c % 3 === 0 ? C.coral : C.deep, ph: c })),
    [],
  );
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    ref.current.rotation.y = -0.45 + Math.sin(t * 0.5) * 0.12;
    ref.current.position.y = Math.sin(t * 0.8 + 1) * 0.08;
  });
  return (
    <group ref={ref} position={[x, 0, 0]} rotation={[0.08, -0.45, 0]}>
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[COLS * PITCH + 0.12, ROWS * PITCH + 0.12, 0.05]} />
        <meshStandardMaterial color={C.card} roughness={0.85} />
      </mesh>
      <Voxels
        items={items}
        size={[0.125, 0.125, 0.04]}
        move={(t, v, _i, o) => {
          const lit = v.c !== C.screen && v.c !== C.card;
          o.position.z = lit ? 0.03 + Math.max(0, Math.sin(t * 1.6 - v.ph)) * 0.05 : 0;
        }}
      />
      <Voxels
        items={base}
        size={[0.125, 0.05, 0.08]}
      />
    </group>
  );
}

/** Pixel cubes travelling along the path between stages. */
function Flow() {
  const curve = useMemo(() => {
    const pts = [
      new THREE.Vector3(STAGE_X[0] + 0.9, 0, 0),
      new THREE.Vector3((STAGE_X[0] + STAGE_X[1]) / 2, 0.45, 0.3),
      new THREE.Vector3(STAGE_X[1] - 1.1, 0, 0),
      new THREE.Vector3(STAGE_X[1], 0, 0.6),
      new THREE.Vector3(STAGE_X[1] + 1.1, 0, 0),
      new THREE.Vector3((STAGE_X[1] + STAGE_X[2]) / 2, -0.45, 0.3),
      new THREE.Vector3(STAGE_X[2] - 0.9, 0, 0),
      new THREE.Vector3(STAGE_X[2], 0.1, 0.7),
      new THREE.Vector3(STAGE_X[2] + 0.9, 0, 0),
      new THREE.Vector3((STAGE_X[2] + STAGE_X[3]) / 2, 0.4, 0.3),
      new THREE.Vector3(STAGE_X[3] - 1.05, 0, 0),
    ];
    return new THREE.CatmullRomCurve3(pts, false, "centripetal");
  }, []);
  // a dotted trail of tiny pixels instead of a solid line
  const trail = useMemo(
    () =>
      Array.from({ length: 140 }, (_, i): Vox => {
        const p = curve.getPointAt(i / 139);
        return { p: [p.x, p.y, p.z], c: C.grey, ph: i };
      }),
    [curve],
  );
  const packets = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i): Vox => ({
        p: [0, 0, 0],
        c: i % 4 === 0 ? C.cream : i % 3 === 0 ? C.deep : C.coral,
        ph: i / 60,
      })),
    [],
  );
  const p = useMemo(() => new THREE.Vector3(), []);
  return (
    <>
      <Voxels items={trail} size={[0.025, 0.025, 0.025]} />
      <Voxels
        items={packets}
        size={[0.07, 0.07, 0.07]}
        move={(t, v, i, o) => {
          const u = (v.ph + t * (0.035 + (i % 5) * 0.006)) % 1;
          curve.getPointAt(u, p);
          const j = (i % 7) / 7;
          o.position.set(p.x, p.y + Math.sin(t * 2 + j * 6) * 0.05, p.z + (j - 0.5) * 0.25);
          o.rotation.set(t + i, t * 0.7 + i, 0);
          o.scale.setScalar(0.5 + Math.sin(u * Math.PI) * 0.8);
        }}
      />
    </>
  );
}

function Rig({ compact }: { compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  useEffect(() => {
    // Fit the full pipeline into view at any aspect ratio.
    const persp = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    const halfWidth = 6.4;
    const dist = halfWidth / (Math.tan(THREE.MathUtils.degToRad(persp.fov / 2)) * aspect);
    persp.position.set(0, compact ? 0.4 : 0.9, Math.max(8.5, dist));
    persp.lookAt(0, 0, 0);
    persp.updateProjectionMatrix();
  }, [camera, size, compact]);
  useFrame((s) => {
    if (!group.current) return;
    const tx = s.pointer.y * -0.08;
    const ty = s.pointer.x * 0.16;
    group.current.rotation.x += (tx - group.current.rotation.x) * 0.04;
    group.current.rotation.y += (ty - group.current.rotation.y) * 0.04;
  });
  return (
    <group ref={group}>
      <Idea x={STAGE_X[0]} />
      <Hub x={STAGE_X[1]} />
      <Builders x={STAGE_X[2]} />
      <Product x={STAGE_X[3]} />
      <Flow />
    </group>
  );
}

export default function HeroScene({ compact = false }: { compact?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ fov: 32, near: 0.1, far: 100, position: [0, 0.9, 12] }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
        }}
        aria-hidden
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} color={"#ffffff"} />
        <directionalLight position={[-6, -2, -4]} intensity={0.6} color={C.coral} />
        <Rig compact={compact} />
      </Canvas>
    </div>
  );
}
