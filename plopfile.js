module.exports = function (plop) {
    plop.setGenerator('controller', {
        description: 'Crear un controller con tu plantilla',
        prompts: [],

        actions(data) {
            const argv = require('minimist')(process.argv.slice(2));

            if (!argv.name) {
                throw new Error("Debes usar --name NOMBRE");
            }

            data.name = argv.name;

            return [
                {
                    type: 'add',
                    path: 'src/presentation/controllers/{{name}}.controller.ts',
                    templateFile: 'src/plop-templates/controller.hbs'
                }
            ];
        }
    });

    // ---------------------------------------------------------
    // 2️⃣ GENERADOR DE SERVICES
    // ---------------------------------------------------------
    plop.setGenerator('service', {
        description: 'Crear un service con transacciones, repositorios y entidad',
        prompts: [
            {
                type: 'input',
                name: 'fields',
                message: 'Campos de la entidad separados por coma (ej: grupo,codigo,nombre,descripcion):',
                filter: v => v.split(',').map(f => f.trim())
            }
        ],

        actions(data) {
            const argv = require('minimist')(process.argv.slice(2));

            if (!argv.name) {
                throw new Error("Debes usar --name NOMBRE");
            }

            data.name = argv.name;

            return [
                {
                    type: 'add',
                    path: 'src/application/services/{{name}}.service.ts',
                    templateFile: 'src/plop-templates/service.hbs'
                }
            ];
        }
    });

    // REPOSITORY IMPLEMENTATION
    plop.setGenerator('repositoryImpl', {
        description: 'Crear implementación del repositorio (Infrastructure)',
        prompts: [
        ],
        actions(data) {
            const argv = require('minimist')(process.argv.slice(2));

            if (!argv.name) {
                throw new Error("Debes usar --name NOMBRE");
            }

            data.name = argv.name;

            return [
                {
                    type: 'add',
                    path: 'src/infrastructure/repositories/{{name}}.repository.impl.ts',
                    templateFile: 'src/plop-templates/repositoryImpl.hbs'
                }
            ];
        }
    });

    // REPOSITORY
    plop.setGenerator('repository', {
        description: 'Crear implementación del repositorio (Domain)',
        prompts: [
        ],
        actions(data) {
            const argv = require('minimist')(process.argv.slice(2));

            if (!argv.name) {
                throw new Error("Debes usar --name NOMBRE");
            }

            data.name = argv.name;

            return [
                {
                    type: 'add',
                    path: 'src/domain/repositories/{{name}}.repository.ts',
                    templateFile: 'src/plop-templates/repository.hbs'
                }
            ];
        }
    });
};
