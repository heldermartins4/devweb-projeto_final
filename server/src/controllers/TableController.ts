import fs from "fs";
import { prismaClient } from "@database/prismaClient";
import { Readable } from "stream";
import readLine from 'readline';
import { Request, Response } from "express";

// salva antes do nome da tabela o id do usuario
class TableController {
    async handleWrite(request: Request, response: Response) {
        const data = request.body;
        const name = data.name.split(" ").join("_")
        console.log(name)

        fs.writeFile(`./src/tables/${name}.json`, JSON.stringify(data), { encoding: "utf8" },
            (err) => { })
        return response.send().status(200);
    }


    async handleRead(request: Request, response: Response) {
        const { name } = request.body;
        const title = name.split(" ").join("_");
        try {
            let text = fs.readFileSync(`./src/tables/${title}.json`, { encoding: "utf8" });
            text = JSON.parse(text);
            console.log(text);
            return response.json(text);
        } catch (err) {
            console.log(err);
            throw new Error("File does not exists");
        }


    }

    async handleDelete(request: Request, response: Response) {
        const { name } = request.body;
        const title = name.split(" ").join("_");
        fs.unlink(`./src/tables/${title}.json`, (err) => {
            if (err) {
                console.log(err);
                throw new Error("file does not exist");

            }
        });
        return response.send().status(200);
    }

    async handleDbSave(request: Request, response: Response) {
        const data = request.body;
        const user_id = request.user_id;


        const JsonString = JSON.stringify(data);
        console.log(JsonString);
        // save workspace name jsonString
        const table = await prismaClient.table.create({
            data: { tableName: data.name, JsonString: JsonString, workspaceId: data.workspaceId, useId: user_id }
        });
        return response.send().status(200);
    }

    async handleDbReadByWorkspace(request: Request, response: Response) {
        const { name, workspaceId } = request.body;
        const table = await prismaClient.table.findMany({ where: { workspaceId: workspaceId }, select: { JsonString: true } });
        console.log(table)
        let datas = [];
        //@ts-ignore
        table.map(d => (datas.push(JSON.parse(d.JsonString))));
        console.log(datas)
        return response.json(datas);



    }
    async handleDbReadOne(request: Request, response: Response) {
        const { name, workspaceId } = request.body;
        const table = await prismaClient.table.findMany({ where: { workspaceId: workspaceId, tableName: name }, select: { JsonString: true } });
        //@ts-ignore
        const data = JSON.parse(table[0].JsonString);
        return response.json(data);


    }
    async handleExcelUpload(request: Request, response: Response) {
        const { buffer } = request.file;
        const  tableId = request.headers.authorization;

        const readablefile = new Readable();
        readablefile.push(buffer);
        readablefile.push(null);

        const productLine = readLine.createInterface({ input: readablefile, });
        const product = [];
        const title = [];
        let i = 0;
        for await (let line of productLine) {
            let string = line.split(/[;,]+/);

            if (i === 0) {

                for (let o = 0; o < string.length; o++) {
                    title.push(string[o]);

                }

            }

            if (i > 0) {
                // let j = {};
                // for (let data = 0; data < title.length; data++) {

                //     j[title[data]] = string[data] === null ? "" : string[data];

                // }
                let arrayTable = [];
                for (let data = 0; data < title.length; data++) {

                    // j[title[data]] = string[data] === null ? "" : string[data];
                    arrayTable.push(string[data] === null ? "" : string[data])

                }
                product.push(arrayTable);

            }
            i++;
        }
        console.log(product)
        let execelMetadataString = await JSON.stringify({ columns: product })
        
        await prismaClient.table.update({ where: { id: tableId }, data: { JsonString: execelMetadataString } })

        //atualizar para salvar no database com workspace e user_id a tabela como JSON.stringfy() 

        return response.json({ columns: product });
    }



}


export { TableController };