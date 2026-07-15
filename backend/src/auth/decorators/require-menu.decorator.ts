import { SetMetadata } from '@nestjs/common';

export const REQUIRE_MENU_ROUTINE_KEY = 'requireMenuRoutine';
export const RequireMenu = (routineKey: string) => SetMetadata(REQUIRE_MENU_ROUTINE_KEY, routineKey);
