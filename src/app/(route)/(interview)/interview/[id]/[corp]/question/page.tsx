'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import questions from '../_components/question.json';
import ProgressBar from '../../../../_components/ProgressBar';
import QuestionBox from '../_components/QuestionBox';
import { QuestionBoxProps } from '../_types/corp';
import ListVariants from '../_utils/listVariants';

export default function InterviewQuestion() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const selectedCorp = params.corp as string;
  const corp = decodeURI(selectedCorp);

  const [questionList, setQuestionList] = useState([]); // 질문목록 배열

  useEffect(() => {
    setQuestionList(questions.questions); // 질문 목록 로드
  }, []);
  return (
    <section className="interview-container">
      <ProgressBar progress={67} />
      <p className="font-semibold">모의 면접</p>

      <div className="flex flex-col self-stretch pt-2 w-full">
        <p className="text-sm">선택 기업</p>
        <div className="flex gap-3 pt-3 whitespace-nowrap">
          <motion.div
            className="w-full max-w-64 py-4 px-5 bg-gray-4 font-bold rounded-[28px]"
            layoutId={`corp-${corp}`}
          >
            {corp}
          </motion.div>
          <motion.button
            type="button"
            layoutId="select"
            onClick={() => router.back()}
            className="py-4 px-6 rounded-[28px] primary-1-btn"
          >
            다시 선택
          </motion.button>
        </div>

        <p className="font-semibold py-8">면접 질문 생성</p>
      </div>

      <div className="flex flex-col self-stretch gap-5 w-full pb-12">
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

        <button
          type="button"
          onClick={() => {
            console.log('질문 다시 생성');
          }}
          className="flex self-center mt-3 px-6 py-4 max-w-fit rounded-[28px] primary-1-btn"
        >
          질문 다시 생성
        </button>
      </div>
    </section>
  );
}
