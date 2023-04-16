import fastify from "fastify";
import { isValidCPF } from '@brazilian-utils/brazilian-utils';

import axios from 'axios';


const app = fastify()

app.get("/:cpf/:date/:token", async (request, reply)=>{
    const {cpf,date, token} = request.params as any
    
    const cpfFormat = cpf.replace(/\D+/g, '')
    const dateFormat = date.replace(/\D+/g, '')
    
    console.log(cpfFormat)
    console.log(dateFormat)
    
    try {
        const res = await axios.get(`https://ws.hubdodesenvolvedor.com.br/v2/cpf/?cpf=${cpfFormat}&data=${dateFormat}&token=${token}`)
        const data = res.data
        if(data.status != true){
            return reply.status(201).send({ error: data.message })
        } else {
            return reply.status(201).send({
                nome: data.result.nome_da_pf,
                situacao_cadastral: data.result.situacao_cadastral
            })
        }
    } catch (err) {
        return reply.status(404).send(err)
    }
    
})

app.listen({
    host:"0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(()=>{
    console.log("Http Server is Runing")
})




