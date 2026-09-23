import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Glossary for Business Professionals',
  description: 'Plain-English definitions of the AI terms you hear most, and what they actually mean for your work.',
}

const TERMS = [
  {
    term: 'Agentic AI',
    definition: 'AI that takes sequences of actions on its own to complete a goal, rather than just answering a question.',
    explanation: `An agent can browse the web, run code, read and write files, and call external services — all in sequence, without you directing each step. This is the category that will change white-collar work most significantly over the next few years. Think of it as the difference between a calculator (you type, it responds) and an assistant who can go do a task and come back with results.`,
  },
  {
    term: 'Context Window',
    definition: 'The maximum amount of text an AI model can read and consider at one time.',
    explanation: `If you paste a 200-page document into an AI with a small context window, it will only see part of it. Models with larger context windows (measured in tokens) can handle longer documents, longer conversations, and more complex instructions. For practical work, this matters when you are analyzing long contracts, lengthy transcripts, or entire codebases.`,
  },
  {
    term: 'Embedding',
    definition: 'A numerical representation of text that captures its meaning so it can be compared mathematically to other text.',
    explanation: `This is what powers semantic search — searching by meaning rather than exact keywords. When a search system returns results that are conceptually similar to your query even if the words do not match, embeddings are doing that work. You will encounter this term when evaluating AI-powered search or knowledge base products.`,
  },
  {
    term: 'Fine-tuning',
    definition: 'A process that trains a pre-existing AI model further on a specific dataset to improve its performance on a particular task or domain.',
    explanation: `Fine-tuning is how you take a general model like GPT-4 and make it better at, say, writing in your company's brand voice or answering questions in your industry's terminology. It requires labeled training examples and some technical setup, but is increasingly accessible. Worth knowing: fine-tuning is not how you give an AI access to your proprietary documents — that is RAG.`,
  },
  {
    term: 'Foundation Model',
    definition: 'A large AI model trained on broad data that can be adapted to many different tasks.',
    explanation: `GPT-4, Claude, Gemini, and Llama are all foundation models. They are trained once at great cost and then used as the base for countless applications. When a company says their product is "powered by AI," they almost always mean they are building on top of a foundation model from Anthropic, OpenAI, Google, or Meta.`,
  },
  {
    term: 'Generative AI',
    definition: 'AI that creates new content: text, images, code, audio, or video.',
    explanation: `This is the category that has gotten most of the attention since 2022. ChatGPT, Claude, DALL-E, Midjourney, and ElevenLabs are all generative AI. The key word is "generates" — it produces new outputs rather than just classifying or predicting from existing data. Practically all of what business professionals encounter day-to-day falls in this category.`,
  },
  {
    term: 'Hallucination',
    definition: 'When an AI model confidently states something that is false.',
    explanation: `Models generate plausible text, and plausible is not the same as accurate. They will fabricate citations, invent statistics, and state wrong facts with complete confidence. This is not a bug that will be fully fixed — it is a property of how these models work. The practical implication: treat AI factual outputs as hypotheses to verify, especially for anything you will share externally or use to make decisions. <a href="/courses/ai-foundations-for-business/how-llms-work-in-plain-english" style="color:var(--accent);text-decoration:none">See the lesson on how LLMs work</a> for more on why this happens.`,
  },
  {
    term: 'LLM (Large Language Model)',
    definition: 'A type of AI model trained on massive amounts of text to understand and generate language.',
    explanation: `ChatGPT, Claude, and Gemini are all large language models. "Large" refers to the number of parameters (in the billions or trillions), and "language model" refers to the core task: predicting what text should come next. Despite the name, modern LLMs handle images, code, and structured data, not just language. When people say "AI" in a business context, they usually mean LLMs.`,
  },
  {
    term: 'Multimodal',
    definition: 'An AI model that can process multiple types of inputs — text, images, audio, or video — not just text alone.',
    explanation: `GPT-4o and Claude are multimodal: you can show them a photo, a chart, a screenshot, or a diagram and ask questions about it. This matters practically because a lot of business information lives in visual formats: slide decks, dashboards, whiteboard photos, product screenshots. A multimodal model can read and reason about these without you having to transcribe them.`,
  },
  {
    term: 'Prompt',
    definition: 'The input you give to an AI model — your question, instruction, or request.',
    explanation: `The quality of a prompt directly determines the quality of the response. A vague prompt gets a vague answer; a specific, well-structured prompt gets a useful one. "Prompt engineering" is the skill of writing prompts that consistently get good outputs. <a href="/courses/ai-foundations-for-business/how-to-prompt-well" style="color:var(--accent);text-decoration:none">The lesson on prompting</a> covers the patterns that work best in practice.`,
  },
  {
    term: 'RAG (Retrieval-Augmented Generation)',
    definition: 'A technique that gives an AI model access to a specific set of documents to draw from when answering questions.',
    explanation: `RAG is how enterprise "chat with your documents" products work. Instead of relying on the model's training data, the system retrieves relevant chunks from your document library and includes them in the context for each query. This is how you build an AI assistant that knows your company's internal policies, product documentation, or client contracts — without fine-tuning the model itself.`,
  },
  {
    term: 'System Prompt',
    definition: 'Instructions given to an AI model before the conversation starts that shape how it behaves throughout.',
    explanation: `When you set up custom instructions in ChatGPT, you are writing a system prompt. When a company deploys a customer service chatbot with a specific persona, they have written a system prompt. The system prompt is what differentiates "generic ChatGPT" from a product that feels purpose-built for a specific use case. Understanding this is useful when evaluating AI products — a lot of what looks like specialized capability is just careful prompting.`,
  },
  {
    term: 'Token',
    definition: 'The basic unit of text that AI models process — roughly three-quarters of a word on average.',
    explanation: `"Context window" and pricing are both measured in tokens. A 1,000-word document is approximately 1,300 tokens. When AI APIs charge per token, they are charging per unit of text processed. You will see token counts referenced when comparing models (context window size), managing costs (API pricing), or hitting limits in long conversations. Not something you need to think about daily, but useful to understand when evaluating tools.`,
  },
  {
    term: 'Zero-shot / Few-shot',
    definition: 'Ways of describing how many examples you give a model before asking it to do a task.',
    explanation: `"Zero-shot" means you give no examples — just the instruction. "Few-shot" means you provide a few examples of what you want before asking for the output. Few-shot prompting dramatically improves output quality for structured tasks: if you want the AI to always format something a specific way, showing it 2-3 examples of the format works far better than describing the format in words. A practical skill once you start using AI for recurring work.`,
  },
]

