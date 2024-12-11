// @/app/components/Mailbox.tsx
interface MailboxColors {
  main: string; // メインの色（例: 本体部分）
  sub: string;  // サブの色（例: 内部やスロット部分）
}

// リテラル型でvariantを定義
type MailboxVariant = 'blue' | 'pink' | 'green' | 'yellow';

const colorMap: Record<MailboxVariant, MailboxColors> = {
  blue: {
    main: 'bg-[#7D8FE8] border-black',
    sub: 'bg-[#BED0FF] border-black',
  },
  pink: {
    main: 'bg-[#FF9999] border-red-500',
    sub: 'bg-[#FFC1C1] border-red-500',
  },
  green: {
    main: 'bg-[#99FFB3] border-green-500',
    sub: 'bg-[#C1FFD6] border-green-500',
  },
  yellow: {
    main: 'bg-[#FFEB99] border-yellow-500',
    sub: 'bg-[#FFF4C1] border-yellow-500',
  },
};

interface MailboxProps {
  variant?: MailboxVariant; // 明示的なリテラル型で型補完対応
}

export default function Mailbox({ variant = 'blue' }: MailboxProps) {
  const colors = colorMap[variant];

  return (
    <div className="hover:scale-125 transition cursor-pointer">
      <MailboxHead colors={colors} />
      <MailboxFoot colors={colors} />
    </div>
  );
}

function MailboxHead({ colors }: { colors: MailboxColors }) {
  return (
    <div className="w-[170px] h-[80px] relative">
      <MailboxSlot colors={colors} />
      <MailboxBody colors={colors} />
    </div>
  );
}

function MailboxFoot({ colors }: { colors: MailboxColors }) {
  return <div className={`w-[50px] aspect-square mx-auto border-2 border-t-0 ${colors.sub}`} />;
}

function MailboxSlot({ colors }: { colors: MailboxColors }) {
  return (
    <div className="absolute w-[70px] h-[80px] top-0 z-mailbox-slot">
      <div className={`rounded-mailbox w-[70px] h-[30px] border-2 border-b-0 ${colors.sub}`} />
      <div className={`w-[70px] h-[50px] border-2 border-t-0 ${colors.sub}`} />
      <MailboxSlotInside colors={colors} />
    </div>
  );
}

function MailboxSlotInside({ colors }: { colors: MailboxColors }) {
  return (
    <div className="absolute w-[60px] h-[70px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-mailbox-slot-inside">
      <div
        className={`rounded-mailbox w-[60px] h-[25px] border-2 border-b-0 flex justify-center items-center bg-[#F2ECEC]`}
      >
        <div className={`rounded-full w-2 border-2 aspect-square ${colors.main}`} />
      </div>
      <div className={`w-[60px] h-[45px] border-2 border-t-0 bg-[#F2ECEC]`}>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2">
          <div className={`w-[30px] h-[6px] border-2 ${colors.main}`} />
          <div className="relative flex justify-center mt-[2px]">
            <div className={`w-[30px] h-[6px] border-2 ${colors.main}`} />
            <div
              className={`absolute top-[4px] w-[6px] h-[15px] border-2 border-t-0 z-mailbox-slot-inside-t-bottom ${colors.main}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MailboxBody({ colors }: { colors: MailboxColors }) {
  return (
    <div className="absolute w-[132px] h-[80px] top-0 right-0 z-mailbox-body">
      <div className={`absolute top-0 left-0 w-[97px] h-[30px] border-2 border-b-0 border-x-0 ${colors.main}`} />
      <div
        className={`absolute top-0 right-0 rounded-[0_100%_0_0] w-[35px] h-[30px] border-2 border-b-0 border-l-0 ${colors.main}`}
      />
      <div className={`absolute bottom-0 right-0 w-[132px] h-[50px] border-2 border-t-0 border-l-0 ${colors.main}`} />
    </div>
  );
}
