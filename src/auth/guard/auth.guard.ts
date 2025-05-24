import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

//esta calse controla las rutas de todos los accesos de las apis 
@Injectable()
export class AuthGuard implements CanActivate {
  async anActivate(context: ExecutionContext):Promise<boolean> {
    return true;
  }
}
