import { useState } from 'react'

const initialHabits = [
  { id: 1, name: 'Beber água', detail: '8 copos ao longo do dia', completed: true },
  { id: 2, name: 'Ler', detail: '20 páginas', completed: true },
  { id: 3, name: 'Movimentar o corpo', detail: '30 minutos', completed: false },
  { id: 4, name: 'Desconectar', detail: 'Sem telas às 22h', completed: false },
]

function App() {
  const [habits, setHabits] = useState(initialHabits)
  const completedCount = habits.filter((habit) => habit.completed).length
  const progress = Math.round((completedCount / habits.length) * 100)

  function toggleHabit(id: number) {
    setHabits((currentHabits) => currentHabits.map((habit) =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit,
    ))
  }

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/">daily<span>.</span></a>
        <div className="date-label">QUARTA, 02 DE SETEMBRO</div>
        <button className="profile-button" aria-label="Abrir perfil">JS</button>
      </header>
      <section className="intro">
        <p className="eyebrow">Seu espaço de constância</p>
        <h1>Pequenos passos,<br /><em>grandes mudanças.</em></h1>
        <p className="intro-copy">Uma pausa para perceber o que você está construindo todos os dias.</p>
      </section>
      <section className="progress-panel" aria-label="Progresso de hoje">
        <div className="progress-heading"><div><span className="section-label">Seu dia</span><strong>{completedCount} de {habits.length} hábitos concluídos</strong></div><span className="progress-value">{progress}%</span></div>
        <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
        <p className="progress-note">{progress === 100 ? 'Tudo certo por hoje.' : 'Você está no caminho. Continue assim.'}</p>
      </section>
      <section className="habits-section">
        <div className="section-header"><h2>Ritual de hoje</h2><button className="add-button" type="button">+ Adicionar hábito</button></div>
        <div className="habit-list">
          {habits.map((habit) => <button className={`habit-row${habit.completed ? ' is-complete' : ''}`} key={habit.id} onClick={() => toggleHabit(habit.id)} type="button">
            <span className="habit-icon" aria-hidden="true">{habit.completed ? '✓' : '○'}</span>
            <span className="habit-copy"><strong>{habit.name}</strong><small>{habit.detail}</small></span>
            <span className="checkmark" aria-hidden="true">{habit.completed ? '✓' : ''}</span>
          </button>)}
        </div>
      </section>
      <footer className="footer-note">A consistência é uma forma silenciosa de cuidado.</footer>
    </main>
  )
}

export default App
