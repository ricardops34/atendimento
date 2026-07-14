#!/bin/sh
set -e

DUMP_FILE="/docker-entrypoint-initdb.d/dump/atendimento.dump"

if [ -f "$DUMP_FILE" ]; then
  echo "Restaurando backup $DUMP_FILE em $POSTGRES_DB..."
  pg_restore --no-owner --role="$POSTGRES_USER" -U "$POSTGRES_USER" -d "$POSTGRES_DB" "$DUMP_FILE"
  echo "Backup restaurado com sucesso."
else
  echo "Nenhum backup encontrado em $DUMP_FILE, iniciando banco vazio."
fi
