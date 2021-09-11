import { Matrix } from './utils';
interface DataObject {
    k: number;
    vectors: number[][];
    epsilon: number;
    fuzziness: number;
}
interface ClusterResults {
    centroids: number[][];
    membershipMatrix: typeof Matrix;
}
export default function ({ k, vectors, epsilon, fuzziness }: Partial<DataObject>): ClusterResults;
export {};
