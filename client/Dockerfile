# Use a imagem Node.js como base
FROM node

# Defina o diretório de trabalho no container
WORKDIR /client

# Copie os arquivos essenciais para instalar dependências
COPY package.json yarn.lock ./

# Instale as dependências
RUN yarn

# Copie o restante do código do projeto
COPY . .

# Execute o build do projeto
RUN yarn build

# Exponha a porta 3000
EXPOSE 3000

# Comando padrão para iniciar o servidor de produção
CMD ["yarn", "start"]
