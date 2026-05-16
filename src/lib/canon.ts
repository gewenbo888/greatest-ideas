// The Greatest Ideas — opinionated canon of 64.
// Each idea: stable id, epoch, year (signed: BCE negative), figure, EN+ZH name,
// EN+ZH one-line claim, glyph hint, and which prior ideas it descends from.

export type Lang = "en" | "zh";

export type EpochKey =
  | "fire" | "classical" | "method" | "industrial"
  | "modern" | "logic" | "networks" | "frontier";

export const EPOCHS: { key: EpochKey; label: { en: string; zh: string }; era: { en: string; zh: string }; tint: string }[] = [
  { key: "fire",       label: { en: "Ignition",        zh: "火种" },     era: { en: "before history", zh: "史前" },         tint: "#c2603a" },
  { key: "classical",  label: { en: "The Foundations", zh: "奠基" },     era: { en: "c. 600 BCE — 500 CE", zh: "约公元前600—公元500" }, tint: "#9b6a2a" },
  { key: "method",     label: { en: "The Method",      zh: "方法" },     era: { en: "1500 — 1700", zh: "1500—1700" },       tint: "#7a6c2c" },
  { key: "industrial", label: { en: "Industry & Self", zh: "工业与人" }, era: { en: "1700 — 1900", zh: "1700—1900" },       tint: "#4f6c46" },
  { key: "modern",     label: { en: "Modern Physics",  zh: "现代物理" }, era: { en: "1900 — 1960", zh: "1900—1960" },       tint: "#2d6377" },
  { key: "logic",      label: { en: "Logic & Computation", zh: "逻辑与计算" }, era: { en: "1900 — 1980", zh: "1900—1980" }, tint: "#3a4b8a" },
  { key: "networks",   label: { en: "Networks & Life", zh: "网络与生命" }, era: { en: "1960 — 2010", zh: "1960—2010" },     tint: "#6b3a8a" },
  { key: "frontier",   label: { en: "The Frontier",    zh: "前沿" },     era: { en: "2010 — now",  zh: "2010—至今" },       tint: "#b9352a" },
];

export const EPOCH_ORDER: Record<EpochKey, number> = {
  fire: 0, classical: 1, method: 2, industrial: 3,
  modern: 4, logic: 5, networks: 6, frontier: 7,
};

export type Idea = {
  id: string;          // stable kebab id
  epoch: EpochKey;
  year: number;        // approximate year; negative = BCE
  by:   { en: string; zh: string };   // attributed thinker(s) / civilization
  name: { en: string; zh: string };
  claim:{ en: string; zh: string };   // ~12-18 word punch line
  glyph: GlyphKind;
  from: string[];      // ids this idea descends from
};

export type GlyphKind =
  | "flame"   | "wave"   | "tally"   | "scroll"  | "circle"
  | "lattice" | "orbit"  | "atom"    | "graph"   | "spiral"
  | "tape"    | "helix"  | "binary"  | "key"     | "compass"
  | "prism"   | "lever"  | "leaf"    | "tower"   | "eye"
  | "tree"    | "matrix" | "pulse"   | "rosette" | "arrow"
  | "field"   | "wedge"  | "infinity";

