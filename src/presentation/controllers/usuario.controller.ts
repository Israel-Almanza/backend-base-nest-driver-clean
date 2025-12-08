import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from '@/application/services/usuario.service';

@Controller('usuarios')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  crear(@Body() body: any) {
    return this.usuarioService.crear(body.usuario);
  }

  @Get()
  listar() {
    return this.usuarioService.listar();
  }
}
