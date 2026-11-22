export function articleFaqs(blocks) {
  const start = blocks.findIndex(block => block.type === 'h2' && block.text.startsWith('أسئلة شائعة'));
  if (start < 0) return [];
  const questions = [];
  let current;
  for (const block of blocks.slice(start + 1)) {
    if (block.type === 'h2') break;
    if (block.type === 'h3') {
      current = { id: block.id, question: block.text, answer: [] };
      questions.push(current);
    } else if (current && block.type === 'p') {
      current.answer.push(block.content.map(run => run.text).join(''));
    }
  }
  return questions.filter(item => item.answer.length).map(item => ({ ...item, answer: item.answer.join('\n\n') }));
}
