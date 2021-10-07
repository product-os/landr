/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Render a Landr component.
 *
 * This component takes an object of React components indexed
 * by name, and a definition of the component you want to render
 * along with the options you want to pass to it.
 *
 * For example:
 *
 * const components = {
 *   Green: {
 *     render: (props) => { ... }
 *   }
 * }
 *
 * <LandrComponent analytics={analytics} components={components} definition={{
 *   component: 'Greet',
 *   options: { name: 'John' }
 * }} />
 */

module.exports = (props) => {
  return props.components[props.definition.component]
    .render(props.definition.options, props.analytics, props.config)
}
