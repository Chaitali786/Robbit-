import {QueryClient, QueryClientProvider as OriginalQueryClientProvider} from '@tanStack/react-query'

const makeQueryClient = () => {
  return new QueryClient()
}

let browserQueryClient : QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === "undefined") 
    return makeQueryClient()
  else if(!browserQueryClient) 
    browserQueryClient = makeQueryClient()
}