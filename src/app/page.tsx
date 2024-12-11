import Mailbox from "@/components/mailbox";

// app/page.tsx
export default function Home() {
  return (
    <main className="grid grid-cols-[repeat(2,minmax(0,170px))] gap-10 place-content-center py-20 min-h-[100svh]">
      <Mailbox target="sho" variant='blue' />
      <Mailbox target="iroha" variant='pink' />
      <Mailbox target="miyuu" variant='pink' />
      <Mailbox target="yudai" variant='orange' />
      <Mailbox target="" variant='orange' />
      <Mailbox target="" variant='blue' />
      <Mailbox target="" variant='blue' />
      <Mailbox target="" variant='pink' />
      <Mailbox target="" variant='orange' />
    </main>
  );
}
