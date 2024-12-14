import Mailbox from "@/components/mailbox";

// app/page.tsx
export default function Home() {
  return (
    <main className="grid grid-cols-[repeat(2,minmax(0,170px))] gap-y-6 gap-x-2 place-content-center place-items-center py-20 min-h-[100svh]">
      <Mailbox target="sho" variant='blue' />
      <Mailbox target="iroha" variant='pink' />
      <Mailbox target="miyuu" variant='pink' />
      <Mailbox target="yudai" variant='orange' />
      <Mailbox target="atsuko" variant='orange' />
      <Mailbox target="hitomi" variant='blue' />
      <Mailbox target="mitsuki" variant='pink' />
      <Mailbox target="taiga" variant='orange' />
      <Mailbox target="tatsuya" variant='blue' />
    </main>
  );
}
