import Link from '../link';
import styles from './blog.module.css';

function Inline({ content }) {
  return content.map((run, index) => run.href
    ? run.href.startsWith('/ar/')
      ? <Link key={index} href={run.href}>{run.text}</Link>
      : <a key={index} href={run.href} target="_blank" rel="noopener noreferrer">{run.text}</a>
    : run.text);
}

// Typed source data, never Word HTML or executable Markdown. React escapes text.
export default function ArticleBlocks({ blocks }) {
  return <div className={`${styles.proseSection} ${styles.wordArticle}`}>{blocks.map((block, index) => {
    switch (block.type) {
      case 'h2': return <h2 id={block.id} key={index}>{block.text}</h2>;
      case 'h3': return <h3 id={block.id} key={index}>{block.text}</h3>;
      case 'p': return <p key={index}><Inline content={block.content} /></p>;
      case 'ol': return <ol key={index}>{block.items.map((item, i) => <li key={i}><Inline content={item} /></li>)}</ol>;
      case 'table': return <div key={index} className={styles.tableScroll} role="region" tabIndex={0} aria-label={`جدول: ${block.headers.join('، ')}`}><table><thead><tr>{block.headers.map((cell, i) => <th key={i} scope="col">{cell}</th>)}</tr></thead><tbody>{block.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
      case 'image': return <figure className={styles.wordFigure} key={index}><img src={block.src} srcSet={block.srcSet} sizes="(max-width: 780px) 90vw, (max-width: 1100px) 65vw, 720px" width={block.width} height={block.height} alt={block.alt} loading={block.kind === 'hero' ? 'eager' : 'lazy'} fetchPriority={block.kind === 'hero' ? 'high' : undefined} decoding="async" />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
      default: return null;
    }
  })}</div>;
}
