import dotenv from 'dotenv';
import { Command } from 'commander';


const program = new Command();

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 9090)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
program.parse();

console.log ("Mode Option: ", program.opts().mode);

dotenv.config({
    path: program.opts().mode === 'production' ? './src/config/.env.production'
    : './src/config/.env.development'
    
})


export default {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET || 'tu_clave_secreta'
};