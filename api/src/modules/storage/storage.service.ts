import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, extname } from 'path';

@Injectable()
export class StorageService {
  private readonly uploadPath = join(process.cwd(), 'uploads');

  constructor() {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  /**
   * Salva a logo de um tenant ou de uma filial
   */
  async saveLogo(tenantId: string, file: Express.Multer.File, branchId?: string): Promise<string> {
    let folderPath = join(this.uploadPath, tenantId);
    let publicPath = `/uploads/${tenantId}`;

    if (branchId) {
      folderPath = join(folderPath, 'branches', branchId);
      publicPath += `/branches/${branchId}`;
    } else {
      folderPath = join(folderPath, 'branding');
      publicPath += `/branding`;
    }
    
    if (!existsSync(folderPath)) {
      mkdirSync(folderPath, { recursive: true });
    }

    const fileName = `logo${extname(file.originalname)}`;
    const filePath = join(folderPath, fileName);

    writeFileSync(filePath, file.buffer);

    return `${publicPath}/${fileName}`;
  }
}
