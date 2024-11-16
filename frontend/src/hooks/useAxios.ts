import { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axiosInstance'

export const useAxios = (
    url: string,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
) => {
    const [response, setResponse] = useState<any>(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // const controller = new AbortController()
        ;(async () => {
            try {
                console.log('Kaam shuru')
                setLoading(true)
                const response = await axiosInstance({
                    url,
                    method,
                    // signal: controller.signal
                })
                setResponse(response.data)
            } catch (err: any) {
                console.log(err)
                // if(axios.)
                setError(err)
            } finally {
                setLoading(false)
            }
        })()

        return () => {
            console.log('kaam hogya')
        }
    }, [url])

    return [response, loading, error]
}
