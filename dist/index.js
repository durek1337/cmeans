"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const euclidean_distance_1 = __importDefault(require("euclidean-distance"));
const maxIterations = 3;
function default_1({ k, vectors, epsilon, fuzziness }) {
    var membershipMatrix = new utils_1.Matrix(vectors.length, k);
    var repeat = true;
    var nb_iters = 0;
    var centroids = null;
    var i, j, l, tmp, norm, max, diff;
    while (repeat) {
        // initialize or update centroids
        if (centroids == null) {
            tmp = (0, utils_1.getRandomVectors)(k, vectors);
            if (tmp == null)
                return null;
            else
                centroids = tmp.vectors;
        }
        else {
            for (j = 0; j < k; j++) {
                centroids[j] = [];
                norm = 0;
                for (i = 0; i < membershipMatrix.rows; i++) {
                    norm += Math.pow(membershipMatrix.mtx[i][j], fuzziness);
                    tmp = (0, utils_1.multiplyVectorByValue)(Math.pow(membershipMatrix.mtx[i][j], fuzziness), vectors[i]);
                    if (i === 0)
                        centroids[j] = tmp;
                    else
                        centroids[j] = (0, utils_1.addVectors)(centroids[j], tmp);
                }
                if (norm > 0)
                    centroids[j] = (0, utils_1.multiplyVectorByValue)(1 / norm, centroids[j]);
            }
        }
        // update the degree of membership of each vector
        var previousMembershipMatrix = membershipMatrix.copy();
        for (i = 0; i < membershipMatrix.rows; i++) {
            for (j = 0; j < k; j++) {
                membershipMatrix.mtx[i][j] = 0;
                for (l = 0; l < k; l++) {
                    if ((0, euclidean_distance_1.default)(vectors[i], centroids[l]) === 0)
                        tmp = 0;
                    else
                        tmp =
                            (0, euclidean_distance_1.default)(vectors[i], centroids[j]) /
                                (0, euclidean_distance_1.default)(vectors[i], centroids[l]);
                    tmp = Math.pow(tmp, 2 / (fuzziness - 1));
                    membershipMatrix.mtx[i][j] += tmp;
                }
                if (membershipMatrix.mtx[i][j] > 0)
                    membershipMatrix.mtx[i][j] = 1 / membershipMatrix.mtx[i][j];
            }
        }
        // check convergence
        max = -1;
        diff;
        for (i = 0; i < membershipMatrix.rows; i++)
            for (j = 0; j < membershipMatrix.cols; j++) {
                diff = Math.abs(membershipMatrix.mtx[i][j] - previousMembershipMatrix.mtx[i][j]);
                if (diff > max)
                    max = diff;
            }
        if (max < epsilon)
            repeat = false;
        nb_iters++;
        // check nb of iters
        if (nb_iters > maxIterations)
            repeat = false;
    }
    return { centroids: centroids, membershipMatrix: membershipMatrix };
}
exports.default = default_1;
