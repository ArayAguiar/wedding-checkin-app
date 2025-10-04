# 🎉 Website de Casamento - Cindy e Fausto

Este é um **website de casamento** desenvolvido em **Next.js** com **React** e **TypeScript**, que inclui funcionalidades para **convidados** e **staff**.  
O projeto está preparado para deploy no **Vercel** e utiliza **Supabase** como backend para gestão de convidados e check-ins.

---

## 🌟 Funcionalidades

### 👥 Para Convidados
- **Página Principal:** Informações detalhadas sobre o casamento com design elegante.  
- **Consulta de Convidados:** Sistema onde os convidados podem inserir o código de acesso para ver as suas informações.  
- **Geração de QR Codes:** Cada convidado pode gerar o seu código QR exclusivo para o check-in.

### 🎟️ Para Staff
- **Portal de Staff:** Login seguro para membros da equipa.  
- **Interface de Check-in:** Sistema de check-in em tempo real para o dia do casamento.  
- **Busca Avançada:** Pesquisa por código de acesso ou nome (incluindo acompanhantes).  
- **Scanner QR:** Digitalização de códigos QR com gestão de erros e feedback visual.  
- **Gestão Multi-Staff:** Suporte para múltiplos funcionários em simultâneo.

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** – Framework React para produção  
- **TypeScript** – Tipagem estática  
- **Tailwind CSS** – Framework de CSS utilitário  
- **Radix UI / shadcn/ui** – Componentes de interface acessíveis  
- **Lucide React** – Ícones modernos  
- **React Hook Form** – Gestão de formulários  
- **Zod** – Validação de esquemas  
- **Supabase** – Base de dados e autenticação  

---

## ⚙️ Instalação e Configuração

1. **Instalar dependências:**
   ```bash
   npm install
2. **Executar em modo de desenvolvimento:**

   npm run dev
3. **Construir para produção:**

   npm run build
4. **Iniciar servidor de produção:**
   npm start


## 🧭 Estrutura do Projeto

├── app/                    # App Router do Next.js
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── components/             # Componentes React
│   ├── ui/                 # Componentes de interface (shadcn/ui)
│   ├── WeddingInfo.tsx     # Informações do casamento
│   ├── GuestLookup.tsx     # Consulta de convidados
│   ├── StaffLogin.tsx      # Login do staff
│   ├── CheckinInterface.tsx# Interface de check-in
│   └── ...
├── lib/                    # Utilitários e configuração Supabase
├── styles/                 # Estilos globais e Tailwind
└── public/                 # Assets e ícones públicos


## 🔐 Configuração do Ambiente

Cria um ficheiro .env.local na raiz do projeto:
bash ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000


⚠️ Nota: Nunca commits variáveis sensíveis como chaves do Supabase.


## 🧾 Deploy no Vercel

1. Cria um repositório no GitHub e faz push do código:
   bash ```
      git init
      git add .
      git commit -m "Initial commit"
      git branch -M main
      git remote add origin https://github.com/seu-usuario/checkin-app.git
      git push -u origin main

2. Vai a https://vercel.com
 → New Project → Import from GitHub

3. Seleciona o repositório checkin-app

4. Define as variáveis de ambiente (NEXT_PUBLIC_SUPABASE_URL, etc.)

5. Clica em Deploy

O teu projeto estará disponível em poucos minutos.

## 🧠 Funcionalidades de Segurança

-  Convidados só podem ver as suas próprias informações

-  Login seguro para o staff

-  Códigos QR e de acesso únicos

-  Validação e sanitização de inputs

## 📱 Responsividade
O website é totalmente responsivo e otimizado para:

-  Desktop

-  Tablet

-  Mobile (Android & iOS)

## 📅 Detalhes do Casamento
Data: 18 de Outubro de 2025
Locais:
   -  Cerimónia Civil: Salão de Festas Pingo D'Ouro (10:00)

   -  Cerimónia Religiosa: Igreja Metodista Unida John Wesley (16:00)

   -  Recepção: Salão de Festas Pingo D'Ouro (19:30)

