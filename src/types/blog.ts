export enum BlogStatus {
    Draft = 'DRAFT',
    Published = 'PUBLISHED',
}

export type Blog = {
    id: number,
    status: BlogStatus,
    author: string,
    category: string,
    titleEn: string,
    descriptionEn: string,
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string,
}

export enum BlogNodeType {
    MD = 'MD',
    HTML = 'HTML',
    Image = 'IMAGE',
    Video = 'VIDEO',
    P5Sketch = 'P5_SKETCH',
}

export type BlogNode = {
    id: number,
    blogId: number,
    order: number,
    type: BlogNodeType,
    fileName: string,
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string,
}
