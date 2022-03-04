import startCase from 'lodash/startCase'
import capitalize from 'lodash/capitalize'
import {
  partition
} from 'lodash'

const pathWithoutBase = (path, base) => {
  return path
    .join('/')
    .replace(base.join('/'), '')
    .split('/')
    .filter((subRoute) => {
      return Boolean(subRoute)
    })
}

const formatPath = (paths, base) => {
  return paths.map((definition) => {
    return {
      name: capitalize(startCase(pathWithoutBase(definition.path, base)[0])),
      url: `/${definition.path.join('/')}`
    }
  })
}
export const getStructuredRoutes = (routes, currentRoute) => {
  const [ secondaryRoutes, topLevelRoutes ] = partition(
    routes.filter((definition) => {
      return (
        (definition.path.length === 1 ||
          pathWithoutBase(definition.path, currentRoute.base).length === 1) &&
        definition.scope !== 'teamMember'
      )
    }),
    {
      scope: 'legal'
    }
  )

  return {
    topLevelRoutes: formatPath(topLevelRoutes, currentRoute.base),
    secondaryRoutes: formatPath(secondaryRoutes, currentRoute.base)
  }
}