// ───── THE CANON ───── ordered by year so the timeline reads correctly. ─────
export const IDEAS: Idea[] = [
  // Epoch 1 — IGNITION (prehistoric to alphabet)
  { id: "fire",        epoch: "fire", year: -1_500_000, by: { en: "Homo erectus",          zh: "直立人" },
    name:  { en: "Fire",                 zh: "火" },
    claim: { en: "External metabolism. Cooking unlocked the calories that grew the brain.", zh: "外置的新陈代谢。烹煮释放的热量让大脑得以生长。" },
    glyph: "flame", from: [] },
  { id: "language",    epoch: "fire", year: -100_000, by: { en: "Homo sapiens",            zh: "智人" },
    name:  { en: "Recursive language",   zh: "递归语言" },
    claim: { en: "Sentences inside sentences — the first compiler.",          zh: "句中之句——人类的第一个编译器。" },
    glyph: "wave", from: ["fire"] },
  { id: "story",       epoch: "fire", year: -40_000, by: { en: "the campfire",             zh: "篝火旁" },
    name:  { en: "Narrative",            zh: "叙事" },
    claim: { en: "A way to install a mind into a stranger across centuries.", zh: "一种隔着数百年将心智安装进陌生人的方法。" },
    glyph: "scroll", from: ["language"] },
  { id: "counting",    epoch: "fire", year: -35_000, by: { en: "tally-keepers",            zh: "结绳记数者" },
    name:  { en: "Number",               zh: "数" },
    claim: { en: "The first abstraction: this many, regardless of what.",     zh: "最早的抽象：「这么多」，与是何物无关。" },
    glyph: "tally", from: [] },
  { id: "agriculture", epoch: "fire", year: -10_000, by: { en: "the fertile crescents",    zh: "新月沃土" },
    name:  { en: "Agriculture",          zh: "农业" },
    claim: { en: "Settle, store, surplus — then write contracts about it.",   zh: "定居、储存、剩余——然后才有了写下契约的需要。" },
    glyph: "leaf", from: ["counting"] },
  { id: "wheel",       epoch: "fire", year: -3500, by: { en: "Sumer · Indus",              zh: "苏美尔 · 印度河" },
    name:  { en: "The wheel",            zh: "轮" },
    claim: { en: "Replace sliding with rolling. The first force-multiplier.", zh: "以滚动代替滑动。第一种力的倍增器。" },
    glyph: "circle", from: ["agriculture"] },
  { id: "writing",     epoch: "fire", year: -3200, by: { en: "Sumer · Egypt · China",      zh: "苏美尔 · 埃及 · 中国" },
    name:  { en: "Writing",              zh: "文字" },
    claim: { en: "Memory leaves the body. Civilization gains durable state.", zh: "记忆离开身体。文明获得了持久的状态。" },
    glyph: "scroll", from: ["language", "counting"] },
  { id: "zero",        epoch: "fire", year: -300, by: { en: "India",                       zh: "印度" },
    name:  { en: "Zero",                 zh: "零" },
    claim: { en: "Naming the absence — and turning it into a place.",         zh: "为「无」命名——并把它变成一个位置。" },
    glyph: "circle", from: ["counting", "writing"] },

  // Epoch 2 — CLASSICAL FOUNDATIONS
  { id: "wu-wei",      epoch: "classical", year: -500, by: { en: "Lao Zi", zh: "老子" },
    name:  { en: "Yin · yang",           zh: "阴阳" },
    claim: { en: "Reality as paired opposites in flow, not isolated things.", zh: "现实是流动中的对立两极，而非孤立的事物。" },
    glyph: "spiral", from: [] },
  { id: "deduction",   epoch: "classical", year: -300, by: { en: "Euclid",                 zh: "欧几里得" },
    name:  { en: "Deductive proof",      zh: "演绎证明" },
    claim: { en: "Five postulates → an empire of theorems. The shape of certainty.", zh: "五条公设 → 一座定理的帝国。确定性的形状。" },
    glyph: "lattice", from: ["counting", "writing"] },
  { id: "atom-demo",   epoch: "classical", year: -440, by: { en: "Democritus",             zh: "德谟克利特" },
    name:  { en: "The atom",             zh: "原子" },
    claim: { en: "If you keep cutting, something must refuse to be cut.",     zh: "若不断切分下去，总有一物拒绝被切。" },
    glyph: "atom", from: [] },
  { id: "logic",       epoch: "classical", year: -350, by: { en: "Aristotle",              zh: "亚里士多德" },
    name:  { en: "Formal logic",         zh: "形式逻辑" },
    claim: { en: "Truth has structural rules independent of who speaks it.",  zh: "真理拥有独立于说者的结构性规则。" },
    glyph: "lattice", from: ["language", "deduction"] },
  { id: "polis",       epoch: "classical", year: -500, by: { en: "Athens",                 zh: "雅典" },
    name:  { en: "Citizenship",          zh: "公民" },
    claim: { en: "Strangers, bound by procedure, can run a city together.",   zh: "陌生人，凭借程序，可以共同治理一座城邦。" },
    glyph: "rosette", from: [] },
  { id: "law-code",    epoch: "classical", year: -1750, by: { en: "Hammurabi",             zh: "汉谟拉比" },
    name:  { en: "Codified law",         zh: "成文法" },
    claim: { en: "Justice externalised. The judge becomes a function, not a face.", zh: "正义被外置。法官变成了一个函数，而非一张面孔。" },
    glyph: "scroll", from: ["writing"] },
  { id: "money",       epoch: "classical", year: -600, by: { en: "Lydia",                  zh: "吕底亚" },
    name:  { en: "Money",                zh: "货币" },
    claim: { en: "A protocol for trust between strangers, denominated in metal.", zh: "陌生人间的信任协议，以金属为面额。" },
    glyph: "circle", from: ["writing", "agriculture"] },
  { id: "monotheism",  epoch: "classical", year: -1300, by: { en: "Levant",                zh: "黎凡特" },
    name:  { en: "One law for all",      zh: "一神一律" },
    claim: { en: "A single moral source — universal rules instead of tribal ones.", zh: "唯一的道德之源——以普世规则取代部族规则。" },
    glyph: "tower", from: ["law-code"] },

  // Epoch 3 — THE METHOD
  { id: "heliocentric",epoch: "method", year: 1543, by: { en: "Copernicus",                zh: "哥白尼" },
    name:  { en: "Heliocentrism",        zh: "日心说" },
    claim: { en: "We are not the centre. The first cosmic humiliation.",      zh: "我们并非中心。宇宙赠予的第一次羞辱。" },
    glyph: "orbit", from: ["deduction"] },
  { id: "inertia",     epoch: "method", year: 1632, by: { en: "Galileo",                   zh: "伽利略" },
    name:  { en: "Inertia",              zh: "惯性" },
    claim: { en: "Motion needs no cause. Rest is a special case of moving.",  zh: "运动无需理由。静止只是运动的特例。" },
    glyph: "arrow", from: ["heliocentric"] },
  { id: "empirical",   epoch: "method", year: 1620, by: { en: "Francis Bacon",             zh: "弗朗西斯·培根" },
    name:  { en: "The experiment",       zh: "实验" },
    claim: { en: "Ask nature, not the ancients. Method beats authority.",     zh: "向自然提问，而非向先贤求证。方法胜过权威。" },
    glyph: "prism", from: ["deduction"] },
  { id: "cogito",      epoch: "method", year: 1637, by: { en: "Descartes",                 zh: "笛卡尔" },
    name:  { en: "Cogito ergo sum",      zh: "我思故我在" },
    claim: { en: "Doubt everything until something refuses to be doubted.",   zh: "怀疑一切，直至有一物拒绝被怀疑。" },
    glyph: "eye", from: ["empirical"] },
  { id: "calculus",    epoch: "method", year: 1665, by: { en: "Newton · Leibniz",          zh: "牛顿 · 莱布尼茨" },
    name:  { en: "Calculus",             zh: "微积分" },
    claim: { en: "The grammar of change. Reality acquires a tense system.",   zh: "变化的语法。现实从此拥有了时态。" },
    glyph: "wave", from: ["deduction", "inertia"] },
  { id: "gravity",     epoch: "method", year: 1687, by: { en: "Newton",                    zh: "牛顿" },
    name:  { en: "Universal gravitation",zh: "万有引力" },
    claim: { en: "The same law runs an apple and the moon. One sky, no roof.",zh: "苹果与月亮服从同一定律。一片天空，没有屋顶。" },
    glyph: "orbit", from: ["calculus", "heliocentric"] },
  { id: "probability", epoch: "method", year: 1654, by: { en: "Pascal · Fermat",           zh: "帕斯卡 · 费马" },
    name:  { en: "Probability",          zh: "概率" },
    claim: { en: "Math for futures that haven't happened yet.",               zh: "为尚未发生的未来所做的数学。" },
    glyph: "tally", from: ["deduction"] },
  { id: "optics",      epoch: "method", year: 1704, by: { en: "Newton · Huygens",          zh: "牛顿 · 惠更斯" },
    name:  { en: "Optics",               zh: "光学" },
    claim: { en: "Light has structure. The instruments of inquiry multiply.", zh: "光自有结构。探究的工具从此倍增。" },
    glyph: "prism", from: ["empirical", "calculus"] },

  // Epoch 4 — INDUSTRY & SELF
  { id: "steam",       epoch: "industrial", year: 1769, by: { en: "Watt",                  zh: "瓦特" },
    name:  { en: "The steam engine",     zh: "蒸汽机" },
    claim: { en: "Civilization gets a second muscle. Energy on tap.",         zh: "文明长出第二块肌肉。能量可被随取随用。" },
    glyph: "tower", from: ["gravity"] },
  { id: "liberty",     epoch: "industrial", year: 1689, by: { en: "Locke · 1776 · 1789",   zh: "洛克 · 1776 · 1789" },
    name:  { en: "Natural rights",       zh: "天赋人权" },
    claim: { en: "The state needs a reason. Power requires consent.",         zh: "国家需要理由。权力需要同意。" },
    glyph: "rosette", from: ["polis", "monotheism"] },
  { id: "vaccination", epoch: "industrial", year: 1796, by: { en: "Jenner",                zh: "詹纳" },
    name:  { en: "Vaccination",          zh: "疫苗" },
    claim: { en: "Train the body's memory before the enemy arrives.",         zh: "在敌人到来之前，先训练身体的记忆。" },
    glyph: "leaf", from: ["empirical"] },
  { id: "capital",     epoch: "industrial", year: 1776, by: { en: "Adam Smith",            zh: "亚当·斯密" },
    name:  { en: "The market",           zh: "市场" },
    claim: { en: "Decentralised coordination without anyone in charge.",      zh: "无人指挥的去中心化协调。" },
    glyph: "graph", from: ["money"] },
  { id: "evolution",   epoch: "industrial", year: 1859, by: { en: "Darwin",                zh: "达尔文" },
    name:  { en: "Natural selection",    zh: "自然选择" },
    claim: { en: "Design without a designer. Complexity from local pressure.",zh: "无设计者的设计。复杂源于在地的压力。" },
    glyph: "tree", from: ["empirical", "vaccination"] },
  { id: "periodic",    epoch: "industrial", year: 1869, by: { en: "Mendeleev",             zh: "门捷列夫" },
    name:  { en: "The periodic table",   zh: "元素周期表" },
    claim: { en: "Matter has a grammar. Empty cells predict what to look for.",zh: "物质自有语法。空格预言了应该寻找的元素。" },
    glyph: "matrix", from: ["atom-demo", "empirical"] },
  { id: "germ",        epoch: "industrial", year: 1864, by: { en: "Pasteur",               zh: "巴斯德" },
    name:  { en: "Germ theory",          zh: "细菌学说" },
    claim: { en: "The invisible has agency. Medicine becomes a war on species.",zh: "不可见之物具有能动性。医学化为对物种的战争。" },
    glyph: "atom", from: ["empirical", "vaccination"] },
  { id: "maxwell",     epoch: "industrial", year: 1865, by: { en: "Maxwell",               zh: "麦克斯韦" },
    name:  { en: "Electromagnetism",     zh: "电磁学" },
    claim: { en: "Four equations and the lights come on. Light is a field.",  zh: "四条方程，灯就亮了。光是一种场。" },
    glyph: "field", from: ["calculus", "optics"] },

  // Epoch 5 — MODERN PHYSICS
  { id: "relativity",  epoch: "modern", year: 1915, by: { en: "Einstein",                  zh: "爱因斯坦" },
    name:  { en: "Relativity",           zh: "相对论" },
    claim: { en: "Gravity is the shape of spacetime. Time bends with you.",   zh: "引力是时空的形状。时间随你而弯曲。" },
    glyph: "orbit", from: ["gravity", "maxwell", "calculus"] },
  { id: "quantum",     epoch: "modern", year: 1925, by: { en: "Bohr · Schrödinger · Dirac",zh: "玻尔 · 薛定谔 · 狄拉克" },
    name:  { en: "Quantum mechanics",    zh: "量子力学" },
    claim: { en: "At the bottom, the world is probability, not stuff.",       zh: "在最底层，世界是概率，而非物质。" },
    glyph: "wave", from: ["maxwell", "probability"] },
  { id: "thermo",      epoch: "modern", year: 1872, by: { en: "Boltzmann",                 zh: "玻尔兹曼" },
    name:  { en: "Entropy",              zh: "熵" },
    claim: { en: "Time's arrow is statistical. Disorder is the default.",     zh: "时间之箭是统计性的。无序才是默认。" },
    glyph: "spiral", from: ["steam", "probability"] },
  { id: "bigbang",     epoch: "modern", year: 1927, by: { en: "Lemaître · Hubble",         zh: "勒梅特 · 哈勃" },
    name:  { en: "The Big Bang",         zh: "宇宙大爆炸" },
    claim: { en: "The cosmos has a birthday. Distance comes with a date.",    zh: "宇宙有一个生日。距离亦带有一个日期。" },
    glyph: "field", from: ["relativity"] },
  { id: "dna",         epoch: "modern", year: 1953, by: { en: "Watson · Crick · Franklin", zh: "沃森 · 克里克 · 富兰克林" },
    name:  { en: "The double helix",     zh: "双螺旋" },
    claim: { en: "Inheritance is text. Life writes in four letters.",         zh: "遗传即文字。生命以四个字母书写。" },
    glyph: "helix", from: ["evolution"] },
  { id: "neuron",      epoch: "modern", year: 1906, by: { en: "Ramón y Cajal",             zh: "拉蒙·卡哈尔" },
    name:  { en: "The neuron doctrine", zh: "神经元学说" },
    claim: { en: "Thought has cells. The mind is a network, not a fluid.",    zh: "思想由细胞构成。心智是网络，而非液体。" },
    glyph: "graph", from: ["empirical"] },
  { id: "tectonics",   epoch: "modern", year: 1912, by: { en: "Wegener",                   zh: "魏格纳" },
    name:  { en: "Plate tectonics",      zh: "板块构造" },
    claim: { en: "Continents drift. Even the ground is a slow weather.",      zh: "大陆漂移。连大地也是一种缓慢的天气。" },
    glyph: "field", from: ["evolution"] },
  { id: "standard-model",epoch: "modern", year: 1973, by: { en: "Glashow · Weinberg · Salam",zh: "格拉肖 · 温伯格 · 萨拉姆" },
    name:  { en: "The Standard Model",   zh: "标准模型" },
    claim: { en: "Symmetry groups, not particles, are the deeper grammar.",   zh: "对称群——而非粒子——才是更深的语法。" },
    glyph: "lattice", from: ["quantum", "relativity"] },

  // Epoch 6 — LOGIC & COMPUTATION
  { id: "set-theory",  epoch: "logic", year: 1874, by: { en: "Cantor",                     zh: "康托尔" },
    name:  { en: "Set theory",           zh: "集合论" },
    claim: { en: "Some infinities are bigger than others.",                   zh: "某些无穷大于另一些无穷。" },
    glyph: "infinity", from: ["logic", "deduction"] },
  { id: "godel",       epoch: "logic", year: 1931, by: { en: "Gödel",                      zh: "哥德尔" },
    name:  { en: "Incompleteness",       zh: "不完备" },
    claim: { en: "Any system rich enough to count cannot prove itself sound.",zh: "任何能够计数的体系，都无法自证其无矛盾。" },
    glyph: "infinity", from: ["set-theory"] },
  { id: "turing",      epoch: "logic", year: 1936, by: { en: "Turing",                     zh: "图灵" },
    name:  { en: "The Turing machine",   zh: "图灵机" },
    claim: { en: "All computation is the same shape — a tape and a rule.",    zh: "所有计算都是同一形状——一卷纸带与一条规则。" },
    glyph: "tape", from: ["godel", "logic"] },
  { id: "shannon",     epoch: "logic", year: 1948, by: { en: "Shannon",                    zh: "香农" },
    name:  { en: "Information theory",   zh: "信息论" },
    claim: { en: "Distinctions can be counted. Noise has a maximum.",         zh: "区别可以被计算。噪声有其极限。" },
    glyph: "binary", from: ["probability", "thermo"] },
  { id: "cybernetics", epoch: "logic", year: 1948, by: { en: "Wiener",                     zh: "维纳" },
    name:  { en: "Feedback",             zh: "反馈" },
    claim: { en: "Steering is the deepest verb. Goals come from loops.",      zh: "「操控」是最深的动词。目标来自回路。" },
    glyph: "pulse", from: ["shannon"] },
  { id: "transistor",  epoch: "logic", year: 1947, by: { en: "Bell Labs",                  zh: "贝尔实验室" },
    name:  { en: "The transistor",       zh: "晶体管" },
    claim: { en: "A switch with no moving parts. Civilization fits on a chip.",zh: "无运动部件的开关。文明从此可以装进芯片。" },
    glyph: "lever", from: ["quantum"] },
  { id: "vonneumann",  epoch: "logic", year: 1945, by: { en: "von Neumann",                zh: "冯·诺依曼" },
    name:  { en: "Stored-program computer",zh: "存储程序计算机" },
    claim: { en: "Code is data. The same machine can be every machine.",      zh: "代码即数据。同一台机器可以成为任何机器。" },
    glyph: "matrix", from: ["turing", "transistor"] },
  { id: "publickey",   epoch: "logic", year: 1976, by: { en: "Diffie · Hellman · RSA",     zh: "迪菲 · 赫尔曼 · RSA" },
    name:  { en: "Public-key crypto",    zh: "公钥密码学" },
    claim: { en: "Whispering in public — the mathematical impossibility of eavesdropping.",zh: "在大庭广众下耳语——窃听在数学上的不可能。" },
    glyph: "key", from: ["shannon", "vonneumann"] },

  // Epoch 7 — NETWORKS & LIFE
  { id: "internet",    epoch: "networks", year: 1969, by: { en: "Baran · ARPA",            zh: "巴兰 · 阿帕网" },
    name:  { en: "Packet switching",     zh: "分组交换" },
    claim: { en: "No call, no centre — just letters that find their own way.",zh: "无须呼叫，亦无中心——信件自行找到去路。" },
    glyph: "graph", from: ["vonneumann", "publickey"] },
  { id: "web",         epoch: "networks", year: 1989, by: { en: "Berners-Lee",             zh: "伯纳斯-李" },
    name:  { en: "The Web",              zh: "万维网" },
    claim: { en: "Every document points to every other. The library finally networks.",zh: "每份文档指向其他文档。图书馆终于实现了联网。" },
    glyph: "graph", from: ["internet"] },
  { id: "pcr",         epoch: "networks", year: 1983, by: { en: "Mullis",                  zh: "穆利斯" },
    name:  { en: "PCR",                  zh: "聚合酶链式反应" },
    claim: { en: "Copy DNA on demand. Biology gets ctrl-C.",                  zh: "按需复制 DNA。生物学拥有了「复制粘贴」。" },
    glyph: "helix", from: ["dna"] },
  { id: "crispr",      epoch: "networks", year: 2012, by: { en: "Charpentier · Doudna",    zh: "夏彭蒂耶 · 杜德娜" },
    name:  { en: "CRISPR",               zh: "基因编辑" },
    claim: { en: "Bacterial immunity becomes a word-processor for genes.",    zh: "细菌的免疫机制，化作基因的文字处理器。" },
    glyph: "helix", from: ["pcr"] },
  { id: "higgs",       epoch: "networks", year: 2012, by: { en: "CERN",                    zh: "欧洲核子研究中心" },
    name:  { en: "The Higgs boson",      zh: "希格斯玻色子" },
    claim: { en: "Why anything has mass: a field that drags. Finally measured.",zh: "万物何以有质量：一片拖曳之场。终被测得。" },
    glyph: "atom", from: ["standard-model"] },
  { id: "microbiome",  epoch: "networks", year: 2007, by: { en: "Human Microbiome Project",zh: "人类微生物组计划" },
    name:  { en: "The microbiome",       zh: "微生物组" },
    claim: { en: "You are an ecosystem. Most of \"you\" isn't yours.",        zh: "你是一个生态系统。所谓「你」中，多半并非你。" },
    glyph: "tree", from: ["germ", "dna"] },
  { id: "placebo",     epoch: "networks", year: 1955, by: { en: "Beecher",                 zh: "比彻" },
    name:  { en: "The placebo effect",   zh: "安慰剂效应" },
    claim: { en: "Belief is biology. The mind has a pharmacy.",               zh: "信念即生理。心智自带一间药房。" },
    glyph: "pulse", from: ["empirical"] },
  { id: "behavioral",  epoch: "networks", year: 1979, by: { en: "Kahneman · Tversky",      zh: "卡尼曼 · 特沃斯基" },
    name:  { en: "Bounded rationality",  zh: "有限理性" },
    claim: { en: "The mind ships with bugs — predictable, exploitable, lovable.",zh: "心智自带 bug——可被预测、可被利用、可被原谅。" },
    glyph: "lever", from: ["cogito", "shannon"] },

  // Epoch 8 — THE FRONTIER
  { id: "embedding",   epoch: "frontier", year: 2013, by: { en: "Mikolov et al.",          zh: "Mikolov 等" },
    name:  { en: "Embeddings",           zh: "向量嵌入" },
    claim: { en: "Meaning becomes geometry. Words have coordinates.",         zh: "意义化为几何。词拥有了坐标。" },
    glyph: "matrix", from: ["shannon"] },
  { id: "backprop",    epoch: "frontier", year: 1986, by: { en: "Rumelhart · Hinton · LeCun",zh: "鲁梅尔哈特 · 辛顿 · 杨立昆" },
    name:  { en: "Deep learning",        zh: "深度学习" },
    claim: { en: "Stack differentiable layers, push errors back, watch intuition emerge.",zh: "堆叠可微分的层，回推误差，看着直觉浮现。" },
    glyph: "graph", from: ["neuron", "calculus", "vonneumann"] },
  { id: "transformer", epoch: "frontier", year: 2017, by: { en: "Vaswani et al.",          zh: "Vaswani 等" },
    name:  { en: "Attention is all",     zh: "注意力即一切" },
    claim: { en: "Let every token look at every other. Sequence dissolves into relation.",zh: "让每个 token 看向其他 token。序列消融于关系之中。" },
    glyph: "matrix", from: ["backprop", "embedding"] },
  { id: "rlhf",        epoch: "frontier", year: 2022, by: { en: "OpenAI · Anthropic",      zh: "OpenAI · Anthropic" },
    name:  { en: "RLHF",                 zh: "人类反馈强化学习" },
    claim: { en: "Train a model on a model of human preference. Taste at scale.",zh: "以「人类偏好的模型」训练模型。把品味做大。" },
    glyph: "pulse", from: ["backprop", "cybernetics", "behavioral"] },
  { id: "blockchain",  epoch: "frontier", year: 2008, by: { en: "Nakamoto",                zh: "中本聪" },
    name:  { en: "Blockchain",           zh: "区块链" },
    claim: { en: "Consensus without an authority. A ledger no one owns.",     zh: "无权威的共识。一本无人拥有的账簿。" },
    glyph: "lattice", from: ["publickey", "capital"] },
  { id: "zk",          epoch: "frontier", year: 1989, by: { en: "Goldwasser · Micali",     zh: "戈德瓦塞尔 · 米卡利" },
    name:  { en: "Zero-knowledge proof", zh: "零知识证明" },
    claim: { en: "Prove you know it without telling anyone what it is.",      zh: "证明你知道，却不必透露你知道什么。" },
    glyph: "key", from: ["publickey", "godel"] },
  { id: "mathuniv",    epoch: "frontier", year: 2007, by: { en: "Tegmark",                 zh: "泰格马克" },
    name:  { en: "Mathematical universe",zh: "数学宇宙" },
    claim: { en: "If a structure is consistent, perhaps it already exists.",  zh: "若一个结构自洽，也许它已然存在。" },
    glyph: "infinity", from: ["standard-model", "set-theory"] },
  { id: "structural",  epoch: "frontier", year: 1990, by: { en: "Worrall · Ladyman",       zh: "沃罗尔 · 拉德曼" },
    name:  { en: "Structural realism",   zh: "结构实在论" },
    claim: { en: "What persists across theory-change is relation, not object.",zh: "在理论更替中得以保留的，是关系，而非对象。" },
    glyph: "graph", from: ["mathuniv", "relativity"] },
];

