# Obra360 (protótipo)

Protótipo de sistema web (estático) inspirado em **gestão de obras**, conectando:
**Cliente**, **Arquiteto**, **Equipe de obra** e **Fornecedores** — com foco em **controle**, **organização** e **previsibilidade de prazo e custo**.

> "A gente não está só reformando casas. A gente está transformando obra em produto."

## Como rodar

### Opção 1 (mais simples)
- Abra o arquivo `index.html` no navegador.
- Use o **menu inferior** para navegar entre as páginas.

### Opção 2 (recomendado: servidor local)
Alguns navegadores limitam certas coisas no modo `file://`. Para rodar como “site”:

No Windows (PowerShell), dentro da pasta do projeto:

```bash
python -m http.server 5500
```

Depois abra no navegador:
- `http://localhost:5500/index.html`

## Estrutura de pastas

```
barbara-facul/
  assets/
    app.js        # interações simuladas (chat, comprar, progresso)
    style.css     # estilo simples (mobile-like)
  index.html      # dashboard principal
  obra.html       # etapas + checklist
  cronograma.html # timeline (barras) + dias restantes
  profissionais.html # cards de profissionais (nome, profissão, avaliação)
  materiais.html  # lista de materiais + status + botão “comprar”
  chat.html       # simulação de mensagens (cliente/arquiteto/equipe)
  README.md
```

## Ideia do sistema (resumo para apresentação)
- **Dashboard**: mostra progresso geral, etapa atual, próxima tarefa e custo planejado vs atual.
- **Obra**: etapas com percentual e **checklist** por fase.
- **Cronograma**: timeline com barras de avanço e **dias restantes**.
- **Profissionais**: cards com avaliações para dar transparência de qualidade.
- **Materiais**: compras com status (comprado/pendente) e ação “comprar” simulada.
- **Chat**: canal único para reduzir ruído e registrar decisões.
- **Diferencial**: seção de **🔔 Alertas inteligentes** (ex.: atraso do piso + sugestão de troca de fornecedor).
- **Extra**: **Modo Investidor** (Airbnb moderno / Studio econômico) para orientar escolhas de acabamento e custo.

