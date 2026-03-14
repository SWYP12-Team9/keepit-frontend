import type { ReactNode } from 'react'

interface MarkdownContentProps {
  content: string
  className?: string
}

const INLINE_MARKDOWN_REGEX =
  /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0

  for (const match of text.matchAll(INLINE_MARKDOWN_REGEX)) {
    const [fullMatch, , linkText, linkHref, boldText, codeText] = match
    const matchIndex = match.index ?? 0

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex))
    }

    if (linkText && linkHref) {
      nodes.push(
        <a
          key={`${linkHref}-${matchIndex}`}
          href={linkHref}
          target="_blank"
          rel="noreferrer"
          className="text-blue-normal underline underline-offset-2"
        >
          {linkText}
        </a>,
      )
    } else if (boldText) {
      nodes.push(<strong key={`bold-${matchIndex}`}>{boldText}</strong>)
    } else if (codeText) {
      nodes.push(
        <code
          key={`code-${matchIndex}`}
          className="rounded-[4px] bg-white px-[4px] py-[1px] text-[0.95em]"
        >
          {codeText}
        </code>,
      )
    }

    lastIndex = matchIndex + fullMatch.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function renderParagraph(text: string, key: string) {
  const lines = text.split('\n')

  return (
    <p key={key}>
      {lines.map((line, index) => (
        <span key={`${key}-line-${index}`}>
          {renderInline(line)}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  )
}

function renderBlock(block: string, index: number) {
  const trimmedBlock = block.trim()
  const key = `block-${index}`

  if (!trimmedBlock) return null

  const orderedItems = trimmedBlock
    .split('\n')
    .map((line) => line.match(/^\d+\.\s+(.+)$/)?.[1] ?? null)

  if (orderedItems.every(Boolean)) {
    return (
      <ol key={key} className="list-decimal space-y-[4px] pl-[20px]">
        {orderedItems.map((item, itemIndex) => (
          <li key={`${key}-ordered-${itemIndex}`}>
            {renderInline(item ?? '')}
          </li>
        ))}
      </ol>
    )
  }

  const unorderedItems = trimmedBlock
    .split('\n')
    .map((line) => line.match(/^[-*]\s+(.+)$/)?.[1] ?? null)

  if (unorderedItems.every(Boolean)) {
    return (
      <ul key={key} className="list-disc space-y-[4px] pl-[20px]">
        {unorderedItems.map((item, itemIndex) => (
          <li key={`${key}-unordered-${itemIndex}`}>
            {renderInline(item ?? '')}
          </li>
        ))}
      </ul>
    )
  }

  return renderParagraph(trimmedBlock, key)
}

export default function MarkdownContent({
  content,
  className = '',
}: MarkdownContentProps) {
  const blocks = content.split(/\n{2,}/)

  return (
    <div className={`space-y-[10px] ${className}`.trim()}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  )
}
