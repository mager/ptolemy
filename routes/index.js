
import axios from "axios";
import express from "express";
import shp from "shpjs";
import * as turf from "@turf/turf";
import {
    errorResponse,
    successResponse,
} from "../utils/http.js";

const router = express.Router();

const validHosts = ["github.com", "raw.githubusercontent.com"];

router.post("/geojson", async (req, res) => {
    // **
    // * Convert a shapefile to geojson
    // * @param {string} from - The type of file to convert from
    // * @param {object} options - Options for the conversion
    // * @param {object} options.simplify - Options for simplifying the geojson
    // * @param {number} options.simplify.tolerance - The tolerance for simplifying the geojson (eg. 0.01)
    // * @param {boolean} options.union - Whether to union the geojson
    // * @param {string} url - The url of the file to convert
    // * @returns {object} - The converted geojson
    const { from, options, url } = req.body;

    if (!from) {
        return errorResponse(res, 400, "Missing from");
    }

    if (from !== "shapefile") {
        return errorResponse(res, 400, "Invalid from");
    }

    if (!url) {
        return errorResponse(res, 400, "Missing url");
    }

    // If the url doesn't include github.com, add it
    const urlHost = new URL(url).host;
    if (!validHosts.includes(urlHost)) {
        return errorResponse(res, 400, `Invalid url: ${url}`);
    }

    try {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const data = await shp(response.data);

        if (options) {
            if (options.union) {
                console.log("EXPERIMENTAL: Unioning polygons")
                const fc = turf.featureCollection(data.features);
                let polygon = turf.polygon([]);
                for (const feature of fc.features) {
                    try {
                        polygon = turf.union(polygon, turf.polygon(feature.geometry.coordinates));
                    } catch (error) {
                        console.log(`Error unioning feature: ${error}`);
                    }
                }
                const outerOutline = turf.convex(polygon);
                data.features = [outerOutline];
            }
            if (options.simplify) {
                const fc = turf.featureCollection(data.features);
                const simplified = turf.simplify(fc, {
                    tolerance: options.simplify.tolerance,
                    highQuality: false,
                });
                data.features = simplified.features;
            }
        }
        return successResponse(res, data);
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Error converting shapefile to geojson");
    }
});

export default router;