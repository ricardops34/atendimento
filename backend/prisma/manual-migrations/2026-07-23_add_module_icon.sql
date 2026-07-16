-- Adiciona a coluna de icone (Animalia Icons, ex: 'an an-folders') no
-- cadastro de Modulo, para que o grupo no menu use um icone escolhido no
-- cadastro em vez do fallback (icone da primeira rotina do modulo, ou
-- 'an an-folder' quando nao ha nenhuma).
-- Idempotente e sem recarga de outros dados.
BEGIN;

ALTER TABLE "modules" ADD COLUMN IF NOT EXISTS "icon" VARCHAR(100);

COMMIT;
