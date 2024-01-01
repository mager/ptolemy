import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Ptolemy',
        description: 'A backend service for manipulating geometries'
    },
    host: 'https://ptolemy-zhokjvjava-uc.a.run.app/api/geojson',
    definitions: {
        geojson: {
            from: 'shapefile',
            url: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/bart-stations.json',
            options: {
                simplify: {
                    tolerance: 0.01,
                },
                union: true,
            },
        },
    },
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);