// Convenience indexes
export const IDEAS_BY_ID: Record<string, Idea> = Object.fromEntries(IDEAS.map(i => [i.id, i]));

export type Edge = { from: string; to: string };
export const EDGES: Edge[] = IDEAS.flatMap(i => i.from.map(f => ({ from: f, to: i.id })));

// Strings — site chrome, hero, sections, closing
export const STR = {
  brand:    { en: "The Greatest Ideas",            zh: "最伟大的想法" },
  subtitle: { en: "An opinionated canon, 1.5 million years long.", zh: "一份偏执的人类思想清单，长达一百五十万年。" },
  hero: {
    eyebrow: { en: "64 entries · 8 epochs · EN · 中文", zh: "六十四条 · 八个时代 · 中英双语" },
    line_a:  { en: "Every great idea",  zh: "每一种伟大的想法" },
    line_b:  { en: "is a doorway",      zh: "都是一道门" },
    line_c:  { en: "that the next idea walks through.", zh: "下一个想法从中走过。" },
    scroll:  { en: "begin",             zh: "开始" },
  },
  filter: {
    all:    { en: "All",      zh: "全部" },
    count:  { en: "ideas",    zh: "条" },
    epoch:  { en: "epoch",    zh: "时代" },
  },
  card: {
    spawned:{ en: "Spawned",        zh: "衍生" },
    descends:{ en: "Descends from", zh: "源自" },
  },
  graph: {
    title:  { en: "The lineage",  zh: "源流" },
    sub:    { en: "Every idea is a node. Every arrow is descent. Drag a node to feel which other ideas resist or follow.", zh: "每一种想法是一个节点。每一条箭头是传承。拖动一个节点，感受其他想法的牵引。" },
    legend: { en: "ancestor → descendant", zh: "祖代 → 后裔" },
  },
  closing: {
    eyebrow:{ en: "The greatest idea", zh: "最伟大的想法" },
    title_a:{ en: "is the one that makes",       zh: "是那个让" },
    title_b:{ en: "the next one possible.",      zh: "下一个成为可能的想法。" },
    body: {
      en: "Greatness is not loudness or proof. It is fertility — how many other thoughts a thought permits to exist. Fire permitted the brain. The brain permitted language. Language permitted the experiment. The experiment permitted everything else. Each entry in this list was chosen because it opened a door that did not close behind it. Most ideas you can have stop at themselves. A few keep generating. Those are the greatest.",
      zh: "伟大并非声量，亦非证明。伟大是生育力——一个想法允许多少其他想法得以存在。火允许了大脑。大脑允许了语言。语言允许了实验。实验允许了之后的一切。这份名单中的每一条之所以入选，是因为它打开的门没有再合上。绝大多数你能想到的想法都止于自身。少数几个仍在不断生育。它们便是最伟大的。",
    },
    sign:  { en: "— Gewenbo", zh: "— 葛文博" },
  },
  ui: {
    lang:   { en: "中文",       zh: "EN" },
    grid:   { en: "Canon",      zh: "清单" },
    graph:  { en: "Lineage",    zh: "源流" },
    of:     { en: "of",         zh: "/" },
  },
  footer: {
    line: { en: "An essay by Gewenbo, part of the Psyverse.", zh: "葛文博撰 · 隶属 Psyverse 系列。" },
  },
} as const;

export function pick<T extends Record<Lang, string>>(s: T, lang: Lang): string {
  return s[lang];
}

// Approximate year formatter, bilingual.
export function yearLabel(y: number, lang: Lang): string {
  if (y <= -100_000) {
    const k = Math.round(-y / 1000);
    return lang === "zh" ? `约 ${k.toLocaleString()} 千年前` : `c. ${k.toLocaleString()}k BP`;
  }
  if (y < 0) return lang === "zh" ? `公元前 ${Math.abs(y)} 年` : `${Math.abs(y)} BCE`;
  return lang === "zh" ? `${y} 年` : `${y}`;
}
