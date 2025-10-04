# Guia de Instalação - Website de Casamento

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.17 ou superior)
- **npm** ou **yarn** (recomendamos npm)
- **Git** (para clonar o repositório)

## Instalação Passo a Passo

### 1. Preparar o Ambiente

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version
```

### 2. Instalar Dependências

```bash
# Instalar todas as dependências do projeto
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# Copiar arquivo de exemplo (se existir)
cp .env.example .env.local
```

Ou criar manualmente com o conteúdo:

```env
# URL base do site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Configurações do banco de dados (quando implementar)
# DATABASE_URL="postgresql://..."

# Configurações de API (quando necessário)
# API_SECRET_KEY="your-secret-key"
```

### 4. Executar em Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

O website estará disponível em: `http://localhost:3000`

### 5. Construir para Produção

```bash
# Construir aplicação para produção
npm run build

# Iniciar servidor de produção
npm start
```

## Estrutura de Ficheiros Criados

```
projeto/
├── app/                     # Next.js App Router
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   ├── globals.css         # Estilos globais
│   └── api/                # API routes
├── components/             # Componentes React (já existentes)
├── lib/                   # Utilitários
├── public/                # Ficheiros estáticos
├── styles/                # Estilos CSS (já existente)
├── package.json           # Dependências e scripts
├── next.config.js         # Configuração Next.js
├── tsconfig.json          # Configuração TypeScript
├── tailwind.config.ts     # Configuração Tailwind
└── postcss.config.js      # Configuração PostCSS
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Constrói aplicação para produção
npm start            # Inicia servidor de produção

# Linting
npm run lint         # Verifica código com ESLint
```

## Funcionalidades Principais

### 1. Página de Informações do Casamento
- Design elegante baseado no Figma
- Cronograma detalhado do dia
- Links para localizações no Google Maps
- Ecrã de carregamento animado com logo CF

### 2. Sistema de Consulta de Convidados
- Busca por código de acesso
- Geração de códigos QR
- Informações personalizadas por convidado

### 3. Portal do Staff
- Login seguro
- Interface de check-in com busca avançada
- Busca por código de acesso OU nome do convidado
- Scanner de códigos QR com melhor gestão de erros
- Gestão em tempo real para múltiplos staff

## Personalização

### Alterar Dados do Casal
Editar o ficheiro `/components/WeddingInfo.tsx` e `/components/ElegantWeddingInfo.tsx`

### Modificar Lista de Convidados
Atualmente usa dados mock em `/components/GuestLookup.tsx`

### Personalizar Design
- Cores: editar `/styles/globals.css`
- Tipografia: modificar `/tailwind.config.ts`
- Componentes: editar ficheiros em `/components/`

## Implementação em Produção

### Opções de Hosting
1. **Vercel** (recomendado para Next.js)
2. **Netlify**
3. **Railway**
4. **Servidor próprio com PM2**

### Deploy na Vercel
```bash
# Instalar CLI da Vercel
npm i -g vercel

# Fazer deploy
vercel
```

## Resolução de Problemas

### Erro: "Module not found"
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro de compilação TypeScript
```bash
# Verificar configuração
npx tsc --noEmit
```

### Problemas com Tailwind CSS
```bash
# Reconstruir estilos
npm run build
```

## Suporte

Para questões técnicas:
1. Verificar logs no terminal
2. Consultar documentação do Next.js
3. Verificar dependências no `package.json`

## Próximos Passos

Após a instalação:
1. Testar todas as funcionalidades
2. Personalizar design e conteúdo
3. Adicionar dados reais dos convidados
4. Configurar base de dados (opcional)
5. Fazer deploy em produção