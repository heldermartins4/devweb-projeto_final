# Projeto Final de Desenvolvimento Web - Ciência da Computação 2024

## Cub's - (TCC de Desenvolvimento de Sistemas 2022)

**Autor:** Helder Martins dos Santos [@heldermartins4](https://github.com/heldermartins4)  
**Co-Autor:** Augusto Dorador Kawshima [@adk-coder](https://github.com/adk-coder)  
**Professor:** Fabrício Bizzoto [@fabricioifc](https://github.com/fabricioifc)  

---

## **Descrição**

O **Cub's** é um aplicativo projetado para simplificar e otimizar a criação, organização e administração de projetos. Ele atende profissionais, equipes, empresas e estudantes que buscam uma ferramenta prática e eficiente para gerenciar suas iniciativas, desde o planejamento inicial até a execução.

### **Objetivo Principal**
- Criar projetos personalizados e organizados em salas específicas.
- Estruturar e planejar tarefas utilizando recursos integrados.
- Gerenciar equipes de forma eficaz, atribuindo funções e monitorando o progresso.

### **Público-Alvo**
- Profissionais autônomos que gerenciam múltiplos projetos.
- Equipes que precisam colaborar remotamente.
- Empresas que desejam monitorar o progresso de suas iniciativas.
- Estudantes e grupos de estudo que precisam organizar trabalhos acadêmicos.

---

## **Como rodar na sua máquina?**

### Usando **Docker**

### **Passo 01:** Acesse os diretórios `client` e `server`
```bash
cd client
# ou cd server
```

### Passo 02: No diretório `server` crie o arquivo `.env` e configure conforme o exemplo abaixo.

```dotenv
DATABASE_URL="mysql://user:password@mysql:3306/dbname"
# Para esse exemplo, use: DATABASE_URL="mysql://cubsuser:cubs1234@mysql:3306/cubs2022"
SHADOW_DATABASE_URL="mysql://root:cubs1234@mysql:3306/cubs2022_shadow" 
# Use root por conta do nível e acesso, se não configure o usuário, "grant privileges"
```
```docker compose up -d```

### Passo 03: Uma tarefa chata, mas necessária. Crie uma base de dados _shadow_

> **Explicação:**  
> A criação de uma base de dados shadow (ou sombra) em projetos geralmente ocorre em contextos que envolvem ferramentas como o Prisma ORM.  
> No Prisma, a base de dados shadow é usada para auxiliar na gestão de migrações do banco de dados.

Para fazer isso é bem fácil, depois de rodar o comando do Passo 2 basta rodar o comando abaixo para acessar o ambiente docker e então criar uma base de dados manualmente.

```bash
docker exec -it <nome_imagem ou id> bash 
```
Feito isso, você estará dentro do ambiente e poderá rodar o comando para acessar teu ambiente mysql

```bash
mysql -u <nome_de_usuario> -p
# Enter password: *********
```
Depois basta criar a base de dados:
```bash
CREATE DATABASE IF NOT EXISTS cubs2022_shadow;
```
Feito isso, a conexão estará estabelecida e poderemos partir para o Cliente, ou seja, o Front-end da aplicação.

### Passo 04: Rode o comando para dar build na imagem do Dockerfile

```bash
docker build -t <nome_imagem ou id> ./client
```
Feito isso, pode rodar a imagem e expor a porta para acesso. (Sim, estou fazendo isso sem se preocupar com segurança e com configurações adicionais para colocar no ar depois)
```bash
docker run -p 3000:3000 <nome_imagem>
```
Pode demorar algum tempinho, relaxe e aproveite o build...

Depois disso, você já terá acesso total ao conteúdo. Pode acessar o Cub's aqui ó [cubs.app](http://localhost:3000/)

## Tecnologias utilizadas 

### **Front-End**

- **React.js:** Biblioteca JavaScript para construção de interfaces de usuário dinâmicas e reativas.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática, aumentando a segurança do código.
- **Vite:** Ferramenta de build rápida e moderna para desenvolvimento web.
- **CSS (ou frameworks CSS):** Personalização e estilização das interfaces.

### **Back-End**

- **Node.js:** Ambiente de execução JavaScript para desenvolvimento do lado do servidor.
- **Express.js:** Framework minimalista e flexível para criação de APIs REST.
- **Prisma ORM:** Ferramenta para manipulação e consulta de banco de dados, com suporte a migrações e geração de tipos no TypeScript.

### **Banco de Dados**

- **PostgreSQL:** Banco de dados relacional, robusto e amplamente utilizado em aplicações modernas.
- **SQLite (Shadow Database):** Usado pelo Prisma para controlar migrações durante o desenvolvimento.

### **Ferramentas e Utilitários**

- **Docker:** Ferramenta para containerização, usada para isolar e gerenciar o ambiente de desenvolvimento e produção.
- **Docker Compose:** Orquestração dos containers, permitindo execução simplificada dos serviços necessários ao projeto.
- **ESLint e Prettier:** Ferramentas de linting e formatação de código, garantindo qualidade e consistência.
- **Git/GitHub:** Controle de versão e repositório remoto para colaboração.

## Funcionalidades Implementadas no Cub's

### **1. Criação e Gerenciamento de Projetos**

- **Salas Personalizadas:** Cada projeto é vinculado a uma sala exclusiva, identificada pelo nome do projeto.
- **Estruturação de Projetos:** Organização de tarefas e etapas dentro de cada sala, utilizando recursos disponíveis.
- **Configuração e Personalização:** Capacidade de customizar as configurações do projeto para atender às necessidades específicas.

---

### **2. Administração de Equipes**

- **Gestão de Membros:** Atribuição de funções e permissões para os participantes do projeto.
- **Monitoramento de Atividades:** Visualização do progresso das tarefas atribuídas aos membros da equipe.

---

### **3. Organização de Recursos**

- **Planejamento Centralizado:** Recursos organizados de forma a facilitar o fluxo de trabalho.
- **Interface Intuitiva:** Experiência do usuário aprimorada, permitindo a navegação eficiente entre projetos e tarefas.

---

## Sugestões para Melhorias Futuras

### Novas Funcionalidades - 

-Integração com Ferramentas Externas: Conectar o Cub's a ferramentas como Google Drive ou Slack.
-Relatórios de Desempenho: Geração de relatórios detalhados sobre o progresso do projeto e produtividade das equipes.

### Melhorias na Experiência do Usuário- 

Mobile-Friendly: Aprimorar a responsividade para melhorar o uso em dispositivos móveis.
Tutorial Integrado: Um passo a passo interativo para novos usuários entenderem como usar a plataforma.

### Otimização Técnica -

Autenticação Avançada: Implementar autenticação com OAuth (ex.: login via Google ou GitHub).
Cacheamento: Uso de Redis para melhorar a performance em consultas frequentes.
Escalabilidade: Configuração de balanceamento de carga para suportar mais usuários simultaneamente.

### Comunidade e requisitos - 

Suporte a Múltiplos Idiomas: Internacionalização para alcançar usuários globais.
