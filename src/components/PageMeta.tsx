import { Helmet } from 'react-helmet-async'
import useScrollToTop from '@/hooks/useScrollToTop'
import usePageTitle from '@/hooks/usePageTitle'

type PageMetaProps = {
  title: string
  description: string
  robots?: string
  canonicalUrl?: string
}

const PageMeta = ({
  title,
  description,
  robots = 'index, follow',
  canonicalUrl,
}: PageMetaProps) => {
  useScrollToTop()
  usePageTitle(title)

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  )
}

export default PageMeta
