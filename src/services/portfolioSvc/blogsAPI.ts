import { apiClient } from "./apiClient"

const getBlogs = async () => {
    const { data } = await apiClient.get('/v1/blogs')
    return data
}

const getBlogPost = async (blogId: number) => {
    const { data } = await apiClient.get(`/v1/blogs/${blogId}`)
    return data
}

const getBlogNode = async (blogId: number, nodeId: number) => {
    const { data } = await apiClient.get(`/v1/blogs/${blogId}/${nodeId}`)
    return data
}

export const blogsAPI = {
    getBlogs,
    getBlogPost,
    getBlogNode,
}