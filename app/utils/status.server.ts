import { Octokit } from 'octokit'

const octokit = new Octokit()

interface UrlsProperties {
  url: string
  name: string
  env: null | string
}

async function getUrls() {
  try {
    const gist_id = 'ebb4ffb5cc775f17416e3f3845dfc1e6'

    const ghResponse = await octokit.request('GET /gists/{gist_id}', { gist_id })

    if (ghResponse.status === 200) {
      if (ghResponse.data.files) {
        const fileName = Object.keys(ghResponse.data.files)[0]

        const rawUrl = ghResponse.data.files[fileName]?.raw_url

        if (!rawUrl) {
          throw new Error(`Raw url not found. raw_url: ${rawUrl}`)
        }

        const response = await fetch(rawUrl)

        const json = await response.json()

        if ('urls' in json) {
          return json['urls'] as Array<UrlsProperties>
        }
      }
    }
  } catch (error) {
    return []
  }

  return []
}

function getUrlHeader(envKey: string) {
  const envConfig: { [key: string]: any } = {
    'hasura-admin-secret': { method: 'post' },
  }

  if (!envConfig[envKey]) {
    return {}
  }

  return envConfig[envKey]
}

async function getUrlsStatus(urls: Array<UrlsProperties>) {
  const mappedUrls = urls.map(async ({ url, name, env }) => {
    try {
      const config = env ? getUrlHeader(env) : {}

      const response = await fetch(url, config)

      if (response.ok) {
        return { isOperational: true, url, name }
      }
      return { isOperational: false, url, name }
    } catch {
      return { isOperational: false, url, name }
    }
  })

  return Promise.all(mappedUrls)
}

export { getUrlsStatus, getUrls }
