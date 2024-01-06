import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Ptolemy',
        description: 'A backend service for manipulating geometries'
    },
    host: 'https://ptolemy-zhokjvjava-uc.a.run.app/api/geojson',
    definitions: {
        geojsonReq: {
            from: 'shapefile',
            url: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/bart-stations.json',
            options: {
                simplify: {
                    tolerance: 0.01,
                },
                union: true,
            },
        },
        geojsonResp: {
            context: {
                centroid: [
                    -122.27145004272461,
                    37.80499267578125,
                ],
            },
            geojson: {
                features: [
                    {
                        geometry: {
                            coordinates: [
                                [
                                    [
                                        -122.270833,
                                        37.804991,
                                    ],
                                    [
                                        -122.270833,
                                        37.805,
                                    ],
                                    [
                                        -122.270833,
                                        37.805,
                                    ],
                                    [
                                        -122.270833,
                                        37.804991,
                                    ],
                                ],
                            ],
                            type: 'Polygon',
                        },
                        properties: {
                            centroid: [
                                -122.270833,
                                37.8049955,
                            ],
                        },
                    }
                ]
            },
        },
    },
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);