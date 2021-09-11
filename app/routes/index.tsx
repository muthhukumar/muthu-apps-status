import { json, LoaderFunction } from '@remix-run/server-runtime'
import { useRouteData } from 'remix'
import clsx from 'clsx'

import { getUrls, getUrlsStatus } from '~/utils/status.server'
import { getCellBorderStyles, useWindowDimensions } from '~/utils'

import StatusIcon from '~/components/StatusIcon'

interface Status {
  url: string
  isOperational: boolean
  name: string
}

export const loader: LoaderFunction = async () => {
  const urls = await getUrls()

  const urlsStatus = await getUrlsStatus(urls)

  return json(urlsStatus)
}

export default function Index() {
  const urlsStatus = useRouteData<Array<Status>>()
  const { width } = useWindowDimensions()

  const isAllURlOperational = urlsStatus.every((url) => url.isOperational)

  return (
    <div className="p-4 text-primary">
      <h2
        className={clsx('p-4 mb-10 font-bold text-white rounded-md', {
          'bg-green-500 ': isAllURlOperational,
          'bg-red-500 ': !isAllURlOperational,
        })}
      >
        {isAllURlOperational ? 'All' : 'Some'} System Operational
      </h2>
      <div className="grid grid-cols-1 rounded-lg md:grid-cols-2">
        {urlsStatus.length > 0 &&
          urlsStatus.map((status, index) => {
            const size = urlsStatus.length
            return (
              <div
                key={status.url + index}
                className={clsx(
                  'p-5 px-6 flex items-center justify-between border',
                  getCellBorderStyles({ width, index, size }),
                )}
              >
                <div className="font-medium">{status.name}</div>
                <StatusIcon isOperational={status.isOperational} />
              </div>
            )
          })}
      </div>
      {urlsStatus.length === 0 && <div className="py-4 text-center">Oops. No entries found.</div>}
      {urlsStatus.length > 0 && (
        <div className="flex items-center justify-center p-8 mt-4">
          <div className="flex items-center mr-8">
            <StatusIcon isOperational={true} /> <div className="ml-2 text-sm">Operational</div>
          </div>
          <div className="flex items-center">
            <StatusIcon isOperational={false} /> <div className="ml-2 text-sm">Major outbreak</div>
          </div>
        </div>
      )}
    </div>
  )
}
