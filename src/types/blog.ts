enum BlogStatus {
    Draft = 'DRAFT',
    Published = 'PUBLISHED',
}

export type BlogType = {
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