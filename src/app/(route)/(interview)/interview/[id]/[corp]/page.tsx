'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import QuestionBox from './_components/QuestionBox';
import personalStatement from './_components/personalStatement.json';
import questions from './_components/question.json';
import { PersonalStatementBoxProps, QuestionBoxProps } from './_types/corp';
import ProgressBar from '../../../_components/ProgressBar';
import PersonalStatementBox from './_components/PersonalStatementBox';

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

  const [isSelected, setIsSelected] = useState(false); // 자소서 선택 여부

  const [personalStatementList, setPersonalStatementList] = useState([]); // 자소서 배열
  const [questionList, setQuestionList] = useState([]); // 질문목록 배열

  useEffect(() => {
    setPersonalStatementList(personalStatement.contents); // 자소서 목록 로드
  }, []);

  // 다시 선택 버튼
  const handleReSelct = () => {
    if (isSelected) {
      setIsSelected(false);
    } else {
      router.back();
    }
  };

  const handlePSSelect = () => {
    setIsSelected(true); // 자소서 선택
    setQuestionList(questions.questions); // 질문 목록 로드
  };

  return (
    <section className="interview-container">
      <ProgressBar progress={isSelected ? 67 : 33} />
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
            onClick={handleReSelct}
            className="py-4 px-6 rounded-[28px] primary-1-btn"
          >
            다시 선택
          </motion.button>
        </div>

        {isSelected ? (
          <p className="font-semibold py-8">면접 질문 생성</p>
        ) : (
          <>
            <p className="font-semibold pt-8 pb-4">자기소개서 선택</p>
            <p className="text-sm pb-4">면접을 위해 제출할 자기소개서를 선택하세요</p>
          </>
        )}
      </div>

      <div className="flex flex-col self-stretch gap-5 w-full pb-12">
        {isSelected ? (
          <>
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
          </>
        ) : (
          <>
            {personalStatementList.map((ps: PersonalStatementBoxProps, index) => (
              <motion.div key={ps.id} variants={ListVariants} custom={index} initial="hidden" animate="visible">
                <PersonalStatementBox content={ps.content} onClick={handlePSSelect} />
              </motion.div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
