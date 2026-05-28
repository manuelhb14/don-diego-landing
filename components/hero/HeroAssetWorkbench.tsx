"use client";

/* eslint-disable @next/next/no-img-element */

import {
    Check,
    Cloud,
    Copy,
    Flower2,
    ImagePlus,
    PawPrint,
    RotateCcw,
    Trash2,
} from "lucide-react";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type DragEvent,
    type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/utils";
import "./hero-asset-workbench.css";

type AssetKind = "cloud" | "plant" | "animal";

type WorkbenchAsset = {
    id: string;
    label: string;
    kind: AssetKind;
    src: string;
    width: number;
    height: number;
    temp?: boolean;
};

type PlacedAsset = {
    id: string;
    assetId: string;
    kind: Exclude<AssetKind, "cloud">;
    src: string;
    x: number;
    y: number;
    size: number;
    rotation: number;
    flipped: boolean;
    opacity: number;
    z: number;
};

type CloudLayer = {
    id: string;
    assetId: string;
    src: string;
    top: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
    rotation: number;
};

type Selection =
    | { type: "placed"; id: string }
    | { type: "cloud"; id: string }
    | null;

type SavedScene = {
    placed: PlacedAsset[];
    clouds: CloudLayer[];
};

const STORAGE_KEY = "don-diego-hero-asset-workbench";
const HERO_ASSET_VERSION = "cloud-neutral-2";
const heroAsset = (file: string) => `/hero/clean/${file}?v=${HERO_ASSET_VERSION}`;
const normalizeHeroSrc = (src: string) => {
    const match = src.match(/^\/hero\/(?:clean\/)?((?:nube|animal|planta)_\d+\.png)(?:\?.*)?$/);
    return match ? heroAsset(match[1]) : src;
};

const CLOUD_ASSETS: WorkbenchAsset[] = [
    { id: "nube_1", label: "Nube 1", kind: "cloud", src: heroAsset("nube_1.png"), width: 1448, height: 1086 },
    { id: "nube_2", label: "Nube 2", kind: "cloud", src: heroAsset("nube_2.png"), width: 1448, height: 1086 },
    { id: "nube_3", label: "Nube 3", kind: "cloud", src: heroAsset("nube_3.png"), width: 1448, height: 1086 },
    { id: "nube_4", label: "Nube 4", kind: "cloud", src: heroAsset("nube_4.png"), width: 1448, height: 1086 },
    { id: "nube_5", label: "Nube 5", kind: "cloud", src: heroAsset("nube_5.png"), width: 1448, height: 1086 },
];

const PLANT_ASSETS: WorkbenchAsset[] = [
    { id: "planta_1", label: "Planta 1", kind: "plant", src: heroAsset("planta_1.png"), width: 1122, height: 1402 },
    { id: "planta_2", label: "Planta 2", kind: "plant", src: heroAsset("planta_2.png"), width: 1122, height: 1402 },
    { id: "planta_3", label: "Planta 3", kind: "plant", src: heroAsset("planta_3.png"), width: 1122, height: 1402 },
    { id: "planta_4", label: "Planta 4", kind: "plant", src: heroAsset("planta_4.png"), width: 1122, height: 1402 },
    { id: "planta_5", label: "Planta 5", kind: "plant", src: heroAsset("planta_5.png"), width: 1122, height: 1402 },
    { id: "planta_6", label: "Planta 6", kind: "plant", src: heroAsset("planta_6.png"), width: 1024, height: 1536 },
    { id: "planta_7", label: "Planta 7", kind: "plant", src: heroAsset("planta_7.png"), width: 1024, height: 1536 },
    { id: "planta_8", label: "Planta 8", kind: "plant", src: heroAsset("planta_8.png"), width: 1024, height: 1536 },
    { id: "planta_9", label: "Planta 9", kind: "plant", src: heroAsset("planta_9.png"), width: 1024, height: 1536 },
    { id: "planta_10", label: "Planta 10", kind: "plant", src: heroAsset("planta_10.png"), width: 1024, height: 1536 },
];

