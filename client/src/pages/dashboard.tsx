import Layout from "../components/Layout";
import { Document } from "../components/Document/index";
import { SocketProvider,socket } from "../contexts/SocketContext";

export default function Dashboard () {
    return (
      <SocketProvider value={socket}>
        <Layout> 
            {/*
             Aqui vai ficar os dados do usuário -- aquele documento
              tipo Nome do documento, tags e os componentes... 
            */}
              <Document />
           
         
        </Layout>
        </SocketProvider>
    )
}
