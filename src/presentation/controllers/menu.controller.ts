import { Body, Controller, Get, Post, Put, Delete, Param, Query, HttpException, UseGuards } from '@nestjs/common';
import { MenuService } from '@/application/services/menu.service';
import { Respuesta } from '@/common/respuesta';
import { Finalizado, HttpCodes } from '@/application/lib/globals';
import { JwtAuthGuard } from '../middlewares/jwt-auth.guard';
import { PermissionGuard } from '../middlewares/permission.guard';
import { Permissions } from '../middlewares/decorators/permissions.decorator';


@Controller('menus')
export class MenuController {

  constructor(private readonly menuService: MenuService) {}

  @Post()
  async crear(@Body() body: any) {
    try {
      const respuesta = await this.menuService.crear(body);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }

  @Put(':id')
  async actualizar(@Param('id') id: number, @Body() datos: any) {
    try {
      datos.id = id;
      const respuesta = await this.menuService.actualizar(datos);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    try {
      const respuesta = await this.menuService.eliminar(id);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }

  @Get(':id')
  async mostrar(@Param('id') id: number) {
    try {
      const respuesta = await this.menuService.findOne({ id });
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('ADMIN:WRITE')
  @Get()
  async listar(@Query() params: any) {
    try {
      const respuesta = await this.menuService.listar(params);
      return new Respuesta('OK', Finalizado.OK, respuesta);
    } catch (error) {
      throw new HttpException(
        new Respuesta(error.message, Finalizado.FAIL),
        error.httpCode || HttpCodes.userError
      );
    }
  }
}
