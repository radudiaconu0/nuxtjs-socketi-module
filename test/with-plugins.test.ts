import { setupTest, getNuxt, get, url } from '@nuxt/test-utils'

describe('with-plugins', () => {
  setupTest({
    server: true,
    fixture: 'fixture/with-plugins'
  })

  test('socketi plugin should be defined', async () => {
    /* @ts-ignore */
    const window = await getNuxt().renderAndGetWindow(url('/'))
    expect(window.$nuxt.$socketi).toBeDefined()
    expect(window.$nuxt.$socketi.plugin).toBe(true)
  })

  test('render', async () => {
    const { body } = await get('/')
    expect(body).toContain('Works!')
  })
})
