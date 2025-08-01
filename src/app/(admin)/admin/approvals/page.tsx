import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PendingListingTable } from '@/app/(admin)/admin/approvals/components/pendingListingTable';

export default async function Approvals() {
  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-3 pt-20">
      <h1 className="my-4 font-semibold tracking-widest text-lg">
        Administrative
      </h1>
      <Tabs defaultValue="listing">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="listing">Listing</TabsTrigger>
        </TabsList>
        <TabsContent value="listing">
          <PendingListingTable />
        </TabsContent>
      </Tabs>
    </main>
  );
}
