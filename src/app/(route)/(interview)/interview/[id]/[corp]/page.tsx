'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import QuestionBox from './_components/QuestionBox';
import questionsData from './_components/question.json';
import { QuestionBoxProps } from './_types/corp';

export const ListVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.25,
    },
  }),
};

export default function QuestionList() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const selectedCorp = params.corp as string;
  const corp = decodeURI(selectedCorp);

  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    setQuestionList(questionsData.questions);
  }, []);

  return (
    <section className="w-full pl-0 sm:pl-7 md:pl-16 lg:pl-20 xl:pl-32 pt-11">
      <p className="font-semibold">모의 면접</p>

      <div className="flex flex-col self-stretch pt-6 w-full sm:w-[320px] lg:w-full">
        <p className="text-sm">선택 기업</p>

        <div className="flex gap-3 pt-3 whitespace-nowrap">
          <motion.div
            className="w-full max-w-64 py-[18px] px-5 bg-gray-4 font-bold rounded-[28px]"
            layoutId={`corp-${corp}`}
          >
            {corp}
          </motion.div>
          <motion.button
            type="button"
            layoutId="select"
            onClick={router.back}
            className="py-[18px] px-6 rounded-[28px] primary-1-btn"
          >
            다시 선택
          </motion.button>
        </div>

        <p className="font-semibold py-8">면접 질문 생성</p>
      </div>

      <div className="flex flex-col self-stretch gap-5">
        {questionList.map((question: QuestionBoxProps, index) => (
          <motion.div key={question.id} variants={ListVariants} custom={index} initial="hidden" animate="visible">
            <QuestionBox
              question={`Q. ${question.question}`}
              onClick={() => {
                router.push(`/interview/${id}/${corp}/${question.id}`);
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
