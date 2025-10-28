import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'
import "./index.scss"

const LivrosEdicao = () => {
  const { livroId } = useParams()
  const [livro, setLivro] = useState({ titulo:'', num_paginas:'', isbn:'', editora:'' })

  useEffect(() => {
    (async () => {
      const { data } = await LivrosService.getLivro(livroId)
      setLivro(data)
    })()
  }, [livroId])

  const saveEdit = async (e) => {
    e.preventDefault()
    const { data } = await LivrosService.updateLivro(livroId, livro)
    alert(data.mensagem)
  }

  return (
    <>
      <Header/>
      <SubmenuLivros/>
      <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <form onSubmit={saveEdit}>
          <div className='form-group'>
            <label>ID</label>
            <input type="text" value={livro.id||''} disabled />
          </div>
          <div className='form-group'>
            <label>Título</label>
            <input 
              type="text" 
              value={livro.titulo||''}
              onChange={e=>setLivro(f=>({...f, titulo:e.target.value}))}
              required />
          </div>
          <div className='form-group'>
            <label>Número de Páginas</label>
            <input 
              type="number" 
              value={livro.num_paginas||''}
              onChange={e=>setLivro(f=>({...f, num_paginas:e.target.value}))}
              required />
          </div>
          <div className='form-group'>
            <label>ISBN</label>
            <input 
              type="text" 
              value={livro.isbn||''}
              onChange={e=>setLivro(f=>({...f, isbn:e.target.value}))}
              required />
          </div>
          <div className='form-group'>
            <label>Editora</label>
            <input 
              type="text" 
              value={livro.editora||''}
              onChange={e=>setLivro(f=>({...f, editora:e.target.value}))}
              required />
          </div>
          <button type="submit">Atualizar Livro</button>
        </form>
      </div>
    </>
  )
}

export default LivrosEdicao
