import Mailbox from "@/components/mailbox";

// app/page.tsx
export default function Home() {
  return (
    <main className="grid grid-cols-[repeat(2,minmax(0,170px))] gap-10 place-content-center py-20 min-h-[100svh] bg-gray-100">
      <Mailbox variant='blue' />
      <Mailbox variant='pink' />
      <Mailbox variant='pink' />
      <Mailbox variant='orange' />
      <Mailbox variant='orange' />
      <Mailbox variant='blue' />
      <Mailbox variant='blue' />
      <Mailbox variant='pink' />
      <Mailbox variant='orange' />
    </main>
  );
}
