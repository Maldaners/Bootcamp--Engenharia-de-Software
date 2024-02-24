import * as path from 'path';

export class FileUtils {

    private fs = require('fs');

    public async createFile(file: string) {
        if (!await this.existsFile(file)) {
            return await this.fs.mkdirSync(file, { recursive: true });
        }
    }

    public async existsFile(file: string): Promise<boolean> {
        return await this.fs.existsSync(file);
    }

    public async isDirectory(directory: string): Promise<boolean> {
        try {
            return await this.fs.lstatSync(directory).isDirectory();
        } catch (error) {
            return false;
        }
    }

    public async getAmountFilesInDirectory(directory: string): Promise<number> {
        if (await this.isDirectory(directory)) {
            return await this.fs.readdirSync(directory).length;
        }

        return 0;
    }

    public async existsFilesInDirectory(directory: string): Promise<boolean> {
        if (await this.isDirectory(directory)) {
            return await this.getAmountFilesInDirectory(directory) > 0;
        }
    }

    public async deleteFile(file: string) {
        if (await this.fs.existsSync(file)) {
            await this.fs.rmSync(file, { recursive: true, force: true });
        }
    }

    public async getDirectoryName(file: string) {
        return path.dirname(file);
    }

    public async getSeparate() {
        return path.sep
    }

    public async deletePathFile(file: string) {
        if (path.extname(file) != null) {
            const directory = await this.getDirectoryName(file);
            await this.deleteFile(directory);
        }
    }

    public async deleteDirectoryOfFileIfEmpty(file: string) {
        const directory = await this.getDirectoryName(file);
        if (!await this.existsFilesInDirectory(directory)) {
            await this.deleteFile(directory);
        }
    }
}