"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * The GAB business model, as one scene:
 * Idea (raw, faceted) → GAB (the copper hub) → Builders (a grid of studios) → Product (a finished screen).
 * Coral particles carry the flow between each stage.
 */

const HUB_GOLD = new THREE.Color("#f08a6c");
const PAPER = new THREE.Color("#f3ece0"); // cream
const GOLD = new THREE.Color("#f08a6c");

export const STAGE_X = [-4.8, -1.6, 1.6, 4.8];

function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      env.dispose();
      pmrem.dispose();
      scene.environment = null;
    };
  }, [gl, scene]);
  return null;
}

function Idea({ x }: { x: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.35;
    ref.current.rotation.x += dt * 0.12;
    ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.9) * 0.12;
  });
  return (
    <group position={[x, 0, 0]}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.78, 0]} />
        <meshStandardMaterial color={PAPER} roughness={0.35} metalness={0.05} flatShading />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.05, 1.07, 64]} />
        <meshBasicMaterial color={"#f3ece0"} transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Hub({ x }: { x: number }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((s, dt) => {
    if (outer.current) {
      outer.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.4) * 0.35 + 0.4;
      outer.current.rotation.y += dt * 0.5;
    }
    if (inner.current) {
      inner.current.rotation.y -= dt * 0.8;
      inner.current.rotation.z += dt * 0.3;
    }
  });
  return (
    <group position={[x, 0, 0]}>
      <mesh ref={outer}>
        <torusGeometry args={[0.95, 0.13, 48, 128]} />
        <meshStandardMaterial color={HUB_GOLD} metalness={1} roughness={0.22} />
      </mesh>
      <mesh ref={inner}>
        <torusGeometry args={[0.55, 0.05, 24, 96]} />
        <meshStandardMaterial color={"#f08a6c"} metalness={1} roughness={0.3} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 48, 48]} />
        <meshStandardMaterial color={"#f6b39d"} metalness={0.9} roughness={0.12} emissive={HUB_GOLD} emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

function Builders({ x }: { x: number }) {
  const group = useRef<THREE.Group>(null);
  const cells = useMemo(() => {
    const out: { p: [number, number, number]; phase: number; lit: boolean }[] = [];
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        out.push({ p: [(i - 1) * 0.55, (j - 1) * 0.55, 0], phase: i * 0.7 + j * 1.3, lit: i === 2 && j === 1 });
    return out;
  }, []);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.35) * 0.45 - 0.2;
    refs.current.forEach((m, k) => {
      if (!m) return;
      m.position.z = Math.sin(t * 1.2 + cells[k].phase) * 0.12 + (cells[k].lit ? 0.22 : 0);
    });
  });
  return (
    <group ref={group} position={[x, 0, 0]} rotation={[0.25, 0, 0]}>
      {cells.map((c, k) => (
        <mesh key={k} position={c.p} ref={(m) => { refs.current[k] = m; }}>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          {c.lit ? (
            <meshStandardMaterial color={GOLD} metalness={0.35} roughness={0.3} />
          ) : (
            <meshStandardMaterial color={"#2a2a2e"} metalness={0.3} roughness={0.4} />
          )}
        </mesh>
      ))}
    </group>
  );
}

function makeScreenTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 340;
  const g = c.getContext("2d")!;
  g.fillStyle = "#141416";
  g.fillRect(0, 0, 512, 340);
  g.fillStyle = "#2a2a2d";
  g.fillRect(0, 0, 512, 40);
  ["#f08a6c", "#5c5c61", "#5c5c61"].forEach((col, i) => {
    g.fillStyle = col;
    g.beginPath();
    g.arc(22 + i * 18, 20, 5, 0, Math.PI * 2);
    g.fill();
  });
  g.fillStyle = "#1c1c1e";
  g.fillRect(20, 60, 130, 260);
  g.fillStyle = "#f08a6c";
  g.fillRect(34, 78, 80, 10);
  g.fillStyle = "#5c5c61";
  for (let i = 0; i < 6; i++) g.fillRect(34, 104 + i * 22, 96 - (i % 3) * 18, 8);
  g.fillStyle = "#2a2a2d";
  g.fillRect(170, 60, 200, 14);
  g.fillStyle = "#3c3c40";
  g.fillRect(170, 84, 140, 8);
  const bars = [60, 95, 75, 130, 110, 160, 140];
  bars.forEach((h, i) => {
    g.fillStyle = i === 5 ? "#f08a6c" : "#6b3c2f";
    g.fillRect(172 + i * 44, 300 - h, 28, h);
  });
  g.strokeStyle = "#3c3c40";
  g.strokeRect(390, 60, 102, 102);
  g.fillStyle = "#f08a6c";
  g.beginPath();
  g.arc(441, 111, 32, -Math.PI / 2, Math.PI * 0.9);
  g.lineTo(441, 111);
  g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function Product({ x }: { x: number }) {
  const ref = useRef<THREE.Group>(null);
  const tex = useMemo(() => makeScreenTexture(), []);
  useEffect(() => () => tex.dispose(), [tex]);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    ref.current.rotation.y = -0.45 + Math.sin(t * 0.5) * 0.12;
    ref.current.position.y = Math.sin(t * 0.8 + 1) * 0.08;
  });
  return (
    <group ref={ref} position={[x, 0, 0]} rotation={[0.08, -0.45, 0]}>
      <mesh>
        <boxGeometry args={[1.95, 1.32, 0.07]} />
        <meshStandardMaterial color={"#1c1c1e"} metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.037]}>
        <planeGeometry args={[1.85, 1.22]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.69, 0]}>
        <boxGeometry args={[1.95, 0.03, 0.09]} />
        <meshStandardMaterial color={GOLD} metalness={0.4} roughness={0.3} />
      </mesh>
    </group>
  );
}

/** Particles travelling along the connection paths between stages. */
function Flow() {
  const COUNT = 90;
  const mesh = useRef<THREE.InstancedMesh>(null);
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
  const line = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(240));
    const m = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.3 });
    return new THREE.Line(g, m);
  }, [curve]);
  useEffect(() => () => { line.geometry.dispose(); (line.material as THREE.Material).dispose(); }, [line]);
  const seeds = useMemo(() => Array.from({ length: COUNT }, (_, i) => ({ o: i / COUNT, s: 0.035 + (i % 5) * 0.006, j: (i % 7) / 7 })), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const p = useMemo(() => new THREE.Vector3(), []);
  useFrame((s) => {
    if (!mesh.current) return;
    const t = s.clock.elapsedTime;
    seeds.forEach((sd, i) => {
      const u = (sd.o + t * sd.s) % 1;
      curve.getPointAt(u, p);
      dummy.position.set(p.x, p.y + Math.sin(t * 2 + sd.j * 6) * 0.05, p.z + (sd.j - 0.5) * 0.25);
      const scale = 0.6 + Math.sin(u * Math.PI) * 0.6;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <primitive object={line} />
      <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial color={GOLD} toneMapped={false} />
      </instancedMesh>
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
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
        aria-hidden
      >
        <Environment />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} color={"#ffffff"} />
        <directionalLight position={[-6, -2, -4]} intensity={0.9} color={"#f08a6c"} />
        <pointLight position={[0, 0, 3]} intensity={3} distance={12} color={"#ffe5dc"} />
        <Rig compact={compact} />
      </Canvas>
    </div>
  );
}
