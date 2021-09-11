"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomVectors = exports.Matrix = exports.multiplyVectorByValue = exports.addVectors = void 0;
const compareArray = function (sourceArr, testArr) {
    if (sourceArr.length !== testArr.length)
        return false;
    for (var i = 0; i < testArr.length; i++) {
        if (sourceArr[i].compare) {
            if (!sourceArr[i].compare(testArr[i]))
                return false;
        }
        if (sourceArr[i] !== testArr[i])
            return false;
    }
    return true;
};
function addVectors(vec1, vec2) {
    var N = vec1.length;
    var vec = new Array(N);
    for (var i = 0; i < N; i++)
        vec[i] = vec1[i] + vec2[i];
    return vec;
}
exports.addVectors = addVectors;
function multiplyVectorByValue(value, vec) {
    var N = vec.length;
    var v = new Array(N);
    for (var i = 0; i < N; i++)
        v[i] = value * vec[i];
    return v;
}
exports.multiplyVectorByValue = multiplyVectorByValue;
function Matrix(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.mtx = new Array(rows);
    for (var i = 0; i < rows; i++) {
        var row = new Array(cols);
        for (var j = 0; j < cols; j++)
            row[j] = 0;
        this.mtx[i] = row;
    }
}
exports.Matrix = Matrix;
function getRandomVectors(k, vectors) {
    /*  Returns a array of k distinct vectors randomly selected from a the input array of vectors
      Returns null if k > n or if there are less than k distinct objects in vectors */
    var n = vectors.length;
    if (k > n)
        return null;
    var selected_vectors = new Array(k);
    var selected_indices = new Array(k);
    var tested_indices = new Object();
    var tested = 0;
    var selected = 0;
    var i, vector, select;
    while (selected < k) {
        if (tested === n)
            return null;
        var random_index = Math.floor(Math.random() * n);
        if (random_index in tested_indices)
            continue;
        tested_indices[random_index] = 1;
        tested++;
        vector = vectors[random_index];
        select = true;
        for (i = 0; i < selected; i++) {
            if (compareArray(vector, selected_vectors[i])) {
                select = false;
                break;
            }
        }
        if (select) {
            selected_vectors[selected] = vector;
            selected_indices[selected] = random_index;
            selected++;
        }
    }
    return { vectors: selected_vectors, indices: selected_indices };
}
exports.getRandomVectors = getRandomVectors;
