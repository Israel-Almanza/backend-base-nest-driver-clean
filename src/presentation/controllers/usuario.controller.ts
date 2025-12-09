import { Body, Controller, Get, Post, Query , HttpException} from '@nestjs/common';
import { UsuarioService } from '@/application/services/usuario.service';
import { Respuesta } from '@/common/respuesta';
import { Finalizado, HttpCodes } from '@/application/lib/globals';

@Controller('usuarios')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  async crear(@Body() body: any) {
    return await this.usuarioService.crear(body.usuario);
  }

  @Get()
  async listar(@Query() params: any) {
    try {
      const respuesta = await this.usuarioService.listar(params);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error: any) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError,
      );
    }
  }
}
