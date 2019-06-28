/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const ava = require('ava')
const scoring = require('../../lib/engine/scoring')
const TEST_THEME = require('../../default-theme.json')

ava('.getScoreMap() should get the score map of an empty combination', (test) => {
  const map = scoring.getScoreMap([])
  test.deepEqual(map, {})
})

ava('.getScoreMap() should get the score map of a one element combination', (test) => {
  const map = scoring.getScoreMap([
    {
      component: 'foo',
      rank: 1,
      options: {
        theme: TEST_THEME
      }
    }
  ])

  test.deepEqual(map, {
    foo: 1
  })
})

ava('.getScoreMap() should get the score map of a two elements combination', (test) => {
  const map = scoring.getScoreMap([
    {
      component: 'foo',
      rank: 1,
      options: {
        theme: TEST_THEME
      }
    },
    {
      component: 'bar',
      rank: 2,
      options: {
        theme: TEST_THEME
      }
    }
  ])

  test.deepEqual(map, {
    foo: 1,
    bar: 2
  })
})

ava('.getScoreMap() should prefer the higher rank given two equal components', (test) => {
  const map = scoring.getScoreMap([
    {
      component: 'foo',
      rank: 2,
      options: {
        theme: TEST_THEME
      }
    },
    {
      component: 'foo',
      rank: 1,
      options: {
        theme: TEST_THEME
      }
    },
    {
      component: 'bar',
      rank: 2,
      options: {
        theme: TEST_THEME
      }
    }
  ])

  test.deepEqual(map, {
    foo: 2,
    bar: 2
  })
})

ava('.isScoreSubMap() should return true given two empty score maps', (test) => {
  const result = scoring.isScoreSubMap({}, {})
  test.true(result)
})

ava('.isScoreSubMap() should return false given an empty and non empty score maps', (test) => {
  const result = scoring.isScoreSubMap({}, {
    foo: 1
  })

  test.false(result)
})

ava('.isScoreSubMap() should return false given a missing key', (test) => {
  const result = scoring.isScoreSubMap({
    foo: 1
  }, {
    bar: 1
  })

  test.false(result)
})

ava('.isScoreSubMap() should return false given an extra key', (test) => {
  const result = scoring.isScoreSubMap({
    foo: 1
  }, {
    foo: 2,
    bar: 1
  })

  test.false(result)
})

ava('.isScoreSubMap() should return true given a greater rank', (test) => {
  const result = scoring.isScoreSubMap({
    foo: 1
  }, {
    foo: 2
  })

  test.true(result)
})

ava('.isScoreSubMap() should return true given an equal rank', (test) => {
  const result = scoring.isScoreSubMap({
    foo: 1
  }, {
    foo: 1
  })

  test.true(result)
})

ava('.isScoreSubMap() should return false given a smaller rank', (test) => {
  const result = scoring.isScoreSubMap({
    foo: 2
  }, {
    foo: 1
  })

  test.false(result)
})

ava('.isScoreSubMap() should return false given a greater rank of one key', (test) => {
  const result = scoring.isScoreSubMap({
    foo: 3,
    bar: 1
  }, {
    foo: 1,
    bar: 2
  })

  test.false(result)
})

ava('.isExtraCombination() should return false given no combinations', (test) => {
  const result = scoring.isExtraCombination([], [
    {
      component: 'foo',
      rank: 1,
      options: {
        theme: TEST_THEME
      }
    }
  ])

  test.false(result)
})

ava('.isExtraCombination() should return true given a higher rank', (test) => {
  const result = scoring.isExtraCombination([
    [
      {
        component: 'foo',
        rank: 1,
        options: {
          theme: TEST_THEME
        }
      }
    ]
  ], [
    {
      component: 'foo',
      rank: 2,
      options: {
        theme: TEST_THEME
      }
    }
  ])

  test.true(result)
})

ava('.isExtraCombination() should return false given a smaller rank', (test) => {
  const result = scoring.isExtraCombination([
    [
      {
        component: 'foo',
        rank: 2,
        options: {
          theme: TEST_THEME
        }
      }
    ]
  ], [
    {
      component: 'foo',
      rank: 1,
      options: {
        theme: TEST_THEME
      }
    }
  ])

  test.false(result)
})

ava('.isExtraCombination() should return true given an equal rank', (test) => {
  const result = scoring.isExtraCombination([
    [
      {
        component: 'foo',
        rank: 1,
        options: {
          theme: TEST_THEME
        }
      }
    ]
  ], [
    {
      component: 'foo',
      rank: 1,
      options: {
        theme: TEST_THEME
      }
    }
  ])

  test.true(result)
})

ava('.isExtraCombination() should return true given a component subset', (test) => {
  const result = scoring.isExtraCombination([
    [
      {
        component: 'foo',
        rank: 1,
        options: {
          theme: TEST_THEME
        }
      },
      {
        component: 'bar',
        rank: 2,
        options: {
          theme: TEST_THEME
        }
      },
      {
        component: 'baz',
        rank: 3,
        options: {
          theme: TEST_THEME
        }
      }
    ]
  ], [
    {
      component: 'baz',
      rank: 4,
      options: {
        theme: TEST_THEME
      }
    },
    {
      component: 'foo',
      rank: 1,
      options: {
        theme: TEST_THEME
      }
    }
  ])

  test.true(result)
})
