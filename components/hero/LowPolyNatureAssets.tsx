import type { SVGProps } from "react";

type NatureAssetProps = SVGProps<SVGSVGElement>;

type BigTreeLeafClusterProps = {
    x: number;
    y: number;
    scale: number;
    scaleX?: number;
    scaleY?: number;
    rotate?: number;
    light?: boolean;
    variant?: 0 | 1 | 2 | 3;
};

function BigTreeLeafCluster({ x, y, scale, scaleX, scaleY, rotate = 0, light = false, variant = 0 }: BigTreeLeafClusterProps) {
    const base = light ? "#707744" : "#596a3b";
    const mid = light ? "#89884d" : "#6c7440";
    const deep = light ? "#4e6335" : "#3d5630";
    const warm = light ? "#9a9051" : "#7d7a43";
    const leafPatterns = [
        [
            { cx: -20, cy: -5, rx: 6.1, ry: 4.7, r: -24, fill: deep },
            { cx: -14, cy: -18, rx: 6, ry: 4.6, r: 18, fill: base },
            { cx: 0, cy: -24, rx: 6.3, ry: 4.8, r: -8, fill: warm },
            { cx: 15, cy: -18, rx: 6.1, ry: 4.8, r: 22, fill: mid },
            { cx: 23, cy: -5, rx: 6.2, ry: 4.6, r: -16, fill: deep },
            { cx: 19, cy: 9, rx: 6.6, ry: 4.8, r: 18, fill: base },
            { cx: 4, cy: 18, rx: 6.4, ry: 4.7, r: -4, fill: deep },
            { cx: -12, cy: 14, rx: 6.1, ry: 4.5, r: 19, fill: warm },
            { cx: -24, cy: 5, rx: 5.9, ry: 4.5, r: -18, fill: mid },
            { cx: -6, cy: -4, rx: 6.8, ry: 5, r: 6, fill: mid },
            { cx: 8, cy: -3, rx: 6.5, ry: 4.9, r: -16, fill: base },
            { cx: 4, cy: 8, rx: 6.3, ry: 4.7, r: 25, fill: deep },
        ],
        [
            { cx: -22, cy: -10, rx: 5.7, ry: 4.4, r: -12, fill: deep },
            { cx: -9, cy: -20, rx: 6.3, ry: 4.8, r: 20, fill: warm },
            { cx: 8, cy: -22, rx: 5.8, ry: 4.4, r: -15, fill: mid },
            { cx: 22, cy: -12, rx: 6.3, ry: 4.8, r: 17, fill: base },
            { cx: 25, cy: 5, rx: 5.8, ry: 4.4, r: -18, fill: deep },
            { cx: 11, cy: 16, rx: 6.3, ry: 4.8, r: 11, fill: mid },
            { cx: -7, cy: 15, rx: 6, ry: 4.5, r: -12, fill: base },
            { cx: -22, cy: 4, rx: 6.1, ry: 4.6, r: 18, fill: deep },
            { cx: -9, cy: -5, rx: 6.2, ry: 4.8, r: -22, fill: mid },
            { cx: 6, cy: -4, rx: 6.7, ry: 5, r: 9, fill: deep },
            { cx: 2, cy: 7, rx: 6, ry: 4.5, r: -8, fill: warm },
        ],
        [
            { cx: -19, cy: -13, rx: 5.6, ry: 4.3, r: 18, fill: base },
            { cx: -3, cy: -24, rx: 6, ry: 4.5, r: -14, fill: warm },
            { cx: 14, cy: -19, rx: 6.1, ry: 4.6, r: 17, fill: deep },
            { cx: 25, cy: -3, rx: 6.1, ry: 4.5, r: -15, fill: mid },
            { cx: 18, cy: 13, rx: 6.2, ry: 4.6, r: 14, fill: base },
            { cx: 2, cy: 20, rx: 6.3, ry: 4.7, r: -8, fill: deep },
            { cx: -16, cy: 12, rx: 5.9, ry: 4.4, r: 18, fill: mid },
            { cx: -25, cy: -1, rx: 5.8, ry: 4.3, r: -16, fill: deep },
            { cx: -7, cy: -8, rx: 6.5, ry: 4.8, r: 7, fill: mid },
            { cx: 8, cy: -6, rx: 6.4, ry: 4.9, r: -19, fill: warm },
            { cx: 4, cy: 7, rx: 6.8, ry: 5, r: 12, fill: base },
        ],
        [
            { cx: -17, cy: -7, rx: 5.4, ry: 4.1, r: -19, fill: deep },
            { cx: -8, cy: -17, rx: 5.5, ry: 4.2, r: 13, fill: mid },
            { cx: 6, cy: -18, rx: 5.6, ry: 4.2, r: -16, fill: warm },
            { cx: 18, cy: -8, rx: 5.8, ry: 4.3, r: 14, fill: base },
            { cx: 18, cy: 6, rx: 5.6, ry: 4.1, r: -13, fill: deep },
            { cx: 6, cy: 15, rx: 5.8, ry: 4.2, r: 11, fill: mid },
            { cx: -9, cy: 12, rx: 5.5, ry: 4.1, r: -10, fill: base },
            { cx: -20, cy: 3, rx: 5.4, ry: 4.1, r: 16, fill: warm },
            { cx: -4, cy: -3, rx: 6, ry: 4.5, r: -16, fill: mid },
            { cx: 8, cy: -2, rx: 5.9, ry: 4.5, r: 17, fill: deep },
            { cx: 2, cy: 8, rx: 5.7, ry: 4.2, r: -7, fill: base },
        ],
    ];
    const leaves = leafPatterns[variant];

    return (
        <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scaleX ?? scale} ${scaleY ?? scale})`}>
            <g>
                {leaves.map((leaf, index) => (
                    <ellipse
                        key={`${leaf.cx}-${leaf.cy}-${index}`}
                        cx={leaf.cx}
                        cy={leaf.cy}
                        rx={leaf.rx}
                        ry={leaf.ry}
                        fill={leaf.fill}
                        transform={`rotate(${leaf.r} ${leaf.cx} ${leaf.cy})`}
                    />
                ))}
                <path d="M-9 -16 L10 -20 L18 -1 L4 15 L-16 9 Z" fill={warm} opacity="0.18" />
                <path d="M-21 0 L2 -8 L18 8 L-3 18 Z" fill={deep} opacity="0.18" />
                <circle cx="-1" cy="1" r="2.2" fill="#5f5231" opacity="0.34" />
            </g>
        </g>
    );
}

export function LowPolyReferenceTree({ className, ...props }: NatureAssetProps) {
    return (
        <svg
            {...props}
            viewBox="34 8 172 200"
            role="img"
            aria-label="Low poly tree study"
            className={className}
            shapeRendering="geometricPrecision"
        >
            <defs>
                <filter id="lowPolyTreeSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.6" />
                </filter>
            </defs>

            <g transform="translate(0 2)">
                <ellipse cx="110" cy="195" rx="36" ry="5.5" fill="#26351f" opacity="0.2" filter="url(#lowPolyTreeSoftShadow)" />

                <path d="M105 198 L116 198 L114 103 L108 103 Z" fill="#5a371f" />
                <path d="M111 104 L116 198 L120 198 L117 112 Z" fill="#3f2515" opacity="0.58" />
                <path d="M102 198 L118 198 L116 191 L106 191 Z" fill="#4a2c19" opacity="0.9" />

                <path d="M109 120 C98 106 90 96 76 84" stroke="#4b2f1e" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M112 116 C126 98 139 84 158 66" stroke="#4b2f1e" strokeWidth="3.3" fill="none" strokeLinecap="round" />
                <path d="M111 114 C108 96 106 80 104 62" stroke="#4b2f1e" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M107 134 C95 122 84 111 71 100" stroke="#654028" strokeWidth="2.1" fill="none" strokeLinecap="round" />
                <path d="M116 130 C130 118 140 106 151 91" stroke="#654028" strokeWidth="2.1" fill="none" strokeLinecap="round" />
                <path d="M110 126 C101 113 96 101 89 87" stroke="#5c3a25" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M113 123 C124 111 132 99 140 82" stroke="#5c3a25" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M111 142 C101 132 94 124 86 116" stroke="#6a452c" strokeWidth="1.65" fill="none" strokeLinecap="round" />
                <path d="M115 142 C126 132 137 124 151 116" stroke="#6a452c" strokeWidth="1.65" fill="none" strokeLinecap="round" />

                <g opacity="0.99" transform="translate(110 84) scale(0.8) translate(-110 -84)">
                    <path d="M61 59 C47 67 39 87 40 106 C42 122 52 132 67 132 C84 132 94 118 93 97 C91 74 79 58 61 59 Z" fill="#657642" />
                    <path d="M61 59 C50 71 48 88 54 106 L72 91 L75 66 Z" fill="#85884a" opacity="0.68" />
                    <path d="M40 104 C44 122 54 132 67 132 L72 91 L54 106 Z" fill="#3f5b34" opacity="0.78" />
                    <path d="M75 66 L72 91 L92 97 C90 79 85 68 75 66 Z" fill="#52693c" />
                    <path d="M54 78 L42 96 L54 106 L66 85 Z" fill="#485f36" opacity="0.86" />
                    <path d="M66 114 L79 130 C89 123 94 111 92 97 L72 91 Z" fill="#374d2d" opacity="0.72" />

                    <path d="M104 21 C85 28 75 55 78 84 C82 111 97 126 115 118 C134 110 142 82 137 55 C132 31 120 18 104 21 Z" fill="#708044" />
                    <path d="M104 21 C93 39 91 65 98 88 L116 66 L114 24 Z" fill="#a39a50" opacity="0.82" />
                    <path d="M78 80 C82 106 96 124 115 118 L116 66 L98 88 Z" fill="#435f34" opacity="0.78" />
                    <path d="M114 24 L116 66 L137 55 C132 35 123 23 114 24 Z" fill="#818646" />
                    <path d="M98 88 L115 118 C129 110 138 88 138 63 L116 66 Z" fill="#536b38" opacity="0.78" />
                    <path d="M90 51 L78 80 L98 88 L100 58 Z" fill="#596e39" opacity="0.68" />

                    <path d="M154 29 C132 31 117 53 116 81 C115 110 133 129 160 127 C187 125 200 102 197 76 C195 49 179 27 154 29 Z" fill="#748047" />
                    <path d="M154 29 C138 41 132 61 137 82 L164 64 L173 35 Z" fill="#92924f" opacity="0.8" />
                    <path d="M116 81 C118 108 133 127 160 127 L164 64 L137 82 Z" fill="#4c6537" opacity="0.82" />
                    <path d="M173 35 L164 64 L195 77 C191 53 183 39 173 35 Z" fill="#808748" />
                    <path d="M164 64 L160 127 C181 125 197 104 197 76 Z" fill="#526b39" opacity="0.86" />
                    <path d="M129 57 L116 81 L137 82 L145 50 Z" fill="#607541" opacity="0.76" />
                    <path d="M151 98 L160 127 C178 125 190 114 196 96 L172 88 Z" fill="#405831" opacity="0.72" />
                </g>

                <g opacity="0.76">
                    <path d="M109 117 C101 105 94 95 84 84" stroke="#3f291b" strokeWidth="1.45" fill="none" strokeLinecap="round" />
                    <path d="M112 113 C122 101 131 91 144 77" stroke="#3f291b" strokeWidth="1.45" fill="none" strokeLinecap="round" />
                    <path d="M111 112 C108 96 107 83 106 69" stroke="#3f291b" strokeWidth="1.35" fill="none" strokeLinecap="round" />
                    <path d="M108 129 C99 120 90 112 80 106" stroke="#4f3422" strokeWidth="1.25" fill="none" strokeLinecap="round" />
                    <path d="M116 127 C129 118 139 110 151 98" stroke="#4f3422" strokeWidth="1.25" fill="none" strokeLinecap="round" />
                </g>
            </g>
        </svg>
    );
}

export function LowPolyBigTree({ className, ...props }: NatureAssetProps) {
    const canopy = [
        { x: 112, y: 30, scale: 0.82, rotate: -6, light: true, variant: 0 },
        { x: 80, y: 55, scale: 0.72, rotate: -19, light: false, variant: 2 },
        { x: 140, y: 58, scale: 0.7, rotate: 12, light: true, variant: 1 },
        { x: 165, y: 88, scale: 0.6, rotate: -8, light: false, variant: 3 },
        { x: 55, y: 108, scale: 0.65, rotate: -17, light: false, variant: 1 },
        { x: 99, y: 111, scale: 0.75, rotate: 7, light: true, variant: 2 },
        { x: 133, y: 120, scale: 0.68, rotate: -9, light: false, variant: 0 },
        { x: 159, y: 147, scale: 0.58, rotate: 10, light: true, variant: 3 },
        { x: 42, y: 160, scale: 0.51, rotate: -13, light: true, variant: 3 },
        { x: 82, y: 166, scale: 0.59, rotate: -3, light: false, variant: 0 },
        { x: 117, y: 168, scale: 0.63, rotate: 9, light: true, variant: 1 },
        { x: 146, y: 195, scale: 0.52, rotate: -8, light: false, variant: 2 },
        { x: 65, y: 218, scale: 0.46, rotate: 11, light: false, variant: 3 },
        { x: 111, y: 214, scale: 0.48, rotate: -7, light: true, variant: 0 },
        { x: 171, y: 227, scale: 0.43, rotate: 12, light: true, variant: 1 },
        { x: 31, y: 231, scale: 0.39, rotate: -17, light: false, variant: 2 },
    ] satisfies BigTreeLeafClusterProps[];

    const branchPaths = [
        { d: "M111 346 C113 300 116 250 117 197 C118 135 122 78 134 31", width: 5, tone: "dark" },
        { d: "M110 346 C105 300 98 256 87 214 C77 176 66 139 55 105", width: 4, tone: "dark" },
        { d: "M114 346 C123 296 137 251 153 208 C169 163 187 119 208 71", width: 3.55, tone: "dark" },
        { d: "M107 321 C91 278 75 243 54 209 C41 188 33 164 31 141", width: 2.35, tone: "mid" },
        { d: "M113 304 C131 261 151 226 178 191 C194 170 206 148 212 123", width: 2.25, tone: "mid" },
        { d: "M101 269 C83 237 65 214 38 194", width: 1.75, tone: "mid" },
        { d: "M115 257 C134 222 148 188 160 149", width: 1.8, tone: "mid" },
        { d: "M95 215 C80 182 75 143 80 79", width: 1.55, tone: "mid" },
        { d: "M112 198 C101 163 100 122 108 60", width: 1.7, tone: "mid" },
        { d: "M125 188 C132 141 137 94 143 50", width: 1.65, tone: "mid" },
        { d: "M139 181 C153 140 165 110 184 86", width: 1.65, tone: "mid" },
        { d: "M150 206 C161 182 176 163 196 145", width: 1.45, tone: "mid" },
        { d: "M88 177 C73 158 63 139 55 111", width: 1.25, tone: "soft" },
        { d: "M131 152 C146 128 157 103 164 78", width: 1.25, tone: "soft" },
        { d: "M66 224 C53 231 42 236 30 231", width: 1.1, tone: "soft" },
        { d: "M142 239 C154 231 164 227 178 226", width: 1.1, tone: "soft" },
    ];

    const twigs = [
        "M92 207 C78 191 64 180 48 173",
        "M99 178 C88 157 84 137 85 113",
        "M104 145 C91 124 84 101 83 65",
        "M116 155 C111 120 114 81 124 46",
        "M130 148 C142 117 151 88 156 61",
        "M145 160 C159 135 174 111 193 92",
        "M153 188 C166 168 179 153 195 141",
        "M69 235 C58 226 47 219 34 216",
        "M112 231 C101 220 91 214 79 211",
        "M144 234 C155 225 166 219 180 217",
    ];

    return (
        <svg
            {...props}
            viewBox="0 0 240 360"
            role="img"
            aria-label="Low poly big tree"
            className={className}
            shapeRendering="geometricPrecision"
        >
            <defs>
                <filter id="lowPolyBigTreeSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.8" />
                </filter>
            </defs>

            <ellipse cx="111" cy="348" rx="31" ry="5.6" fill="#26351f" opacity="0.16" filter="url(#lowPolyBigTreeSoftShadow)" />

            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                {branchPaths.map((branch, index) => (
                    <path key={branch.d} d={branch.d} stroke={branch.tone === "dark" ? "#4a2d20" : "#5b3927"} strokeWidth={branch.width} opacity={branch.tone === "soft" ? 0.62 : index < 3 ? 0.96 : 0.78} />
                ))}
            </g>

            <path d="M103 348 L116 348 C116 312 115 278 113 246 C111 210 111 177 116 143 C108 192 105 263 103 348 Z" fill="#684023" />
            <path d="M113 348 L122 348 C121 309 120 271 118 231 C117 190 123 150 134 112 C119 178 115 263 113 348 Z" fill="#3c2418" opacity="0.62" />
            <path d="M101 348 L123 348 L118 337 L107 337 Z" fill="#45291a" opacity="0.9" />
            <path d="M108 286 L117 255 L116 306 Z" fill="#8b5a2f" opacity="0.38" />
            <path d="M113 212 L122 168 L117 238 Z" fill="#8f6034" opacity="0.25" />

            <g fill="none" stroke="#3d281d" strokeLinecap="round" opacity="0.52">
                {twigs.map((d) => (
                    <path key={d} d={d} strokeWidth="1.05" />
                ))}
            </g>

            <g opacity="0.98">
                {canopy.map((cluster) => (
                    <BigTreeLeafCluster key={`${cluster.x}-${cluster.y}`} {...cluster} />
                ))}
            </g>

            <g transform="translate(121 328)" opacity="0.95">
                <path d="M2 19 C4 10 8 3 12 0 C10 10 8 16 7 22 Z" fill="#6d7c49" />
                <path d="M12 21 C15 11 22 5 29 2 C24 11 20 17 18 23 Z" fill="#536b3d" />
                <path d="M22 21 C28 12 35 7 43 8 C35 15 31 20 29 24 Z" fill="#7d8a55" />
                <path d="M10 23 C8 15 3 10 -4 8 C0 17 2 21 4 25 Z" fill="#415f36" />
                <circle cx="26" cy="10" r="2.1" fill="#bd713a" />
                <circle cx="33" cy="16" r="1.85" fill="#d69b54" />
                <circle cx="18" cy="6" r="1.7" fill="#d05a3f" />
            </g>

        </svg>
    );
}

export function LowPolyGroundShrub({ className, ...props }: NatureAssetProps) {
    return (
        <svg
            {...props}
            viewBox="0 0 170 105"
            role="img"
            aria-label="Low poly ground shrub"
            className={className}
            shapeRendering="geometricPrecision"
        >
            <defs>
                <filter id="lowPolyShrubSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.2" />
                </filter>
            </defs>

            <ellipse cx="83" cy="91" rx="55" ry="6" fill="#2b3f25" opacity="0.18" filter="url(#lowPolyShrubSoftShadow)" />
            <path d="M17 82 C23 63 34 58 45 69 C53 53 70 52 78 68 C90 58 105 63 110 80 C87 92 46 92 17 82 Z" fill="#607844" />
            <path d="M45 69 C54 52 70 52 78 68 L63 77 L38 83 Z" fill="#7f8f55" opacity="0.78" />
            <path d="M17 82 C23 63 34 58 45 69 L38 83 Z" fill="#405f36" />
            <path d="M78 68 C90 58 105 63 110 80 L83 83 Z" fill="#48663a" />
            <path d="M41 74 L63 77 L56 90 L25 85 Z" fill="#344f31" opacity="0.78" />
            <path d="M63 77 L83 83 L77 91 L56 90 Z" fill="#536f3e" opacity="0.9" />
            <path d="M83 83 L110 80 C104 88 94 92 77 91 Z" fill="#365330" opacity="0.78" />

            <path d="M121 84 C126 70 135 67 142 77 C149 68 158 72 162 84 C151 91 132 92 121 84 Z" fill="#526f3f" />
            <path d="M142 77 C148 68 158 72 162 84 L145 87 Z" fill="#708553" opacity="0.72" />
            <path d="M121 84 C126 70 135 67 142 77 L134 88 Z" fill="#365a35" opacity="0.84" />

            <circle cx="35" cy="76" r="2.1" fill="#bd7740" />
            <circle cx="52" cy="72" r="1.55" fill="#d0a35d" />
            <circle cx="99" cy="76" r="1.8" fill="#a9693a" />
            <circle cx="151" cy="80" r="1.5" fill="#c18a4a" />
        </svg>
    );
}

export function LowPolyAgaveCluster({ className, ...props }: NatureAssetProps) {
    return (
        <svg
            {...props}
            viewBox="0 0 170 130"
            role="img"
            aria-label="Low poly agave cluster"
            className={className}
            shapeRendering="geometricPrecision"
        >
            <defs>
                <filter id="lowPolyAgaveSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.35" />
                </filter>
            </defs>

            <ellipse cx="86" cy="110" rx="50" ry="6" fill="#2c3f27" opacity="0.18" filter="url(#lowPolyAgaveSoftShadow)" />
            <path d="M82 108 C66 85 60 62 59 34 C78 57 88 82 82 108 Z" fill="#617e4c" />
            <path d="M83 108 C87 78 98 50 116 25 C116 56 105 87 83 108 Z" fill="#6f8958" />
            <path d="M84 109 C98 85 120 70 147 61 C133 86 111 103 84 109 Z" fill="#4f7244" />
            <path d="M83 108 C65 95 43 87 18 85 C42 72 67 80 83 108 Z" fill="#557642" />
            <path d="M82 109 C77 83 80 57 90 31 C101 58 99 85 82 109 Z" fill="#7f925b" />
            <path d="M83 108 C92 82 105 63 124 51 C118 78 104 98 83 108 Z" fill="#3f643c" opacity="0.88" />
            <path d="M82 108 C71 88 66 71 67 51 C79 67 86 87 82 108 Z" fill="#435f37" opacity="0.8" />
            <path d="M83 108 C64 96 48 90 29 89 C49 84 68 90 83 108 Z" fill="#6f8751" opacity="0.82" />
            <path d="M84 109 C107 94 125 80 139 66 C132 82 112 102 84 109 Z" fill="#365a34" opacity="0.78" />
            <path d="M81 109 C77 92 79 75 88 57 L92 93 Z" fill="#4c6c40" opacity="0.74" />
        </svg>
    );
}
