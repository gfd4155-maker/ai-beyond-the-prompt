import { HashRouter, Route, Routes } from 'react-router-dom'
import { TopBar } from './components/layout/TopBar'
import { SlideDeckPage } from './components/deck/SlideDeckPage'
import { GlossaryProvider } from './context/GlossaryContext'
import { ChatbotVsAgentScreen } from './features/chatbot-vs-agent/ChatbotVsAgentScreen'
import { PromptImprovementScreen } from './features/prompt-improvement/PromptImprovementScreen'
import { HomePage } from './pages/HomePage'
import { ReadingModePage } from './pages/ReadingModePage'

export default function App() {
  return (
    <GlossaryProvider>
      <HashRouter>
        <div className="flex min-h-svh flex-col">
          <TopBar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/deck/:index" element={<SlideDeckPage />} />
              <Route path="/read" element={<ReadingModePage />} />
              <Route path="/chatbot-vs-agent" element={<ChatbotVsAgentScreen />} />
              <Route path="/prompt-improvement" element={<PromptImprovementScreen />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </GlossaryProvider>
  )
}
