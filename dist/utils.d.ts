export declare function addVectors(vec1: any, vec2: any): any[];
export declare function multiplyVectorByValue(value: any, vec: any): any[];
export declare class Matrix {
    rows: number;
    cols: number;
    mtx: number[][];
    constructor(rows: any, cols: any);
    copy(): Matrix;
    toString(): string;
}
export declare function getRandomVectors(k: any, vectors: any): {
    vectors: any[];
    indices: any[];
};
