Proyecto  Backend Base Driver Clean
Nest js

Node version 20.19.2

Controller → Service → Repository → Database

## 📐 Arquitectura del Proyecto
Clean Hexagonal Architecture Diagram
![Arquitectura Clean Hexagonal](./docs/arquitectura.png)

## Configuracion de plop en el proyecto
Ejemplo

npx plop controller --name test<br>
npx plop service --name test<br>
npx plop repository --name test<br>
npx plop repositoryImpl --name test<br>

ESTRUCTURA FINAL DEL PROYECTO

src/
├── domain/
│   ├── entities/
│   │   ├── user.entity.ts
│   │   ├── cliente.entity.ts
│   │   ├── factura.entity.ts
│   ├── repositories/
│
├── application/
│   ├── use-cases/
│   │   ├── crear-factura.usecase.ts
│   │   ├── registrar-venta.usecase.ts
│
├── infrastructure/
│   ├── database/
│   │   ├── sequelize.config.ts
│   │   ├── models/
│   ├── repositories/
│
├── presentation/
│   ├── controllers/
│   ├── dtos/
│
└── main.ts
