export default function Mailbox() {
    return (
        <div className="hover:scale-125 transition cursor-pointer">
            <MailboxHead />
            <MailboxFoot />
        </div>
    )
}

function MailboxHead() {
    return (
        <div className="w-[170px] h-[80px] relative">
            <MailboxSlot />
            <MailboxBody />
        </div>
    )
}

function MailboxFoot() {
    return (
        <div className="bg-[#BED0FF] border-2 border-black border-t-0 w-[50px] aspect-square mx-auto" />
    )
}

function MailboxSlot() {
    return (
        <div className="absolute w-[70px] h-[80px] top-0 z-mailbox-slot">
            <div className="bg-[#BED0FF] rounded-mailbox w-[70px] h-[30px] border-2 border-b-0 border-black" />
            <div className="bg-[#BED0FF] w-[70px] h-[50px] border-2 border-t-0 border-black" />
            <MailboxSlotInside />
        </div>
    )
}

function MailboxSlotInside() {
    return (
        <div className="absolute w-[60px] h-[70px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-mailbox-slot-inside">
            <div className="bg-[#F2ECEC] rounded-mailbox w-[60px] h-[25px] border-2 border-b-0 border-black flex justify-center items-center">
                <div className="rounded-full bg-[#7D8FE8] w-2 border-2 border-black aspect-square" />
            </div>
            <div className="bg-[#F2ECEC] w-[60px] h-[45px] border-2 border-t-0 border-black">
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2">
                    <div className="bg-[#7D8FE8] w-[30px] h-[6px] border-2 border-black" />
                    <div className="relative flex justify-center mt-[2px]">
                        <div className="bg-[#7D8FE8] w-[30px] h-[6px] border-2 border-black" />
                        <div className="absolute top-[4px] bg-[#7D8FE8] w-[6px] h-[15px] border-2 border-t-0 border-black z-mailbox-slot-inside-t-bottom" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function MailboxBody() {
    return (
        <div className="absolute w-[132px] h-[80px] top-0 right-0 z-mailbox-body">
            <div className="bg-[#7D8FE8] absolute top-0 left-0 w-[97px] h-[30px] border-2 border-b-0 border-x-0 border-black" />
            <div className="bg-[#7D8FE8] absolute top-0 right-0 rounded-[0_100%_0_0] w-[35px] h-[30px] border-2 border-b-0 border-l-0 border-black" />
            <div className="bg-[#7D8FE8] absolute bottom-0 right-0 w-[132px] h-[50px] border-2 border-t-0 border-l-0 border-black" />
        </div>
    )
}