import { Project, BlogPost, SkillCategory } from '../types/portfolio';

// Local asset image imports with fallback support
import heroImg from '../assets/images/hero_cyber_developer_1790874969723.jpg';
import neuralImg from '../assets/images/cyber_project_neural_1790874983331.jpg';
import synthcityImg from '../assets/images/cyber_synthcity_1790875000464.jpg';
import cybereyeImg from '../assets/images/cyber_cybereye_1790875012513.jpg';
import blogCoverImg from '../assets/images/cyber_blog_cover_1790875024679.jpg';

export const DEVELOPER_PROFILE = {
  name: 'Raka Pratama',
  alias: 'Zero.Kaelen',
  title: 'Creative Technologist & Cybernetic Systems Architect',
  location: 'Neo Jakarta / Remote Mesh',
  availability: 'Terbuka untuk Kolaborasi & Kontrak Arsitektur',
  bio: 'Menggabungkan rekayasa antarmuka reaktif tingkat tinggi, grafika komputasi WebGL/Three.js, dan arsitektur sistem terdistribusi. Fokus membangun pengalaman digital berperforma ekstrem dengan estetika cyberpunk futuristik dan presisi matematis.',
  heroImage: heroImg,
  stats: [
    { label: 'Tahun Pengalaman', value: '7+' },
    { label: 'Proyek Deployed', value: '38+' },
    { label: 'Performa Lighthouse', value: '99' },
    { label: 'Latency Tol.', value: '<16ms' },
  ],
  socials: [
    { name: 'GitHub', url: 'https://github.com', handle: 'github.com/wikta-dev' },
    { name: 'LinkedIn', url: 'https://linkedin.com', handle: 'linkedin.com/in/raka-pratama' },
    { name: 'X / Twitter', url: 'https://twitter.com', handle: '@zero_kaelen' },
    { name: 'NeuralNet', url: '#', handle: 'mesh://0x7F91.kaelen' },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'synapse-os',
    title: 'Synapse Neural HUD',
    tagline: 'Sistem visualisasi data telemetri real-time berbasis WebGL & WebSockets',
    category: 'web-systems',
    categoryLabel: 'Web Systems',
    image: neuralImg,
    year: '2026',
    client: 'NeuroCore Labs',
    readTime: 'Case Study · 4 min',
    featured: true,
    description: 'Platform visualisasi telemetri sensorik bionik real-time yang memproses ribuan data stream dengan akselerasi GPU pada browser, menghadirkan antarmuka holografis 60 FPS tanpa jank.',
    challenge: 'Memproses streaming data biometrik lebih dari 45,000 telemetry datapoints per detik langsung di browser tanpa menghambat interaktivitas UI atau frame dropping.',
    solution: 'Mengimplementasikan offscreen canvas rendering dengan Web Workers, WebGL custom shaders untuk visualisasi node cluster, dan kompresi Protobuf melalui WebSocket berlatensi rendah.',
    tags: ['React', 'WebGL', 'TypeScript', 'WebSockets', 'Tailwind', 'GLSL'],
    stats: [
      { label: 'Throughput', value: '45k pts/s' },
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Payload Red.', value: '-72%' },
    ],
    liveUrl: 'https://example.com/demo/synapse',
    githubUrl: 'https://github.com/example/synapse-hud',
  },
  {
    id: 'neo-metropolis-3d',
    title: 'Neo-Metropolis Interactive Twin',
    tagline: 'Digital twin 3D kota nocturnal interaktif dengan simulasi lalu lintas data',
    category: 'cybernetics',
    categoryLabel: 'Cybernetics & 3D',
    image: synthcityImg,
    year: '2025',
    client: 'Aegis Urban Dynamics',
    readTime: 'Case Study · 5 min',
    featured: true,
    description: 'Peta 3D prosedural metropolis interaktif berarsitektur cyberpunk dengan sistem pencahayaan neon volumetrik, heatmapping energi kota, dan navigasi kamera spatial dinamis.',
    challenge: 'Membangun geometri kota kompleks ribuan bangunan modular dengan bloom effect neon realistis tanpa menurunkan performa pada perangkat mobile kelas menengah.',
    solution: 'Teknik InstancedMesh pada Three.js, Level-of-Detail (LOD) dinamis, custom post-processing selective bloom, dan shader occlussion culling efisien.',
    tags: ['Three.js', 'Vite', 'GLSL', 'Spatial Audio', 'React'],
    stats: [
      { label: 'Draw Calls', value: '<24' },
      { label: 'City Nodes', value: '12,400' },
      { label: 'Load Time', value: '1.2s' },
    ],
    liveUrl: 'https://example.com/demo/metropolis',
    githubUrl: 'https://github.com/example/neo-metropolis',
  },
  {
    id: 'cyber-optic-telemetry',
    title: 'OpticX Cybernetic AR Interface',
    tagline: 'Perangkat lunak pengendali wearable optik dengan visualisasi retina overlay',
    category: 'tools',
    categoryLabel: 'Tools & Mobile',
    image: cybereyeImg,
    year: '2025',
    client: 'Kurogane Bionics',
    readTime: 'Case Study · 3 min',
    featured: true,
    description: 'Companion app untuk kacamata AR bionik generasi mendatang dengan UI kontrol adaptif yang merespons pupil tracking dan gestures mikroskopis via low-energy bluetooth.',
    challenge: 'Menyediakan antarmuka kontras tinggi yang ramah kondisi pencahayaan ekstrem (terik siang dan gelap malam) dengan konsumsi baterai minimal.',
    solution: 'Palet high-contrast dark OLED mode, animasi berbasis transform hardware, dan engine state reactive mikro tanpa dependency berat.',
    tags: ['React Native / PWA', 'Bluetooth Web API', 'Tailwind', 'CSS Houdini'],
    stats: [
      { label: 'Battery Eff.', value: '+35%' },
      { label: 'Sync Latency', value: '8ms' },
      { label: 'Bundle Size', value: '64 kB' },
    ],
    liveUrl: 'https://example.com/demo/opticx',
    githubUrl: 'https://github.com/example/opticx-ar',
  },
  {
    id: 'crypta-mesh-engine',
    title: 'CryptaMesh P2P Protocol Node',
    tagline: 'Decentralized peer-to-peer telemetry protocol dashboard',
    category: 'web-systems',
    categoryLabel: 'Web Systems',
    image: neuralImg,
    year: '2025',
    client: 'Nexus Foundation',
    readTime: 'Case Study · 4 min',
    description: 'Dashboard observabilitas node terdesentralisasi untuk monitoring gossip protocol, konsensus blok, dan routing paket terenkripsi antar simpul jaringan.',
    challenge: 'Membuat visualisasi topologi mesh network yang berubah secara dinamis ketika ribuan peer terputus dan tersambung kembali.',
    solution: 'Algoritma Force-Directed D3.js yang di-offload ke WebGL shader, mengurangi beban komputasi CPU sebesar 80%.',
    tags: ['TypeScript', 'D3.js', 'WebRTC', 'Fastify', 'Docker'],
    stats: [
      { label: 'Active Peers', value: '8,200+' },
      { label: 'Sync Time', value: '<200ms' },
      { label: 'CPU Usage', value: '3.4%' },
    ],
    liveUrl: 'https://example.com/demo/cryptamesh',
    githubUrl: 'https://github.com/example/cryptamesh',
  },
  {
    id: 'synth-wave-sound-engine',
    title: 'CyberAudio Web Synthesizer',
    tagline: 'Virtual analog synthesizer & audio visualizer di web browser',
    category: 'creative-tech',
    categoryLabel: 'Creative Tech',
    image: blogCoverImg,
    year: '2024',
    client: 'AudioWave Collective',
    readTime: 'Case Study · 3 min',
    description: 'Instrumen audio digital berbasis Web Audio API lengkap dengan osilator polifonik, low-pass filter, sequencer 16-step, dan visualizer oscilloscope real-time.',
    challenge: 'Mencapai timing ritmis sequencer yang presisi tanpa terpengaruh oleh garbage collection JavaScript utama.',
    solution: 'AudioWorklet custom untuk pemrosesan sinyal langsung di audio thread terpisah yang tidak terblokir oleh rendering UI.',
    tags: ['Web Audio API', 'AudioWorklet', 'Canvas API', 'React'],
    stats: [
      { label: 'Audio Latency', value: '3.8ms' },
      { label: 'Polyphony', value: '16 Voices' },
      { label: 'FPS Visualizer', value: '60 FPS' },
    ],
    liveUrl: 'https://example.com/demo/cybersynth',
    githubUrl: 'https://github.com/example/cyber-synth',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'membangun-antarmuka-cyberpunk-webgl-glsl',
    title: 'Membangun Antarmuka Cyberpunk Berperforma 60 FPS dengan WebGL & GLSL Shaders',
    excerpt: 'Bagaimana merancang estetika futuristik bercahaya, scanlines optik, dan distorsi kromatik tanpa membakar daya baterai dan membebani rendering thread browser.',
    coverImage: blogCoverImg,
    publishedAt: '24 September 2026',
    readTime: '6 min baca',
    category: 'Creative Tech & Shaders',
    tags: ['WebGL', 'GLSL', 'Performance', 'Cyberpunk UI'],
    likes: 89,
    content: {
      lead: 'Estetika cyberpunk di web sering kali terperangkap dalam dua ekstrem: terlalu sederhana sehingga terlihat klise, atau terlalu berat hingga membekukan browser mobile dengan animasi DOM yang berlebihan.',
      sections: [
        {
          heading: '1. Mengapa DOM Animation Kurang Cocok untuk Efek Neon Volumetrik',
          body: [
            'Banyak developer mencoba membuat efek glow neon dengan berlapis-lapis CSS box-shadow dan blur filter. Pada layar resolusi tinggi (Retina/4K), compositing blur skala besar memicu GPU rasterization berulang di setiap frame.',
            'Solusi yang tepat adalah mendelegasikan efek volumetrik ke WebGL fragment shader menggunakan single render target quad. Dengan pendekatan ini, efek glow, scanlines, dan chromatic aberration dieksekusi dalam satu pass komputasi piksel paralel.',
          ],
          codeSnippet: {
            language: 'glsl',
            code: `// Fragment Shader: Chromatic Aberration & Scanlines
precision highp float;
uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_time;
varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;
  float offset = sin(u_time * 2.0 + uv.y * 10.0) * 0.002;
  
  float r = texture2D(u_texture, uv + vec2(offset, 0.0)).r;
  float g = texture2D(u_texture, uv).g;
  float b = texture2D(u_texture, uv - vec2(offset, 0.0)).b;
  
  float scanline = sin(uv.y * u_resolution.y * 1.5) * 0.04;
  vec3 color = vec3(r, g, b) - scanline;
  
  gl_FragColor = vec4(color, 1.0);
}`,
          },
          quote: 'Estetika digital bukan sekadar dekorasi visual; ia adalah harmonisasi antara gaya artistik dan efisiensi arsitektur mesin peramban.',
        },
        {
          heading: '2. Presisi Tipografi & Ergonomi Kontras Tinggi',
          body: [
            'Tema cyberpunk yang efektif membutuhkan keterbacaan yang tajam (WCAG AA). Menggunakan latar belakang pure black (#07080b) dipadukan dengan tipografi tabular untuk angka metrik dan aksen sian (#00f0ff) pada titik aksi interaktif utama.',
            'Hindari penggunaan warna terang mencolok pada teks paragraf panjang. Gunakan slate terang (#cbd5e1) dengan line-height 1.6 untuk kenyamanan membaca dalam sesi lama.',
          ],
        },
      ],
      conclusion: 'Dengan memadukan fragment shader yang efisien, tipografi yang berdisiplin, dan state management ringan, kita dapat menghadirkan nuansa sci-fi cyberpunk yang memukau tanpa mengorbankan aksesibilitas dan performa perangkat pengguna.',
    },
  },
  {
    id: 'post-2',
    slug: 'optimasi-web-audio-api-feedback-antarmuka',
    title: 'Sintesis Audio Prosedural di Web: Umpan Balik Taktil untuk Antarmuka Modern',
    excerpt: 'Eksplorasi penggunaan Web Audio API untuk menghasilkan suara bleeps, warp chirps, dan keyclicks sintetis langsung di browser tanpa mengunduh file MP3 eksternal.',
    coverImage: neuralImg,
    publishedAt: '12 September 2026',
    readTime: '5 min baca',
    category: 'Audio Engineering',
    tags: ['Web Audio API', 'Sound Design', 'UX Feedback'],
    likes: 64,
    content: {
      lead: 'Umpan balik audio mikro dapat mengubah situs web dari halaman pasif menjadi instrumen interaktif yang hidup. Dan bagian terbaiknya: kita tidak perlu mengunduh aset audio 10 MB yang memperlambat loading awal.',
      sections: [
        {
          heading: '1. Sintesis Suara Menggunakan OscillatorNode & Gain Envelope',
          body: [
            'Dengan menghubungkan OscillatorNode ke GainNode dalam Web Audio API, kita dapat memahat frekuensi nada dan volume envelope dalam hitungan milidetik. File footprint: 0 byte aset eksternal.',
            'Sebagai contoh, suara klik terminal futuristik dibuat dari gelombang square wave berfrekuensi tinggi (1400 Hz) yang dipadamkan dalam 30 milidetik menggunakan linearRampToValueAtTime.',
          ],
          codeSnippet: {
            language: 'typescript',
            code: `function playCyberBlip(ctx: AudioContext, freq = 880) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.05);
  
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}`,
          },
        },
        {
          heading: '2. Etika UX: Selalu Berikan Kendali pada Pengguna',
          body: [
            'Aturan paling mendasar dalam merancang audio UI adalah: suara harus opsional dan volume harus berada di ambang subliminal (di bawah 10% gain). Selalu sediakan tombol toggle Mute yang mudah dijangkau dan simpan preferensi di localStorage.',
          ],
          quote: 'Audio terbaik dalam antarmuka adalah audio yang terasa seperti perpanjangan sentuhan fisik, bukan kebisingan yang mengganggu konsentrasi pengguna.',
        },
      ],
      conclusion: 'Sintesis audio prosedural adalah masa depan umpan balik web aplikasi. Ia instan, hemat bandwidth, dan dapat diprogram secara dinamis mengikuti interaksi pengguna.',
    },
  },
  {
    id: 'post-3',
    slug: 'arsitektur-data-mesh-desentralisasi-latensi-rendah',
    title: 'Arsitektur Data Mesh & Protokol Sensorik: Pelajaran dari Implementasi Real-Time',
    excerpt: 'Studi mendalam tentang sinkronisasi data telemetri ribuan simpul dengan kompresi biner Protocol Buffers dan pipeline WebSockets.',
    coverImage: synthcityImg,
    publishedAt: '28 Agustus 2026',
    readTime: '8 min baca',
    category: 'System Architecture',
    tags: ['Architecture', 'WebSockets', 'Protobuf', 'Distributed'],
    likes: 112,
    content: {
      lead: 'Ketika antarmuka Anda harus menerima ribuan update data setiap detik dari node edge yang tersebar, JSON standard over HTTP segera menjadi bottleneck utama.',
      sections: [
        {
          heading: '1. Mengapa JSON Gagal pada Skala 50,000 Pesan per Detik',
          body: [
            'Proses parsing string JSON berukuran besar membebani V8 engine dengan alokasi heap memori berulang dan memicu Garbage Collection yang menyebabkan micro-stuttering pada UI.',
            'Dengan beralih ke skema biner Protocol Buffers (Protobuf) atau FlatBuffers, ukuran payload berkurang hingga 70% dan waktu deserialisasi turun ke tingkat mikrodetik.',
          ],
          codeSnippet: {
            language: 'protobuf',
            code: `syntax = "proto3";

package telemetry;

message NodeTelemetry {
  string node_id = 1;
  int64 timestamp = 2;
  float cpu_utilization = 3;
  float temperature_celsius = 4;
  repeated float sensor_vectors = 5;
  enum NodeStatus {
    OPTIMAL = 0;
    OVERLOADED = 1;
    ISOLATED = 2;
  }
  NodeStatus status = 6;
}`,
          },
        },
        {
          heading: '2. Zero-Copy Rendering pada Web Workers',
          body: [
            'Data biner yang diterima melalui WebSocket di-dispatch langsung ke Web Worker menggunakan transferrable ArrayBuffers. Dengan cara ini, UI thread tetap 100% responsif bahkan ketika terjadi ledakan burst data tak terduga.',
          ],
        },
      ],
      conclusion: 'Arsitektur data modern menuntut kita berpikir di luar batas REST dan JSON konvensional demi keandalan sistem berkecepatan tinggi.',
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend & Creative Tech',
    categoryCode: 'LAYER-01',
    skills: [
      { name: 'React 19 / Next.js', level: 96, spec: 'State Architecture, Server Actions, Suspense' },
      { name: 'TypeScript & JavaScript', level: 98, spec: 'Strict Types, Functional & AST Engineering' },
      { name: 'Three.js / WebGL / GLSL', level: 88, spec: 'Custom Shaders, Post-Processing, Instancing' },
      { name: 'Tailwind CSS & Design Tokens', level: 95, spec: 'Responsive Systems, Cyberpunk Themes' },
      { name: 'Web Audio API', level: 84, spec: 'Procedural Synthesis & AudioWorklet Engines' },
    ],
  },
  {
    title: 'Backend & Distributed Systems',
    categoryCode: 'LAYER-02',
    skills: [
      { name: 'Node.js & Express / Fastify', level: 92, spec: 'High-Concurrency Event-Driven Services' },
      { name: 'WebSockets & WebRTC', level: 90, spec: 'Real-Time Bi-Directional Streaming & Mesh' },
      { name: 'PostgreSQL & Drizzle ORM', level: 87, spec: 'Relational Indexing, Vector Search' },
      { name: 'Redis & Message Queues', level: 85, spec: 'Pub/Sub, In-Memory Caching & Rate Limiting' },
      { name: 'Docker & Cloud Deployment', level: 86, spec: 'Containerization, CI/CD, Edge Workers' },
    ],
  },
  {
    title: 'Architecture & Security',
    categoryCode: 'LAYER-03',
    skills: [
      { name: 'Cybernetic UI/UX Architecture', level: 95, spec: 'High-Density HUD, Tabular Precision' },
      { name: 'API Security & Cryptography', level: 89, spec: 'OAuth2, JWT, SHA-256, Zero-Trust' },
      { name: 'Performance Optimization', level: 94, spec: 'Core Web Vitals, Memory Leak Profiling' },
      { name: 'Git & Terminal Workflows', level: 92, spec: 'Shell Scripting, Monorepo Management' },
    ],
  },
];

export const INITIAL_COMMENTS: Record<string, import('../types/portfolio').BlogComment[]> = {
  'post-1': [
    {
      id: 'c1',
      author: 'Fajar Kurnia',
      handle: '@fajark_dev',
      avatarSeed: 'FK',
      timestamp: '25 Sep 2026, 14:20',
      content: 'Penjelasan tentang fragment shader quad sangat mencerahkan! Sebelumnya saya mencoba pakai 4 layer box-shadow dan FPS langsung anjlok di iPad.',
    },
    {
      id: 'c2',
      author: 'Arya Wardhana',
      handle: '@arya_bionics',
      avatarSeed: 'AW',
      timestamp: '26 Sep 2026, 09:15',
      content: 'Palette cyberpunks yang Anda gunakan tidak melelahkan mata karena kontrasnya terukur dengan rapi. Salut!',
    },
  ],
  'post-2': [
    {
      id: 'c3',
      author: 'Sarah Lin',
      handle: '@sarah_audio',
      avatarSeed: 'SL',
      timestamp: '15 Sep 2026, 18:40',
      content: 'Web Audio API oscillator blip ini super ringan! Kode TypeScript-nya sangat mudah diadaptasi ke proyek saya.',
    },
  ],
  'post-3': [
    {
      id: 'c4',
      author: 'Dimas Setiawan',
      handle: '@dimas_sys',
      avatarSeed: 'DS',
      timestamp: '30 Agu 2026, 11:05',
      content: 'Transferable ArrayBuffers memang game changer untuk throughput tinggi. Good read!',
    },
  ],
};
