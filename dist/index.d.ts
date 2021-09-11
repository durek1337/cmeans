import { Matrix } from './utils';
interface DataObject {
    k: number;
    vectors: number[][];
    epsilon: number;
    fuzziness: number;
}
interface ClusterResults {
    centroids: number[][];
    membershipMatrix: Matrix;
}
export type { DataObject, ClusterResults };
export default function ({ k, vectors, epsilon, fuzziness }: Partial<DataObject>): ClusterResults;
