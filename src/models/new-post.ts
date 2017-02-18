export class NewPostModel {
    constructor(
        public title: string,
        public description: string,
        public reward: number,
        public category: string,
        public subCategory: string
    ) { }
}
