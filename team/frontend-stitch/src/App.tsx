import { useEffect, useState } from 'react'

interface Project {
  id: string;
  title: string;
  categories: string[];
  tags: string[];
  description: string;
  image: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8000/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch projects:", err)
        setLoading(false)
      })
  }, [])

  const [chatOpen, setChatOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [chatHistory, setChatHistory] = useState<{q: string, a: string}[]>([])

  const handleChat = async () => {
    if (!question.trim()) return
    const newChat = { q: question, a: 'Thinking...' }
    setChatHistory([...chatHistory, newChat])
    setQuestion('')
    
    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      })
      const data = await res.json()
      setChatHistory(prev => prev.map((c, i) => i === prev.length - 1 ? { ...c, a: data.answer } : c))
    } catch (err) {
      setChatHistory(prev => prev.map((c, i) => i === prev.length - 1 ? { ...c, a: 'Error: Could not connect to backend.' } : c))
    }
  }

  return (
    <div className="min-h-screen p-8 bg-[#0a0a0f] text-white">
      <header className="mb-12 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-[#c8f04d] mb-2">Nagendra's Research Hub</h1>
          <p className="text-[#6b6b80]">Dynamic repository for ML and Data Science papers.</p>
        </div>
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-[#c8f04d] text-black px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform"
        >
          {chatOpen ? 'Close AI Chat' : 'Ask AI Agent'}
        </button>
      </header>

      <main className="flex gap-8">
        <div className={chatOpen ? "w-2/3" : "w-full"}>
          {loading ? (
            <p>Loading papers...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(project => (
                <div key={project.id} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-[#c8f04d]/50 transition-colors group">
                  <div className="flex gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider bg-[#c8f04d]/10 text-[#c8f04d] px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#c8f04d] transition-colors">{project.title}</h3>
                  <p className="text-[#6b6b80] text-sm line-clamp-2 mb-4">{project.description}</p>
                  <button className="text-[#c8f04d] text-sm font-medium hover:underline inline-flex items-center gap-1">
                    Read Paper <span>→</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {chatOpen && (
          <div className="w-1/3 bg-white/5 border border-white/10 rounded-xl flex flex-col h-[600px] sticky top-24">
            <div className="p-4 border-bottom border-white/10 font-bold text-[#c8f04d]">AI Researcher Chat</div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 && (
                <p className="text-[#6b6b80] text-sm italic">Ask anything about Nagendra's projects!</p>
              )}
              {chatHistory.map((chat, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-right"><span className="inline-block bg-[#c8f04d]/20 px-3 py-1 rounded-lg text-sm">{chat.q}</span></div>
                  <div className="text-left"><span className="inline-block bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-sm whitespace-pre-wrap">{chat.a}</span></div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/10 flex gap-2">
              <input 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                placeholder="Ask about Sales Forecasting..."
                className="flex-1 bg-black border border-white/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#c8f04d]"
              />
              <button onClick={handleChat} className="bg-[#c8f04d] text-black px-4 py-2 rounded font-bold text-sm">Send</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
