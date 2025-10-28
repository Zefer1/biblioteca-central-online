import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'
import "./index.scss"

const Livros = () => {
  const [livros, setLivros] = useState([])
  const [loading, setLoading] = useState(true)

  async function getLivros() {
    try {
      setLoading(true)
      const response = await LivrosService.getLivros()
      console.log('API Response:', response) // Debug log
      
      // Handle different response formats
      const data = response.data;
      if (Array.isArray(data)) {
        setLivros(data)
      } else if (data && Array.isArray(data.livros)) {
        setLivros(data.livros)
      } else if (data && data.data && Array.isArray(data.data)) {
        setLivros(data.data)
      } else {
        console.error('Unexpected API response format:', data)
        setLivros([])
      }
    } catch (error) {
      console.error('Error loading books:', error)
      alert('Erro ao carregar livros')
      setLivros([])
    } finally {
      setLoading(false)
    }
  }

  async function deleteLivro(id) {
    if (confirm(`Você realmente deseja remover o livro de ID: ${id}?`)) {
      try {
        const { data } = await LivrosService.deleteLivro(id)
        alert(data.mensagem)
        getLivros()
      } catch (error) {
        alert('Erro ao deletar livro')
      }
    }
  }

  useEffect(() => { 
    getLivros() 
  }, [])

  return (
    <>
      <Header/>
      <SubmenuLivros/>
      <div className='livros'>
        <h1>Escolha o seu livro</h1>
        {loading ? (
          <p>Carregando livros...</p>
        ) : (
          <ul>
            {livros && livros.length > 0 ? (
              livros.map(l => (
                <li key={l.id}>
                  {l.titulo} <span>{l.editora}</span>
                  <div className='botoes'>
                    <Link className='btn edit' to={`/livros/edicao/${l.id}`}>✎</Link>
                    <button className='btn delete' type="button" onClick={()=>deleteLivro(l.id)}>🗑️</button>
                  </div>
                </li>
              ))
            ) : (
              <p>Nenhum livro encontrado</p>
            )}
          </ul>
        )}
      </div>
    </>
  )
}

export default Livros