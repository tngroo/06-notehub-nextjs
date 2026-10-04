
import {fetchNoteById} from '@/lib/api'
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query' 
import NoteDetailsClient from './NoteDetails.client'

interface ViewDetailsProps{
  params: Promise<{id: string}>
}

const ViewDetails = async ({params} :ViewDetailsProps) => {
  const {id} = await params

  const queryClient = new QueryClient()
    const note = await queryClient.prefetchQuery({
      queryKey: ['notes', id],
      queryFn: () => fetchNoteById(id),
    })

  return (
   <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>)
}

export default ViewDetails