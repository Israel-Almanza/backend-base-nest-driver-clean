import { Body, Controller, Get, Post, Put, Param, Query, HttpException } from '@nestjs/common';
import { UsuarioService } from '@/application/services/usuario.service';
import { Respuesta } from '@/common/respuesta';
import { Finalizado, HttpCodes } from '@/application/lib/globals';

@Controller('usuarios')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  async crear(@Body() body: any) {
    try {
      const respuesta = await this.usuarioService.crear(body);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL), error.httpCode || HttpCodes.userError,
      );
    }
  }

  @Put(':id')
  async actualizar(@Param('id') id: number, @Body() datos: any) {
    try {
      datos.id = id
      const respuesta = await this.usuarioService.actualizar(datos);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL), error.httpCode || HttpCodes.userError,
      );
    }

  }

  @Get(':id')
  async mostrar(@Param('id') id: number) {
    try {
      const respuesta = await this.usuarioService.findOne({id: id});
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL), error.httpCode || HttpCodes.userError,
      );
    }

  }

  @Get()
  async listar(@Query() params: any) {
    try {
      const respuesta = await this.usuarioService.listar(params);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error: any) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL), error.httpCode || HttpCodes.userError,
      );
    }
  }
}
