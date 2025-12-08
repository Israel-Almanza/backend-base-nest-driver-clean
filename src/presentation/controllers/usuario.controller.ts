import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearUsuarioUseCase } from '../../application/use-cases/crear-usuario.usecase';
import { UsuarioRepositoryImpl } from '../../infrastructure/repositories/usuario.repository.impl';

@Controller('usuarios')
export class UsuarioController {
  private useCase: CrearUsuarioUseCase;

  constructor(repo: UsuarioRepositoryImpl) {
    this.useCase = new CrearUsuarioUseCase(repo);
  }

  @Post()
  crear(@Body() body: any) {
    return this.useCase.execute(body.nombre, body.apellido);
  }

  @Get()
  listar() {
    return this.useCase['repo'].findAll();
  }
}
