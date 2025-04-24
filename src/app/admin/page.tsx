import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PendingListingTable } from '@/app/admin/components/pendingListingTable';
import PendingProfileTable from '@/app/admin/components/pendingProfileTable';

export default async function Admin() {
  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <h1 className="my-4 font-semibold tracking-widest text-lg">
        Administrative
      </h1>
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Listing</TabsTrigger>
          <TabsTrigger value="password">Profiles</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <PendingListingTable />
        </TabsContent>
        <TabsContent value="password">
          <PendingProfileTable />
        </TabsContent>
      </Tabs>
    </main>
  );
}
