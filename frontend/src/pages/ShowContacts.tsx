// import { Container } from "../components/Container"

import { Container, MenuItem, Select } from '@mui/material'
import { useAxios } from '../hooks/useAxios'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components/Loader'

import { ContactTable } from '../components/ContactTable'
import { SearchBar } from '../components/SearchBar'

type QueryParams = {
    page: number
    sort: number
    search: string
    limit: number
}

export const ShowContacts = () => {
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 1,
        sort: 1,
        search: '',
        limit: 10,
    })
    const nav = useNavigate()
    const [response, loading, _] = useAxios(
        `/contact?search=${queryParams.search}&sort=${queryParams.sort}&page=${
            queryParams.page - 1
        }&limit=${queryParams.limit}`,
        'GET',
    )

    return (
        <Container
            maxWidth="xl"
            className="p-10 w-[90vw] flex flex-col items-center justify-start"
        >
            <div className="w-full flex items-center justify-between">
                <h1 className="text-2xl font-medium text-gray-600">Contacts</h1>
                <SearchBar
                    value={queryParams.search}
                    setValue={(e: any) =>
                        setQueryParams({
                            ...queryParams,
                            search: e.target.value,
                        })
                    }
                />
                <Button variant="contained" onClick={() => nav('/create')}>
                    Add Contact
                </Button>
            </div>
            <div className="w-full flex items-center justify-center gap-10 my-4">
                <div className="space-x-2 text-sm text-gray-600">
                    <label htmlFor="page">Page: </label>
                    <Select
                        labelId="page"
                        size="small"
                        variant="outlined"
                        id="demo-simple-select"
                        value={queryParams.page.toString()}
                        label="Page"
                        onChange={(e) =>
                            setQueryParams((prev) => ({
                                ...prev,
                                page: Number(e.target.value),
                            }))
                        }
                    >
                        {Array.from(Array(10).keys()).map((key) => (
                            <MenuItem key={key} value={key + 1}>
                                {key + 1}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="space-x-2 text-sm text-gray-600">
                    <label htmlFor="sort">Sort: </label>
                    <Select
                        labelId="sort"
                        id="demo-simple-select"
                        value={queryParams.sort.toString()}
                        label="Page"
                        size="small"
                        onChange={(e) =>
                            setQueryParams((prev) => ({
                                ...prev,
                                sort: Number(e.target.value),
                            }))
                        }
                    >
                        <MenuItem value={'1'}>Ascending</MenuItem>
                        <MenuItem value={'-1'}>Descending</MenuItem>
                    </Select>
                </div>

                <div className="space-x-2 text-sm text-gray-600">
                    <label htmlFor="limit">Limit: </label>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size="small"
                        value={queryParams.limit.toString()}
                        label="Page"
                        onChange={(e) =>
                            setQueryParams((prev) => ({
                                ...prev,
                                limit: Number(e.target.value),
                            }))
                        }
                    >
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'10'}>10</MenuItem>
                        <MenuItem value={'12'}>12</MenuItem>
                        <MenuItem value={'15'}>15</MenuItem>
                    </Select>
                </div>
            </div>
            {!loading ? <ContactTable allContacts={response.data} /> : <Loader />}
        </Container>
    )
}
