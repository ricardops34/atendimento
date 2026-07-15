export function orderMenuDetails<T extends { module: string; routine: string }>(items: T[]): T[] {
  return [...items].sort((left, right) => {
    const moduleOrder = left.module.localeCompare(right.module, 'pt-BR', { sensitivity: 'base' });
    if (moduleOrder !== 0) return moduleOrder;
    return left.routine.localeCompare(right.routine, 'pt-BR', { sensitivity: 'base' });
  });
}