export default function GlossaryPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            name: 'AI Glossary for Business Professionals',
            description: 'Plain-English definitions of AI terms for business professionals.',
            url: 'https://shortaicourses.com/glossary',
          }),
        }}
      />

      <nav style={{ marginBottom: '32px' }}>
        <a href="/" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>← Home</a>
      </nav>

      <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-faint)', marginBottom: '14px' }}>
        AI Glossary
      </p>

      <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.2 }}>
        AI Terms Explained for Business Professionals
      </h1>

      <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '48px' }}>
        Plain-English definitions of the AI terms you hear most, and what they actually mean for your work.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
        {TERMS.map((item) => (
          <div key={item.term}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px', letterSpacing: '-0.01em' }}>
              {item.term}
            </h3>
            <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)', marginBottom: '8px', fontStyle: 'italic' }}>
              {item.definition}
            </p>
            <p
              style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: item.explanation }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '64px', padding: '28px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
        <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
          Learn these concepts in context
        </p>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
          The AI Foundations for Business course explains LLMs, prompting, and practical AI skills in under 40 minutes.
        </p>
        <a
          href="/courses/ai-foundations-for-business"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Start the course →
        </a>
        <a
          href="/courses"
          style={{
            display: 'inline-block',
            marginLeft: '16px',
            fontSize: '14px',
            color: 'var(--accent)',
            textDecoration: 'none',
          }}
        >
          Browse all courses
        </a>
      </div>
    </div>
  )
}
