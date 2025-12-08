Proyecto  Backend Base Driver Clean

Node version 20.19.2

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
