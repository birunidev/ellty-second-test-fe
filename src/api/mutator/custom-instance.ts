import Axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1',
  withCredentials: true,
})

const ignoredPaths = ['/auth/login', '/auth/register']
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !ignoredPaths.includes(window.location.pathname)
    ) {
      return Promise.reject(error)
    }

    if (error.response?.status === 429) {
      toast.error('Too many requests')
      return Promise.reject(error)
    }

    if (error.response?.status === 409) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message)
      }
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

interface AdditionalAxiosRequestConfig extends AxiosRequestConfig {
  disableNotifyError?: boolean
}

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AdditionalAxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  })
    .then((response) => {
      const data = response.data

      return data
    })
    .catch((error) => {
      return Promise.reject(error)
    })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}
