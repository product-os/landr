export const name = 'DocViewer'

export const variants = (metadata, context, route) => {
  const combinations = []

  if (context.article) {
    combinations.push({
      title: context.article.content.title,
      date: context.article.content.published_at,
      author:
        context.article.content.author && context.article.content.author.handle,
      current: route.path,
      toc: context.toc,
      docsTableOfContent: context.docsTableOfContent,
      versions: context.versions || [],
      link: `${metadata.data.links.repository.replace(
        '.git',
        ''
      )}/edit/master/${context.article.content.filename}`,
      content: context.article.content.data,
      latest: context.latest,
      version: context.version
    })
  }

  return combinations
}

export default {
  name,
  variants
}
