"use client";
import { Friends } from "@/components/assets/friends";
import { FriendsSm } from "@/components/assets/friends-sm";
import { Nah } from "@/components/assets/nah";
import { TopArrow } from "@/components/assets/top-arrow";
import { Yep } from "@/components/assets/yep";
import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";

type Card = {
  id: number;
  title: string;
};

type Vote = {
  its: "nah" | "yep";
  card: Card;
};

const initialCards: Card[] = Array.from({ length: 10 }).map((_, index) => ({
  id: index,
  title: `card ${index}`,
}));

export default function Home() {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [votes, setVotes] = useState<Vote[]>([]);

  const position = useMotionValue(0);

  return (
    <main className="bg-[#F9F8F1] h-[100dvh] w-[100dvw] flex flex-grow flex-col">
      <Heading />
      <Subheading />
      <section className="pt-5 flex flex-col justify-between flex-grow">
        <RestaurantsRemaning remaning={cards.length} />
        <Cards
          setCards={setCards}
          setVotes={setVotes}
          cards={cards}
          position={position}
        />
        <Footer position={position} />
      </section>
    </main>
  );
}

const Heading = () => {
  return (
    <section className="grid bg-[#FFFFFF] grid-cols-3 justify-between px-4 py-3">
      <div />
      <div className="flex flex-col gap-1 items-center justify-center text-center">
        <h2 className="text-base font-bold leading-3 whitespace-nowrap">
          Birthday Party
        </h2>
        <span className="text-xs leading-3">1 Member</span>
      </div>
      <div className="flex items-center justify-end flex-row gap-2">
        <svg
          width="37"
          height="33"
          viewBox="0 0 37 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.4248"
            y="0.78125"
            width="35"
            height="31"
            rx="15.5"
            fill="white"
          />
          <rect
            x="1.4248"
            y="0.78125"
            width="35"
            height="31"
            rx="15.5"
            stroke="#E4E3E1"
          />
          <path
            d="M26.9248 17.2812V22.2812C26.9248 23.3858 26.0294 24.2812 24.9248 24.2812H12.9248C11.8202 24.2812 10.9248 23.3858 10.9248 22.2812V17.2812M22.9248 12.2812L18.9248 8.28125M18.9248 8.28125L14.9248 12.2812M18.9248 8.28125V20.2812"
            stroke="#212121"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          width="37"
          height="33"
          viewBox="0 0 37 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.4248"
            y="0.78125"
            width="35"
            height="31"
            rx="15.5"
            fill="white"
          />
          <rect
            x="1.4248"
            y="0.78125"
            width="35"
            height="31"
            rx="15.5"
            stroke="#E4E3E1"
          />
          <g clip-path="url(#clip0_13298_3573)">
            <path
              d="M18.9274 22.4466C22.6093 22.4466 25.5941 19.4618 25.5941 15.7799C25.5941 12.098 22.6093 9.11328 18.9274 9.11328C15.2455 9.11328 12.2607 12.098 12.2607 15.7799C12.2607 19.4618 15.2455 22.4466 18.9274 22.4466Z"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.9248 18.4479V15.7812"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.9248 13.1133H18.9315"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_13298_3573">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(10.9248 7.78125)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </section>
  );
};

const Subheading = () => {
  return (
    <section className="flex flex-row justify-between bg-[#FFFFFF] border-y border-[#E4E3E1] p-4">
      <div className="flex flex-row gap-1 items-center">
        <Friends />
        <span className="font-bold text-xs">5 Friends voting...</span>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <FriendsSm />
        <span className="font-bold text-xs">2 Friends done</span>
      </div>
    </section>
  );
};

type RestaurantsRemaningProps = {
  remaning: number;
};

const RestaurantsRemaning = ({ remaning }: RestaurantsRemaningProps) => {
  const percentage = Math.round(
    ((initialCards.length - remaning) / initialCards.length) * 100
  );

  return (
    <motion.section
      layout
      className="h-2 flex flex-row justify-between gap-3 px-4"
    >
      <span className="text-[11px] leading-[8px] font-medium">
        <span className="w-[2ch] inline-block">{remaning}</span> Restaurants
        left to vote on
      </span>
      <div className={`bg-[#E7E5DB] rounded-full flex-grow overflow-hidden`}>
        <motion.div
          layout
          animate={{
            width: `${percentage}%`,
          }}
          className={cn(`bg-[#15A154] h-full min-w-2`)}
        />
      </div>
    </motion.section>
  );
};

type CardsProps = {
  cards: Card[];
  setVotes: Dispatch<SetStateAction<Vote[]>>;
  setCards: Dispatch<SetStateAction<Card[]>>;
  position: MotionValue<number>;
};

const Cards = ({ cards, setVotes, setCards, position }: CardsProps) => {
  const constraintsRef = useRef(null);

  const vote = (vote: Vote) => {
    setVotes((prev) => [vote, ...prev]);
    const nextCards = cards.filter(({ id }) => id !== vote.card.id);
    setCards(nextCards);
  };

  useMotionValueEvent(position, "animationComplete", () => {
    console.log(`motion value change`);
    if (position.get() === 0) return;

    const its: Vote["its"] = position.get() === 300 ? "yep" : "nah";
    const card = cards[cards.length - 1];

    vote({
      its,
      card,
    });
    position.set(0);
  });

  return (
    <motion.section
      ref={constraintsRef}
      className="flex flex-grow max-w-[100dvw] overflow-hidden items-center justify-center relative"
    >
      {cards.map((card, index) => {
        const isTopCard = index === cards.length - 1;

        return (
          <motion.div
            drag="x"
            dragSnapToOrigin
            whileTap={{
              scale: 1.05,
              cursor: "grabbing",
            }}
            onDragEnd={(_, { offset }) => {
              const its = offset.x > 0 ? "yep" : "nah";

              vote({
                its,
                card,
              });
            }}
            dragConstraints={constraintsRef}
            className="aspect-[382/471] touch-none flex items-center justify-center rounded-[20px] absolute w-[60dvw] border border-[#E4E3E1] bg-white shadow"
            style={{
              x: isTopCard ? position : undefined,
            }}
            initial={{
              rotate: index * Math.random(),
            }}
            key={card.id}
          >
            {card.id + 1}
          </motion.div>
        );
      })}
    </motion.section>
  );
};

type FooterProps = {
  position: MotionValue<number>;
};

const Footer = ({ position }: FooterProps) => {
  const handleClickNah = () => {
    console.log(`nah`);

    animate(position, -300, { duration: 0.3 });
  };

  const handleClickYep = () => {
    animate(position, 300, { duration: 0.3 });
  };

  return (
    <section className="flex flex-row justify-between items-center gap-x-6 px-4">
      <div onPointerDown={handleClickNah}>
        <Nah />
      </div>
      <div
        onClick={() => alert(`to be implement, its just a mock`)}
        className="bg-white flex-grow h-[88px] rounded-t-[10px] flex flex-col items-center justify-center gap-4 pb-[22px] pt-[10px]"
      >
        <TopArrow />
        <span className="text-[13px] leading-3 font-bold italic">RESULTS</span>
      </div>
      <div onPointerDown={handleClickYep}>
        <Yep />
      </div>
    </section>
  );
};
