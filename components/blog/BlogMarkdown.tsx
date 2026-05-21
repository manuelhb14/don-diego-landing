import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const serif = { fontFamily: "var(--font-serif)" } as const;

export function BlogMarkdown({ children }: { children: string }) {
    return (
        <div
            className="blog-md text-base leading-relaxed text-[#222]/78 md:text-lg"
            style={serif}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h2: (props) => (
                        <h2
                            className="mt-12 mb-4 text-2xl font-normal leading-[1.12] text-[#222] first:mt-0 md:text-3xl"
                            style={serif}
                            {...props}
                        />
                    ),
                    h3: (props) => (
                        <h3
                            className="mt-10 mb-3 text-xl font-normal leading-[1.18] text-[#222] first:mt-0 md:text-[1.45rem]"
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
                            className="my-8 border-y border-[#AA7D69]/28 bg-[#EFE6DC]/58 px-5 py-5 text-[#222]/84 [&>p]:mb-0"
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
