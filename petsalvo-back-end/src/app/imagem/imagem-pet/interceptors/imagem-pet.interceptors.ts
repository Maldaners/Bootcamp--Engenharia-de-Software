import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as path from 'path';
import { DIRETORIO_IMAGENS_PET } from 'src/app/utils/diretorio.utils';
import { ImagemUtils } from 'src/app/utils/imagem.utils';
import { CustomHttpException } from 'src/utils/exceptions/custom-http-exception.exception';
import { FileUtils } from '../../../../utils/file.utils';
import { FORMATO_DE_IMAGEM_NAO_PERMITIDO, NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_IMAGENS } from '../../responses/imagem.responses';

const imagemPetInterceptor: MulterOptions = {

  limits: {
    fieldSize: 30,
    files: 5,
  },

  fileFilter: async function (req, file, cb) {
    if (await new ImagemUtils().validateTypeImage(file)) {
      return cb(null, true);
    } else {
      return cb(new CustomHttpException(FORMATO_DE_IMAGEM_NAO_PERMITIDO), false);
    }
  },

  storage: diskStorage({

    destination: async (req, file, cb) => {
      const fileUtils = new FileUtils();

      const qtdImagensLista = JSON.parse(JSON.stringify(req.files)).imagens.length;
      const idPet = JSON.parse(JSON.stringify(req.params)).idPet;
      const diretorio = DIRETORIO_IMAGENS_PET + idPet + await fileUtils.getSeparate();

      if ((await fileUtils.getAmountFilesInDirectory(path.resolve(diretorio)) + qtdImagensLista) > 5) {
        cb(new CustomHttpException(NAO_PERMITIDO_CADASTRO_DE_MAIS_DE_5_IMAGENS), null);
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

export default imagemPetInterceptor;