const ANIMAL_ASSETS: WorkbenchAsset[] = [
    { id: "animal_1", label: "Animal 1", kind: "animal", src: heroAsset("animal_1.png"), width: 1122, height: 1402 },
    { id: "animal_2", label: "Animal 2", kind: "animal", src: heroAsset("animal_2.png"), width: 1122, height: 1402 },
    { id: "animal_3", label: "Animal 3", kind: "animal", src: heroAsset("animal_3.png"), width: 1122, height: 1402 },
    { id: "animal_4", label: "Animal 4", kind: "animal", src: heroAsset("animal_4.png"), width: 1122, height: 1402 },
    { id: "animal_5", label: "Animal 5", kind: "animal", src: heroAsset("animal_5.png"), width: 1122, height: 1402 },
    { id: "animal_6", label: "Animal 6", kind: "animal", src: heroAsset("animal_6.png"), width: 1122, height: 1402 },
    { id: "animal_7", label: "Animal 7", kind: "animal", src: heroAsset("animal_7.png"), width: 1122, height: 1402 },
    { id: "animal_8", label: "Animal 8", kind: "animal", src: heroAsset("animal_8.png"), width: 1122, height: 1402 },
    { id: "animal_9", label: "Animal 9", kind: "animal", src: heroAsset("animal_9.png"), width: 1122, height: 1402 },
    { id: "animal_10", label: "Animal 10", kind: "animal", src: heroAsset("animal_10.png"), width: 1122, height: 1402 },
    { id: "animal_11", label: "Animal 11", kind: "animal", src: heroAsset("animal_11.png"), width: 1122, height: 1402 },
];

const BUILT_IN_ASSETS = [...CLOUD_ASSETS, ...PLANT_ASSETS, ...ANIMAL_ASSETS];

const DEFAULT_CLOUDS: CloudLayer[] = [
    { id: "cloud-1", assetId: "nube_1", src: heroAsset("nube_1.png"), top: 2.5, size: 31, duration: 96, delay: -42, opacity: 0.58, rotation: -2 },
    { id: "cloud-2", assetId: "nube_2", src: heroAsset("nube_2.png"), top: 12, size: 24, duration: 118, delay: -14, opacity: 0.48, rotation: 2 },
    { id: "cloud-3", assetId: "nube_3", src: heroAsset("nube_3.png"), top: 20, size: 28, duration: 132, delay: -82, opacity: 0.42, rotation: 1 },
];

const DEFAULT_PLACED: PlacedAsset[] = [
    {
        id: "placed-planta-2",
        assetId: "planta_2",
        kind: "plant",
        src: heroAsset("planta_2.png"),
        x: 12,
        y: 78,
        size: 13,
        rotation: -7,
        flipped: false,
        opacity: 0.96,
        z: 22,
    },
    {
        id: "placed-planta-6",
        assetId: "planta_6",
        kind: "plant",
        src: heroAsset("planta_6.png"),
        x: 83,
        y: 79,
        size: 11,
        rotation: 5,
        flipped: true,
        opacity: 0.94,
        z: 23,
    },
    {
        id: "placed-animal-1",
        assetId: "animal_1",
        kind: "animal",
        src: heroAsset("animal_1.png"),
        x: 63,
        y: 81,
        size: 8,
        rotation: -2,
        flipped: false,
        opacity: 0.98,
        z: 24,
    },
];

const FILTERS = [
    { id: "all", label: "All", icon: ImagePlus },
    { id: "cloud", label: "Clouds", icon: Cloud },
    { id: "plant", label: "Plants", icon: Flower2 },
    { id: "animal", label: "Animals", icon: PawPrint },
] as const;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const createId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function safeReadScene(): SavedScene | null {
    if (typeof window === "undefined") return null;

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<SavedScene>;
        if (!Array.isArray(parsed.placed) || !Array.isArray(parsed.clouds)) return null;
        return {
            placed: parsed.placed.map((item) => ({ ...item, src: normalizeHeroSrc(item.src) })),
            clouds: parsed.clouds.map((item) => ({ ...item, src: normalizeHeroSrc(item.src) })),
        };
    } catch {
        return null;
    }
}

function saveScene(scene: SavedScene) {
    if (typeof window === "undefined") return;

    const stableScene = {
        placed: scene.placed.filter((item) => !item.src.startsWith("blob:")),
        clouds: scene.clouds.filter((item) => !item.src.startsWith("blob:")),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stableScene));
}

function getAssetLabel(assetId: string, assets: WorkbenchAsset[]) {
    return assets.find((asset) => asset.id === assetId)?.label ?? assetId;
}

