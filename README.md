# Projeto Final de Desenvolvimento Web - Ciência Da Computação 2024
## Cub's - (TCC de Desenvolvimento de Sistemas 2022)

**Autor:** Helder Martins dos Santos [@heldermartins4](https://github.com/heldermartins4)

**Professor:** Fabrício Bizzoto [@fabricioifc](https://github.com/fabricioifc)

# Como rodar na sua máquina? Siga o Passo a Passo abaixo.

## Usando **Docker**
### Passo 01: Acesse os diretórios `client` e `server`

```sh
cd client
# ou cd server
```

### Passo 02: No diretório `server` crie o arquivo `.env` e configure conforme é o exemplo abaixo. E depois faça o build usando `docker-compose`

```env
DATABASE_URL="mysql://user:password@mysql:3306/dbname"
# Para esse exemplo, use: DATABASE_URL="mysql://cubsuser:cubs1234@mysql:3306/cubs2022"
SHADOW_DATABASE_URL="mysql://root:cubs1234@mysql:3306/cubs2022_shadow" 
# use root por conta do nível e acesso, se não configure o usuário, "grant privileges"
```

```sh
docker compose up -d
```

### Passo 03: Uma tarefa chata, mas necessária. Crie uma base de dados *shadow*

> **Explicação:** A criação de uma base de dados shadow (ou sombra) em projetos geralmente ocorre em contextos que envolvem ferramentas como o Prisma ORM. No Prisma, a base de dados shadow é usada para auxiliar na gestão de migrações do banco de dados

Para fazer isso é bem fácil, depois de rodar o comando do **Passo 2** basta rodar o comando abaixo para acessar o ambiente docker e então criar uma base de dados manualmente.

```sh
docker exec -it <nome_imagem ou id> bash
```

Feito isso, você estará dentro do ambiente e poderá rodar o comando para acessar teu ambiente `mysql`

```sh
mysql -u <nome_de_usuario> -p
# Enter password: *********
```

Depois basta criar a base de dados:

```mysql
CREATE DATABASE IF NOT EXISTS cubs2022_shadow;
```

Feito isso, a conexão estará estabelecida e poderemos partir para o Cliente, ou seja, o Front-end da aplicação.

### Passo 04: Rode o comando para dar build na imagem do `Dockerfile`

```sh
docker build -t <nome_imagem ou id> ./client
```
Feito isso, pode rodar a imagem e expor a porta para acesso. (Sim, estou fazendo isso sem se preocupar com segurança e com configurações adicionais para colocar no ar depois)

```sh
docker run -p 3000:3000 <nome_imagem>
```

Pode demorar algum tempinho, relaxe e aproveite o build...

Depois disso, você já terá acesso total ao conteúdo. Pode acessar o Cub's aqui ó [cubs.app](http://localhost:3000)