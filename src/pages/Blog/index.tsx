import { useTranslation } from 'react-i18next'
import usePageTitle from '../../hooks/usePageTitle'

const Blog = () => {
    const { t } = useTranslation()
    usePageTitle(t('blog_document_title'))

    return (
        <main>Blog</main>
    )
}

export default Blog