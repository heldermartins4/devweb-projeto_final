import Layout from "../components/Layout";
import { WorkspaceBoard } from "../components/Workspace";
import {SocketProvider,socket} from "../contexts/SocketContext"

export default function Workspace () {
    return (
        <><SocketProvider value={socket}>
            <Layout>

                <WorkspaceBoard />
                
            </Layout>
            </SocketProvider>
        </>
    )
}