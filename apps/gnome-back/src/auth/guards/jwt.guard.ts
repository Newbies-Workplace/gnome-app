import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    // Left in case of crf token implementation
    const _request = context.switchToHttp().getRequest();
    return super.canActivate(context);
  }
}
