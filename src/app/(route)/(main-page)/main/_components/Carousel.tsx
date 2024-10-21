import Image from 'next/image';

export default function Carousel() {
  return (
    <div id="캐러셀" className="w-full aspect-[16/9] max-h-[280px] rounded-[10px] relative overflow-hidden">
      <Image
        src="/assets/carousel1.png"
        alt="캐러셀 1"
        layout="fill"
        objectFit="contain"
        sizes="(max-width: 768px) 100vw, 982px"
        className="w-full h-full"
      />
    </div>
  );
}
