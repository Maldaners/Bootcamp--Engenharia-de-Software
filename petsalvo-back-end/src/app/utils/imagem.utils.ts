import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export class ImagemUtils {

    public filetypes = /jpeg|jpg|png/;

    public async validateTypeImage(file: any): Promise<boolean> {
        const extname = this.filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = this.filetypes.test(file.mimetype);

        return mimetype && extname;
    }

    public async getFileName(file: any): Promise<string> {
        const nomeArquivo = path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();
        const extensao = path.parse(file.originalname).ext;

        return `${nomeArquivo}${extensao}`;
    }
}