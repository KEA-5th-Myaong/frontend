'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { usePDF, Margin } from 'react-to-pdf';
import Image from 'next/image';
import Modal, { initailModalState } from '../../../../../../_components/Modal';
import { PSFormData } from '../../create/_types/psCreate';
import PSFooter from '../../../../_components/PSFooter';
import PSHeader from '../../../../_components/PSHeader';
import PSReadContent from './PSReadContent';
import { fetchPS } from '@/app/(route)/(personal-statement)/_services/psServices';
import useCustomQuery from '@/app/_hooks/useCustomQuery';

export default function PSReadContainer() {
  const router = useRouter();
  const params = useParams();

  const getPostId = (param: string | string[]): string => {
    if (Array.isArray(param)) {
      return param[1];
    }
    return param;
  };

  const postId = decodeURI(getPostId(params.id));

  const { data: psData } = useCustomQuery(['ps', postId], () => fetchPS(postId));

  const [psState, setPsState] = useState<PSFormData>({
    title: '',
    position: '',
    reason: '',
    content: '',
  });

  const [modalState, setModalState] = useState(initailModalState);

  useEffect(() => {
    setPsState(psData?.data);
  }, [psData]);

  // 삭제 클릭
  const handleDeleteClick = () => {
    setModalState((prev) => ({
      ...prev,
      open: true,
      hasSubBtn: true,
      topText: '자기소개서를 삭제하시겠습니까?',
      subBtnText: '취소',
      btnText: '확인',
      onSubBtnClick: () => setModalState(initailModalState),
      onBtnClick: () =>
        setModalState((prev2) => ({
          ...prev2,
          open: true,
          hasSubBtn: false,
          topText: '삭제되었습니다.',
          btnText: '확인',
          onBtnClick: () => setModalState(initailModalState),
        })),
    }));
  };

  const { toPDF, targetRef } = usePDF({
    filename: '자기소개서.pdf',
    page: { margin: Margin.SMALL, format: 'A4' },
    method: 'save',
  });

  return (
    <>
      {psState ? (
        <div className="flex-col  w-full h-full">
          <PSHeader
            title="기초를 중요시하는 개발자"
            mode="read"
            onButtonClick={() => {
              router.push('/personal-statement/1/editing');
            }}
            handleDeleteClick={handleDeleteClick}
          />

          <div ref={targetRef} className="self-start w-full mt-8 sm:mt-20">
            <p className="w-full font-semibold text-[28px] pb-5 mb-9 border-b-2 border-5">자기소개서</p>

            <div className="flex flex-col gap-11">
              <PSReadContent label="지원 직무" content="AI Research Engineer" />
              <PSReadContent
                label="지원 사유"
                content="AI·AWS·k8s 기반의 프로젝트를 통한 디지털 기술의 관심으로 IT 동향을 조사하며, 클라우드 기반 AI통합 보안관제 플랫폼 구축 사업을 수주한 윈스에 관심을 갖게 됐습니다. 특히, 클라우드 환경에서 보안 솔루션을 적용하고 AI 기술을 활용해 사이버 위협에 신속 대응하는 보안관제 체계를 구축한다는 사실이 인상 깊었습니다.
이를 통해 AI 기술을 적극 활용한 보안 솔루션 개발을 통해 기업과 산업에 기여하겠다는 저의 가치관을 실현할 최고의 기업이라 생각해 입사를 결심했습니다.

제 목표는 AI 개발과 적용 환경을 제공해 AI 보안 솔루션을 확장하는 것입니다. 윈스는 Sniper BD1 AI Plus로 실시간 모니터링, 지능형 위협 감시, 데이터 수집 등의 기능을 통해 AI 보안 솔루션을 제공하면서, 데이터를 파악/분석하며 지속적인 AI 적용 환경을 구축하는 것이 경쟁력이라고 생각합니다.
이를 위해 모두의 수강신청 프로젝트에서 AWS·k8s 기반으로 EKS 인프라 및 CI/CD, 모니터링을 구축하며, 컨테이너 기반 기술과 클라우드 역량을 키웠습니다. 이후 해당 역량을 활용해 52 Hertz 프로젝트에서 AWS 아키텍처와 k8s 기술을 이용하여, 플랫폼 서비스의 AI 개발 및 배포와 모니터링 환경을 구축했습니다. 이를 통해 AI를 적용한 플랫폼 서비스를 개발하며 역량을 더욱 발전시켰습니다.
이를 기반으로 보안 솔루션을 위한 기술을 탐구하고 습득해, AI 모델 개발과 이를 적용하는 환경 개발 역량을 키워 글로벌로 확장하는 AI 보안 솔루션 발전에 이바지하겠습니다.
"
              />
              <PSReadContent
                label="자기소개"
                content="새로운 IT 기술을 탐구하는 것은 언제나 저의 큰 흥미 중 하나였습니다. 학교 생활을 하며 이 분야가 얼마나 다양한 영역으로확장되어 있고 여러 도메인에 적용할 수 있는지 깨닫고, 그 매력에 더욱 빠져들었습니다. 그래서 대학생활 동안 최대한 다양한 분야를 경험하며 공부하겠다는 마음가짐으로 달려왔습니다. 3학년이 되었을 때 어떤 분야를 선택할지 고민이 많았습니다. 제일 재미있는 분야를 찾지 못해 고민하던 중, 3학년 여름방학에 한국데이터산업진흥원에서 주최한 '자연어처리 기반 딥러닝 기술 융합 과정 프로젝트'에 참여하게 되었습니다. 이 프로젝트에서 2달 동안 머신러닝, 딥러닝, 언어공학, 데이터 분석 등의 기술을 습득했고, 딥러닝 기반 실시간 부정 어휘 감지 시스템을 개발하며 모델 구현에 큰 흥미를 느꼈습니다.그 이후 모델 개발을 어떻게 다양한 분야에 적용할 수 있을지 고민하기 시작했습니다. 
그러던 중 3학년 2학기에 들은 ‘정보통신기초종합설계-캡스톤’ 수업을 통해 기업 협업 캡스톤 프로젝트를 수행하
게 되었습니다. 이 프로젝트를 통해 의료 데이터 분석 분야에 처음 도전하게 되었는데, 실시간 얼굴 인식을 통해 심
박수와 호흡수를 예측하고 스트레스 지표를 생성하는 작업을 맡았습니다. 
얼굴 영상에서 생체 신호를 추출하고 이를 바탕으로 모델을 개발하는 과정에서 데이터 전처리, 특징 추출, 모델 구축 및 평가까지 전체적인 분석 과정을 경험했습니다

특히 사람의 데이터를 다루어 유의미한 결과를 얻는 것은 이전에 했던 작업보다 훨씬 흥미로웠습니다. 의료 데이터는 사람의 생체 신호를 다루는 만큼 민감한 정보를 다루어야 했기에 그 중요성을 더욱 깊이 느낄 수 있었습니다. 이러한 경험을 통해 의료 데이터 분석에 대한 흥미와 열정을 갖게되었고, 인공지능과 의료 데이터의 융합 가
능성에 대한 이해를 넓힐 수 있었습니다. 이 프로젝트의 결과물이 좋았기 때문에 제가 함께 일했던 회사에서 인턴십 제안을 받았고, 그 회사에서 정신건강 디지털 치료제를 개발하는 프로젝트에 참여할 수 있었습니다.
인턴십을 통해 수면 데이터 분석 및 수면 자세 예측 모델을 개발하는 작업을 하며 실무 경험을 쌓았습니다. 수면 데이터를 분석해 개인의 수면 상태와 자세를 파악하고 이를 기반으로 수면의 질을 분석하는 과정은 매우 흥미로웠습니다. 데이터 전처리부터 모델 구축, 예측 결과 분석까지 프로젝트의 전체적인 진행 과정을 직접 경험하면서 의료 인공지능 분야에 대한 실무적인 이해를 높일 수 있었습니다. 이러한 경험을 통해 제가 이 분야에서 더 성장할 수 있는 확신을 가지
게되었습니다.


의료 분야에 대한 경험을 쌓는 것뿐만 아니라 모델 개발 능력을 더 키우기 위해 겨울방학에는 '네이버 부스트캠프 - AI 엔지니어 준비 과정'을 수료했습니다. 이 과정에서는 딥러닝의 이론적인 원리와 실무 기술에 집중해 공부했고, 머신러닝, 딥러닝, 그리고 다양한 딥러닝 프레임워크에 대한 깊은 이해를 통해 딥러닝 모델 구축 및 최적화에 대한 전문 지식을 쌓을 수 있었습니다. 또한, 토이 프로젝트를 통해 딥러닝 모델의 구축 과정과 최적화 방법에 대해 실질적인 경험을 얻을 수 있었습니다.
이 과정에서 배운 것은 단순한 이론적 지식에 그치지 않고 실제로 모델을 개발하는 데 필요한 실용적인 기술을 익히는 것이었습니다. 딥러닝 모델을 실무에 적용하는 데 필요한 기술들을 익히면서 딥러닝에 대한 자신감을 가지게 되었고, 이를 통해 다양한 응용 분야에 모델을 적용하는 데 필요한 능력을 개발할 수 있었습니다. 저는 이러한 프로젝트에 참여함으로써 의료 인공지능 분야에 대한 전문성을 높이고, 더 나아가 의료 데이터 분석과 딥러닝 분야의 융합에 기여하고자 합니다 저는 의료도메인과 딥러닝을 융합한
다양한 프로젝트에 참여한 경험이 있고, 이를 통해 모델 개발
과 최적화에 자신이 있습니다. 이러한 경험을 바탕으로 해당 프로젝트에 기여하고자 하며, 의료 분야에서 더 많은 경험을 쌓고자 합니다.
"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-44">
          <Image className="animate-bounce" src="/mascot.png" alt="마스코트" width={204} height={193} />
          <p className="text-gray-0">불러오는 중 입니다</p>
        </div>
      )}
      <PSFooter
        showPDF
        showBack
        handlePdfClick={toPDF}
        handleBackClick={() => {
          router.back();
        }}
      />

      {modalState.open && (
        <Modal
          hasSubBtn={modalState.hasSubBtn}
          topText={modalState.topText}
          subBtnText={modalState.subBtnText}
          btnText={modalState.btnText}
          onSubBtnClick={modalState.onSubBtnClick}
          onBtnClick={modalState.onBtnClick}
        />
      )}
    </>
  );
}
