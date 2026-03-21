import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const serif = { fontFamily: "var(--font-serif)" } as const;

export function BlogMarkdown({ children }: { children: string }) {
    return (
        <div
            className="blog-md text-[#222]/80 text-base md:text-lg leading-relaxed"
            style={serif}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h2: (props) => (
                        <h2
                            className="text-[#222] text-xl md:text-2xl mt-12 mb-4 first:mt-0 font-normal leading-snug"
                            style={serif}
                            {...props}
                        />
                    ),
                    h3: (props) => (
                        <h3
                            className="text-[#222] text-lg md:text-[1.35rem] mt-10 mb-3 first:mt-0 font-normal leading-snug"
                            style={serif}
                            {...props}
                        />
                    ),
                    p: (props) => <p className="mb-6 last:mb-0" {...props} />,
                    ul: (props) => (
                        <ul
                            className="my-4 mb-6 space-y-2 list-disc pl-6 marker:text-[#AA7D69]"
                            {...props}
                        />
                    ),
                    ol: (props) => (
                        <ol className="my-4 mb-6 space-y-2 list-decimal pl-6" {...props} />
                    ),
                    li: (props) => <li className="pl-1 [&>p]:mb-0" {...props} />,
                    blockquote: (props) => (
                        <blockquote
                            className="border-l-2 border-[#AA7D69]/45 pl-5 my-8 py-1 text-[#222]/85 [&>p]:mb-0"
                            {...props}
                        />
                    ),
                    hr: () => <hr className="my-10 border-0 border-t border-[#222]/12" />,
                    strong: (props) => (
                        <strong className="font-semibold text-[#222]" {...props} />
                    ),
                    em: (props) => <em className="italic" {...props} />,
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
}
