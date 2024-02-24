import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as path from 'path';
import { DIRETORIO_IMAGENS_USUARIO } from 'src/app/utils/diretorio.utils';
import { ImagemUtils } from 'src/app/utils/imagem.utils';
import { CustomHttpException } from 'src/utils/exceptions/custom-http-exception.exception';
import { FileUtils } from '../../../../utils/file.utils';
import { FORMATO_DE_IMAGEM_NAO_PERMITIDO, NAO_PERMITIDO_UPLOADO_DE_MAIS_DE_UMA_IMAGEM } from '../../responses/imagem.responses';

const imagemUsuarioInterceptor: MulterOptions = {

  limits: {
    fieldSize: 30,
    files: 1,
  },

  fileFilter: function (req, file, cb) {
    if (new ImagemUtils().validateTypeImage(file)) {
      return cb(null, true);
    } else {
      return cb(new CustomHttpException(FORMATO_DE_IMAGEM_NAO_PERMITIDO), false);
    }
  },

  storage: diskStorage({

    destination: async (req, file, cb) => {
      const fileUtils = new FileUtils();
      const idUsuario = (req as any).usuario.idUsuario;
      const diretorio = DIRETORIO_IMAGENS_USUARIO + idUsuario + await fileUtils.getSeparate();

      if (await fileUtils.existsFilesInDirectory(path.resolve(diretorio))) {
        cb(new CustomHttpException(NAO_PERMITIDO_UPLOADO_DE_MAIS_DE_UMA_IMAGEM), null);
      }
      else {
        await fileUtils.createFile(diretorio);
        cb(null, diretorio);
      }
    },

    filename: async (req, file, cb) => {
      cb(null, await new ImagemUtils().getFileName(file));
    },
  }),
};

export default imagemUsuarioInterceptor;