export default function HeroAssetWorkbench() {
    const stageRef = useRef<HTMLDivElement | null>(null);
    const dragRef = useRef<{ id: string } | null>(null);
    const objectUrlsRef = useRef<Set<string>>(new Set());

    const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
    const [userAssets, setUserAssets] = useState<WorkbenchAsset[]>([]);
    const [placed, setPlaced] = useState<PlacedAsset[]>(DEFAULT_PLACED);
    const [clouds, setClouds] = useState<CloudLayer[]>(DEFAULT_CLOUDS);
    const [selection, setSelection] = useState<Selection>({ type: "placed", id: DEFAULT_PLACED[0].id });
    const [hasLoadedScene, setHasLoadedScene] = useState(false);
    const [copied, setCopied] = useState(false);

    const assets = useMemo(() => [...BUILT_IN_ASSETS, ...userAssets], [userAssets]);
    const assetMap = useMemo(() => new Map(assets.map((asset) => [asset.id, asset])), [assets]);
    const visibleAssets = useMemo(() => {
        if (activeFilter === "all") return assets;
        return assets.filter((asset) => asset.kind === activeFilter);
    }, [activeFilter, assets]);

    const selectedPlaced = selection?.type === "placed" ? placed.find((item) => item.id === selection.id) : undefined;
    const selectedCloud = selection?.type === "cloud" ? clouds.find((item) => item.id === selection.id) : undefined;

    useEffect(() => {
        const savedScene = safeReadScene();
        if (savedScene) {
            setPlaced(savedScene.placed);
            setClouds(savedScene.clouds);
            setSelection(savedScene.placed[0] ? { type: "placed", id: savedScene.placed[0].id } : null);
        }
        setHasLoadedScene(true);
    }, []);

    useEffect(() => {
        if (!hasLoadedScene) return;
        saveScene({ placed, clouds });
    }, [clouds, hasLoadedScene, placed]);

    useEffect(() => {
        const objectUrls = objectUrlsRef.current;
        return () => {
            objectUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, []);

    const getStagePoint = useCallback((clientX: number, clientY: number) => {
        const rect = stageRef.current?.getBoundingClientRect();
        if (!rect) return { x: 50, y: 50 };

        return {
            x: clamp(((clientX - rect.left) / rect.width) * 100, 2, 98),
            y: clamp(((clientY - rect.top) / rect.height) * 100, 2, 98),
        };
    }, []);

    const addAssetToStage = useCallback(
        (asset: WorkbenchAsset, point = { x: 50, y: asset.kind === "cloud" ? 14 : 77 }) => {
            if (asset.kind === "cloud") {
                const next: CloudLayer = {
                    id: createId("cloud"),
                    assetId: asset.id,
                    src: asset.src,
                    top: clamp(point.y, 1, 34),
                    size: 26,
                    duration: 94 + Math.round(Math.random() * 46),
                    delay: -Math.round(Math.random() * 90),
                    opacity: 0.52,
                    rotation: Math.round((Math.random() - 0.5) * 6),
                };
                setClouds((items) => [...items, next]);
                setSelection({ type: "cloud", id: next.id });
                return;
            }

            const maxZ = placed.reduce((highest, item) => Math.max(highest, item.z), 20);
            const next: PlacedAsset = {
                id: createId("asset"),
                assetId: asset.id,
                kind: asset.kind,
                src: asset.src,
                x: point.x,
                y: point.y,
                size: asset.kind === "plant" ? 11 : 8,
                rotation: 0,
                flipped: false,
                opacity: 0.98,
                z: maxZ + 1,
            };
            setPlaced((items) => [...items, next]);
            setSelection({ type: "placed", id: next.id });
        },
        [placed],
    );

    const replaceMovingClouds = useCallback((asset: WorkbenchAsset) => {
        setClouds((items) =>
            (items.length ? items : DEFAULT_CLOUDS).map((cloud) => ({
                ...cloud,
                assetId: asset.id,
                src: asset.src,
            })),
        );
        setSelection((current) => current ?? { type: "cloud", id: DEFAULT_CLOUDS[0].id });
    }, []);

    const handleAssetDragStart = (event: DragEvent<HTMLButtonElement>, asset: WorkbenchAsset) => {
        event.dataTransfer.setData("application/x-don-diego-asset", asset.id);
        event.dataTransfer.effectAllowed = "copy";
    };

    const handleDropFiles = useCallback(
        (files: FileList, point: { x: number; y: number }) => {
            const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
            if (!imageFiles.length) return false;

            const nextAssets = imageFiles.map((file, index): WorkbenchAsset => {
                const src = URL.createObjectURL(file);
                objectUrlsRef.current.add(src);
                const lowerName = file.name.toLowerCase();
                const kind: AssetKind = lowerName.includes("nube") || lowerName.includes("cloud")
                    ? "cloud"
                    : lowerName.includes("animal")
                        ? "animal"
                        : "plant";

                return {
                    id: createId(`temp-${index}`),
                    label: file.name.replace(/\.[^.]+$/, ""),
                    kind,
                    src,
                    width: 900,
                    height: 900,
                    temp: true,
                };
            });

            setUserAssets((items) => [...items, ...nextAssets]);
            nextAssets.forEach((asset, index) => {
                addAssetToStage(asset, {
                    x: clamp(point.x + index * 3, 2, 98),
                    y: clamp(point.y + index * 2, 2, 98),
                });
            });
            return true;
        },
        [addAssetToStage],
    );

    const handleStageDrop = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            const point = getStagePoint(event.clientX, event.clientY);

            if (event.dataTransfer.files.length && handleDropFiles(event.dataTransfer.files, point)) return;

            const assetId = event.dataTransfer.getData("application/x-don-diego-asset");
            const asset = assetMap.get(assetId);
            if (!asset) return;
            addAssetToStage(asset, point);
        },
        [addAssetToStage, assetMap, getStagePoint, handleDropFiles],
    );

    const handleStageDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    };

    const startPlacedDrag = (event: ReactPointerEvent<HTMLButtonElement>, item: PlacedAsset) => {
        if (event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        dragRef.current = { id: item.id };
        setSelection({ type: "placed", id: item.id });
    };

    const handleStagePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (!dragRef.current) return;
        const point = getStagePoint(event.clientX, event.clientY);
        setPlaced((items) =>
            items.map((item) =>
                item.id === dragRef.current?.id
                    ? {
                        ...item,
                        x: point.x,
                        y: point.y,
                    }
                    : item,
            ),
        );
    };

    const handleStagePointerUp = () => {
        dragRef.current = null;
    };

    const updateSelectedPlaced = (patch: Partial<PlacedAsset>) => {
        if (!selectedPlaced) return;
        setPlaced((items) => items.map((item) => (item.id === selectedPlaced.id ? { ...item, ...patch } : item)));
    };

    const updateSelectedCloud = (patch: Partial<CloudLayer>) => {
        if (!selectedCloud) return;
        setClouds((items) => items.map((item) => (item.id === selectedCloud.id ? { ...item, ...patch } : item)));
    };

    const removeSelection = () => {
        if (!selection) return;
        if (selection.type === "placed") {
            setPlaced((items) => items.filter((item) => item.id !== selection.id));
        } else {
            setClouds((items) => items.filter((item) => item.id !== selection.id));
        }
        setSelection(null);
    };

    const resetScene = () => {
        setPlaced(DEFAULT_PLACED);
        setClouds(DEFAULT_CLOUDS);
        setSelection({ type: "placed", id: DEFAULT_PLACED[0].id });
        window.localStorage.removeItem(STORAGE_KEY);
    };

    const copyScene = async () => {
        const payload = JSON.stringify({ placed, clouds }, null, 2);
        await navigator.clipboard.writeText(payload);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
    };

    return (
        <main className="hero-workbench-page min-h-dvh bg-[#f6efe4] text-[#1f1a16]">
            <section className="grid min-h-dvh grid-rows-[auto_1fr] gap-3 px-3 py-3 md:px-4 md:py-4 xl:grid-cols-[240px_minmax(0,1fr)_240px] xl:grid-rows-1">
                <aside className="hero-workbench-panel order-2 flex min-h-0 flex-col overflow-hidden border border-[#1f1a16]/12 bg-[#fff8ed]/92 xl:order-1 xl:h-[calc(100dvh-24px)]">
                    <div className="border-b border-[#1f1a16]/10 px-3 py-3">
                        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-[#aa7d69]">
                            Hero assets
                        </p>
                        <h1 className="mt-1 font-serif text-xl leading-tight text-[#1c1713]">
                            Don Diego hero lab
                        </h1>
                    </div>

                    <div className="grid grid-cols-4 border-b border-[#1f1a16]/10">
                        {FILTERS.map((filter) => {
                            const Icon = filter.icon;
                            const active = activeFilter === filter.id;
                            return (
                                <button
                                    key={filter.id}
                                    type="button"
                                    className={cn(
                                        "flex h-9 items-center justify-center border-r border-[#1f1a16]/10 text-[#57483e] transition-colors last:border-r-0 hover:bg-[#ede5da]",
                                        active && "bg-[#aa7d69] text-[#fff9f2] hover:bg-[#aa7d69]",
                                    )}
                                    title={filter.label}
                                    aria-label={filter.label}
                                    aria-pressed={active}
                                    onClick={() => setActiveFilter(filter.id)}
                                >
                                    <Icon className="size-4" aria-hidden />
                                </button>
                            );
                        })}
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-2">
                        <div className="grid grid-cols-2 gap-1.5">
                            {visibleAssets.map((asset) => (
                                <div
                                    key={asset.id}
                                    className="group/asset border border-[#1f1a16]/10 bg-[#fff9f2] transition-colors hover:border-[#aa7d69]/45"
                                >
                                    <button
                                        type="button"
                                        draggable
                                        className="grid h-[72px] w-full place-items-center p-1.5"
                                        onClick={() => addAssetToStage(asset)}
                                        onDragStart={(event) => handleAssetDragStart(event, asset)}
                                    >
                                        <img
                                            src={asset.src}
                                            alt={asset.label}
                                            className="max-h-[52px] max-w-full object-contain drop-shadow-[0_4px_6px_rgba(42,34,27,0.12)]"
                                            draggable={false}
                                        />
                                    </button>
                                    <div className="flex items-center justify-between gap-1 border-t border-[#1f1a16]/8 px-1.5 py-1">
                                        <span className="truncate font-sans text-[9px] font-bold uppercase tracking-[0.12em] text-[#57483e]">
                                            {asset.label}
                                        </span>
                                        {asset.kind === "cloud" && (
                                            <button
                                                type="button"
                                                className="grid size-5 shrink-0 place-items-center border border-[#aa7d69]/25 text-[#7b604f] transition-colors hover:bg-[#aa7d69] hover:text-[#fff9f2]"
                                                title="Use as cloud set"
                                                aria-label={`Use ${asset.label} as cloud set`}
                                                onClick={() => replaceMovingClouds(asset)}
                                            >
                                                <Cloud className="size-2.5" aria-hidden />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                <div className="order-1 min-h-[700px] md:h-[800px] xl:order-2 xl:h-[calc(100dvh-24px)]">
                    <div
                        ref={stageRef}
                        className="hero-workbench-stage relative h-full min-h-[700px] overflow-hidden border border-[#1f1a16]/12 bg-[#d7d7aa]"
                        onDrop={handleStageDrop}
                        onDragOver={handleStageDragOver}
                        onPointerMove={handleStagePointerMove}
                        onPointerUp={handleStagePointerUp}
                        onPointerCancel={handleStagePointerUp}
                    >
                        <picture>
                            <source media="(min-width: 768px)" srcSet="/final-hero-2.png" />
                            <img
                                src="/final-hero-mobile.jpg"
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover object-center md:object-[80%_center]"
                                draggable={false}
                            />
                        </picture>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#15120f]/56 via-[#15120f]/6 to-[#15120f]/10" aria-hidden />

                        <div className="absolute inset-0 overflow-hidden" aria-label="Moving cloud layers">
                            {clouds.map((cloud) => (
                                <button
                                    key={cloud.id}
                                    type="button"
                                    className={cn(
                                        "hero-workbench-cloud",
                                        selection?.type === "cloud" && selection.id === cloud.id && "is-selected",
                                    )}
                                    style={
                                        {
                                            "--cloud-top": `${cloud.top}%`,
                                            "--cloud-width": `${cloud.size}vw`,
                                            "--cloud-duration": `${cloud.duration}s`,
                                            "--cloud-delay": `${cloud.delay}s`,
                                            "--cloud-opacity": cloud.opacity,
                                            "--cloud-rotation": `${cloud.rotation}deg`,
                                        } as CSSProperties
                                    }
                                    title={getAssetLabel(cloud.assetId, assets)}
                                    aria-label={`Cloud layer ${getAssetLabel(cloud.assetId, assets)}`}
                                    onClick={() => setSelection({ type: "cloud", id: cloud.id })}
                                >
                                    <img src={cloud.src} alt="" draggable={false} />
                                </button>
                            ))}
                        </div>

                        {placed.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className={cn(
                                    "hero-workbench-placed",
                                    item.kind === "animal" && "hero-workbench-placed-animal",
                                    selection?.type === "placed" && selection.id === item.id && "is-selected",
                                )}
                                style={
                                    {
                                        left: `${item.x}%`,
                                        top: `${item.y}%`,
                                        width: `${item.size}%`,
                                        opacity: item.opacity,
                                        zIndex: item.z,
                                        "--asset-rotation": `${item.rotation}deg`,
                                        "--asset-flip": item.flipped ? -1 : 1,
                                    } as CSSProperties
                                }
                                title={getAssetLabel(item.assetId, assets)}
                                aria-label={`Placed ${getAssetLabel(item.assetId, assets)}`}
                                onPointerDown={(event) => startPlacedDrag(event, item)}
                            >
                                <img src={item.src} alt="" draggable={false} />
                            </button>
                        ))}

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-36 bg-gradient-to-t from-[#15120f]/45 to-transparent" aria-hidden />

                        {/* Hero text preview — mirrors home page layout */}
                        <div className="pointer-events-none absolute inset-0 z-[36] flex flex-col items-center justify-center px-4 text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.42),0_2px_18px_rgba(0,0,0,0.18)]">
                            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.3em] text-[#FFF3E1]" aria-hidden>
                                San Miguel de Allende
                            </p>
                            <svg
                                viewBox="0 0 1327 647"
                                className="mb-2 h-auto w-full max-w-[220px] md:max-w-[340px]"
                                preserveAspectRatio="xMidYMid meet"
                                aria-hidden
                            >
                                <g transform="matrix(1,0,0,1,-2177.39,-1092.9)">
                                    <g transform="matrix(4.16667,0,0,4.16667,0,0)">
                                        <g transform="matrix(1,0,0,1,583.364,323.971)">
                                            <path d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z" fill="#FFF3E1" />
                                        </g>
                                        <g transform="matrix(1,0,0,1,680.967,268.704)">
                                            <path d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.987,13.775 11.507,-0.325 -2.998,-0.001C-15.397,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.423,61.911 -1.621,61.587" fill="#FFF3E1" />
                                        </g>
                                        <g transform="matrix(1,0,0,1,789.338,307.844)">
                                            <path d="M0,-23.095C0,-27.876 0.162,-31.847 0.487,-35.008C0.892,-38.168 1.458,-41.409 2.35,-44.732L-10.535,-44.732C-9.643,-41.409 -9.076,-38.168 -8.752,-35.008C-8.347,-31.847 -8.185,-27.876 -8.185,-23.095L-8.185,7.374L-39.951,-35.899C-42.868,-39.465 -44.733,-42.382 -45.543,-44.732L-55.834,-44.732C-54.781,-38.655 -54.213,-32.496 -54.213,-23.096L-54.213,0C-54.213,4.781 -54.376,8.752 -54.7,11.912C-55.105,15.073 -55.672,18.314 -56.564,21.637L-43.679,21.637C-44.57,18.314 -45.138,15.073 -45.461,11.912C-45.867,8.752 -46.029,4.781 -46.029,0L-46.029,-30.469L-14.262,12.804C-11.345,16.37 -9.481,19.287 -8.671,21.637L1.621,21.637C0.567,15.559 0,9.401 0,0L0,-23.095Z" fill="#FFF3E1" />
                                        </g>
                                        <g transform="matrix(1,0,0,1,534.081,411.237)">
                                            <path d="M0,-55.673C-0.324,-52.512 -0.486,-48.542 -0.486,-43.76L-0.486,-13.048C-0.486,-7.781 -0.243,-3.485 0.162,-0.163C9.725,-0.649 17.342,-3.161 22.933,-7.781C28.525,-12.4 31.361,-18.882 31.361,-27.391C31.361,-43.76 19.205,-54.863 0,-55.673M-8.67,-41.815C-8.67,-49.838 -9.481,-54.943 -11.507,-60.859C-8.509,-61.183 -5.349,-61.345 -2.026,-61.345C25.526,-61.345 40.842,-48.136 40.842,-28.202C41.166,-7.294 23.744,5.672 1.053,5.51L-11.021,5.51C-9.319,-0.325 -8.67,-5.43 -8.67,-13.534L-8.67,-41.815Z" fill="#FFF3E1" />
                                        </g>
                                        <g transform="matrix(1,0,0,1,599.951,397.703)">
                                            <path d="M0,-28.281C0,-36.385 -0.649,-41.49 -2.35,-47.325L10.534,-47.325C8.833,-41.49 8.185,-36.385 8.185,-28.281L8.185,0.001C8.185,8.104 8.833,13.21 10.534,19.044L-2.35,19.044C-0.649,13.21 0,8.104 0,0.001L0,-28.281Z" fill="#FFF3E1" />
                                        </g>
                                        <g transform="matrix(1,0,0,1,671.843,407.508)">
                                            <path d="M0,-47.891L0,-57.13L-35.089,-57.13C-33.387,-51.294 -32.738,-46.19 -32.738,-38.086L-32.738,-9.804C-32.738,-1.701 -33.387,3.405 -35.089,9.239L0,9.239L0,0.001C-5.591,2.27 -16.613,3.404 -24.554,3.404L-24.554,-21.011L-21.354,-21.011C-15.543,-21.011 -11.883,-20.546 -7.699,-19.326L-7.699,-28.565C-11.883,-27.345 -15.543,-26.879 -21.354,-26.879L-24.554,-26.879L-24.554,-51.294C-16.613,-51.294 -5.591,-50.161 0,-47.891" fill="#FFF3E1" />
                                        </g>
                                        <g transform="matrix(1,0,0,1,746.392,405.889)">
                                            <path d="M0,-44.733L-0.243,-44.651C-6.969,-48.299 -12.722,-49.676 -19.125,-49.676C-34.44,-49.676 -45.785,-38.817 -45.785,-22.529C-46.028,-6.564 -33.954,5.104 -18.152,4.861C-13.047,4.861 -8.59,3.97 -4.862,2.268L-4.862,-4.539C-4.862,-11.589 -6.159,-17.667 -8.833,-22.61L5.106,-22.61C4.052,-19.935 3.404,-15.236 3.404,-10.778L3.404,-3.323C3.404,1.296 3.809,4.861 4.62,7.374C-2.188,10.048 -10.453,11.668 -18.476,11.668C-43.435,11.831 -55.104,-3.485 -54.942,-20.989C-55.185,-41.491 -39.788,-56.564 -18.314,-56.321C-11.912,-56.321 -5.834,-55.673 0,-54.295L0,-44.733Z" fill="#FFF3E1" />
                                        </g>
                                        <g transform="matrix(1,0,0,1,808.144,355.97)">
                                            <path d="M0,55.185C13.695,55.428 23.824,43.515 23.662,29.334C23.986,13.775 11.507,-0.325 -2.998,-0.001C-15.398,-0.163 -26.337,10.453 -26.094,25.768C-26.337,41.166 -15.235,55.509 0,55.185M-1.621,61.587C-21.556,61.911 -35.575,45.055 -35.251,27.471C-35.575,9.156 -19.935,-6.726 -1.297,-6.403C17.18,-6.726 33.144,7.536 32.819,27.308C33.224,46.838 17.422,61.911 -1.621,61.587" fill="#FFF3E1" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <p className="mt-1 max-w-[14rem] font-serif text-[11px] leading-relaxed text-[#FFF3E1]/90 md:max-w-xs md:text-sm md:leading-relaxed" aria-hidden>
                                Un club residencial donde la vida se organiza en conexión con la tierra, el agua, los jardines y una comunidad que se forma con intención.
                            </p>
                            <p className="mt-3 font-sans text-[9px] uppercase tracking-[0.22em] text-[#FFF3E1]/65" aria-hidden>
                                — Explorar —
                            </p>
                        </div>
                    </div>
                </div>

                <aside className="hero-workbench-panel order-3 flex min-h-0 flex-col overflow-hidden border border-[#1f1a16]/12 bg-[#fff8ed]/92 xl:h-[calc(100dvh-24px)]">
                    <div className="flex items-center justify-between border-b border-[#1f1a16]/10 px-3 py-3">
                        <div>
                            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-[#aa7d69]">
                                Selection
                            </p>
                            <h2 className="mt-1 font-serif text-lg leading-tight text-[#1c1713]">
                                {selectedPlaced
                                    ? getAssetLabel(selectedPlaced.assetId, assets)
                                    : selectedCloud
                                        ? getAssetLabel(selectedCloud.assetId, assets)
                                        : "Scene"}
                            </h2>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                className="grid size-7 place-items-center border border-[#1f1a16]/12 text-[#57483e] transition-colors hover:bg-[#ede5da]"
                                title="Copy scene JSON"
                                aria-label="Copy scene JSON"
                                onClick={copyScene}
                            >
                                {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
                            </button>
                            <button
                                type="button"
                                className="grid size-7 place-items-center border border-[#1f1a16]/12 text-[#57483e] transition-colors hover:bg-[#ede5da]"
                                title="Reset scene"
                                aria-label="Reset scene"
                                onClick={resetScene}
                            >
                                <RotateCcw className="size-3.5" aria-hidden />
                            </button>
                        </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto">
                    <div className="grid gap-3 p-3">
                        {selectedPlaced && (
                            <>
                                <ControlRange
                                    label="Size"
                                    min={4}
                                    max={28}
                                    step={0.5}
                                    value={selectedPlaced.size}
                                    onChange={(size) => updateSelectedPlaced({ size })}
                                />
                                <ControlRange
                                    label="Rotate"
                                    min={-32}
                                    max={32}
                                    step={1}
                                    value={selectedPlaced.rotation}
                                    onChange={(rotation) => updateSelectedPlaced({ rotation })}
                                />
                                <ControlRange
                                    label="Opacity"
                                    min={0.15}
                                    max={1}
                                    step={0.01}
                                    value={selectedPlaced.opacity}
                                    onChange={(opacity) => updateSelectedPlaced({ opacity })}
                                />
                                <label className="flex items-center justify-between gap-3 border border-[#1f1a16]/10 px-2.5 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#57483e]">
                                    Flip
                                    <input
                                        type="checkbox"
                                        checked={selectedPlaced.flipped}
                                        onChange={(event) => updateSelectedPlaced({ flipped: event.target.checked })}
                                        className="size-3.5 accent-[#aa7d69]"
                                    />
                                </label>
                            </>
                        )}

                        {selectedCloud && (
                            <>
                                <ControlRange
                                    label="Sky"
                                    min={0}
                                    max={34}
                                    step={0.5}
                                    value={selectedCloud.top}
                                    onChange={(top) => updateSelectedCloud({ top })}
                                />
                                <ControlRange
                                    label="Width"
                                    min={12}
                                    max={46}
                                    step={0.5}
                                    value={selectedCloud.size}
                                    onChange={(size) => updateSelectedCloud({ size })}
                                />
                                <ControlRange
                                    label="Speed"
                                    min={58}
                                    max={180}
                                    step={1}
                                    value={selectedCloud.duration}
                                    onChange={(duration) => updateSelectedCloud({ duration })}
                                />
                                <ControlRange
                                    label="Opacity"
                                    min={0.1}
                                    max={0.92}
                                    step={0.01}
                                    value={selectedCloud.opacity}
                                    onChange={(opacity) => updateSelectedCloud({ opacity })}
                                />
                                <ControlRange
                                    label="Rotate"
                                    min={-10}
                                    max={10}
                                    step={1}
                                    value={selectedCloud.rotation}
                                    onChange={(rotation) => updateSelectedCloud({ rotation })}
                                />
                            </>
                        )}

                        {!selectedPlaced && !selectedCloud && (
                            <div className="border border-[#1f1a16]/10 bg-[#fff9f2] p-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <Stat label="Clouds" value={clouds.length} />
                                    <Stat label="Assets" value={placed.length} />
                                </div>
                            </div>
                        )}

                        <label className="grid cursor-pointer place-items-center border border-dashed border-[#aa7d69]/45 bg-[#fff9f2] px-3 py-3 text-center text-[#57483e] transition-colors hover:bg-[#ede5da]">
                            <ImagePlus className="mb-1.5 size-4" aria-hidden />
                            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.22em]">Add PNG</span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="sr-only"
                                onChange={(event) => {
                                    const files = event.target.files;
                                    if (!files?.length) return;
                                    handleDropFiles(files, { x: 50, y: 76 });
                                    event.target.value = "";
                                }}
                            />
                        </label>

                        <button
                            type="button"
                            className="flex h-8 items-center justify-center gap-2 border border-[#8b3e2f]/25 bg-[#fff9f2] font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-[#8b3e2f] transition-colors hover:bg-[#8b3e2f] hover:text-[#fff9f2] disabled:pointer-events-none disabled:opacity-40"
                            onClick={removeSelection}
                            disabled={!selection}
                        >
                            <Trash2 className="size-3.5" aria-hidden />
                            Remove
                        </button>
                    </div>
                    </div>
                </aside>
            </section>
        </main>
    );
}

function ControlRange({
    label,
    min,
    max,
    step,
    value,
    onChange,
}: {
    label: string;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
}) {
    return (
        <label className="grid gap-1 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#57483e]">
            <span className="flex items-center justify-between gap-3">
                {label}
                <span className="text-[#aa7d69]">{Number(value).toFixed(step < 1 ? 1 : 0)}</span>
            </span>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => onChange(Number(event.target.value))}
                className="hero-workbench-range"
            />
        </label>
    );
}

function Stat({ label, value }: { label: string; value: number }) {
    return (
        <div className="border border-[#1f1a16]/10 p-2">
            <div className="font-serif text-2xl leading-none text-[#1c1713]">{value}</div>
            <div className="mt-1 font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-[#57483e]">{label}</div>
        </div>
    );
}
