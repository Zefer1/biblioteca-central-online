import { useState } from 'react'
import Header from '../../components/Header/Header'
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'
import "./index.scss"

const LivrosCadastro = () => {
  const [livro, setLivro] = useState({ titulo:'', num_paginas:'', isbn:'', editora:'' })
  const [loading, setLoading] = useState(false)

  const createLivro = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log('Sending book data:', livro) // Debug log
      const response = await LivrosService.createLivro(livro)
      console.log('Create response:', response) // Debug log
      alert('Livro criado com sucesso!')
      setLivro({ titulo:'', num_paginas:'', isbn:'', editora:'' })
    } catch (error) {
      console.error('Create error:', error) // Debug log
      console.error('Error response:', error.response) // Debug log
      alert('Erro ao criar livro: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header/>
      <SubmenuLivros/>
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <form onSubmit={createLivro}>
          <div className='form-group'>
            <label>Título</label>
            <input 
              type="text" 
              value={livro.titulo}
              onChange={e=>setLivro(f=>({...f, titulo:e.target.value}))}
              required />
          </div>
          <div className='form-group'>
            <label>Número de Páginas</label>
            <input 
              type="number" 
              value={livro.num_paginas}
              onChange={e=>setLivro(f=>({...f, num_paginas:e.target.value}))}
              required />
          </div>
          <div className='form-group'>
            <label>ISBN</label>
            <input 
              type="text" 
              value={livro.isbn}
              onChange={e=>setLivro(f=>({...f, isbn:e.target.value}))}
              required />
          </div>
          <div className='form-group'>
            <label>Editora</label>
            <input 
              type="text" 
              value={livro.editora}
              onChange={e=>setLivro(f=>({...f, editora:e.target.value}))}
              required />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Livro'}
          </button>
        </form>
      </div>
    </>
  )
}

export default LivrosCadastro