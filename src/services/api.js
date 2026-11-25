// Funções que se comunicam com a API do TestFlow (backend + MySQL)

const API_URL = '/api/casos'

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.erro || 'Erro ao se comunicar com o servidor.')
  }

  if (response.status === 204) return null

  return response.json()
}

export function listarCasos() {
  return request(API_URL)
}

export function criarCaso(caso) {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify(caso)
  })
}

export function atualizarStatus(id, status) {
  return request(`${API_URL}/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  })
}

export function excluirCaso(id) {
  return request(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
}
