'use client';

import BackButton from '../../../../../_components/BackButton';
import PSEditingBox from './_components/PSEditingBox';

export default function PersonalStatementEditing() {
  return (
    <section className="flex-center flex-col mx-auto w-full h-full pt-[100px] pb-8 px-8 max-w-[1056px] min-w-[365px]">
      <BackButton className="self-start pb-2" />

      <div className="flex items-center justify-between w-full pb-4">
        <p className="font-semibold">자소서 첨삭</p>
        <button type="button" onClick={() => {}} className="px-10 py-[18px] rounded-[28px] primary-1-btn">
          포스트 작성
        </button>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex flex-col sm:flex-row gap-5 w-full">
        <PSEditingBox
          label="작성한 자기소개서"
          content="저는 웹 개발에 대한 열정과 사용자 경험을 향상시키는 데 기여하고 싶은 목표로 프론트엔드 개발자로서 커리어를 쌓아왔습니다. 웹사이트가 단순한 정보 전달을 넘어서 사용자와 소통하고, 브랜드 가치를 전달하는 중요한 매체로 자리잡는 과정에서 프론트엔드 개발자의 역할이 매우 중요하다는 것을 깨달았습니다. 그동안 React, Vue.js와 같은 프레임워크를 사용하며 인터랙티브하고 반응형 웹사이트를 구축하면서 사용자 경험을 극대화할 수 있다는 사실에 매료되었습니다. 귀사의 프로젝트가 사용자의 필요와 트렌드를 반영하며, 혁신적인 기술을 통해 더 나은 웹 경험을 제공하려는 비전을 보았고, 이에 함께 기여하고 싶어 지원하게 되었습니다."
        />

        <PSEditingBox
          label="AI 첨삭 자기소개서"
          content="저는 웹 개발에 대한 열정과 사용자 경험을 향상시키는 데 기여하고 싶은 목표로 프론트엔드 개발자로서 커리어를 쌓아왔습니다. 웹사이트가 단순한 정보 전달을 넘어서 사용자와 소통하고, 브랜드 가치를 전달하는 중요한 매체로 자리잡는 과정에서 프론트엔드 개발자의 역할이 매우 중요하다는 것을 깨달았습니다. 그동안 React, Vue.js와 같은 프레임워크를 사용하며 인터랙티브하고 반응형 웹사이트를 구축하면서 사용자 경험을 극대화할 수 있다는 사실에 매료되었습니다. 귀사의 프로젝트가 사용자의 필요와 트렌드를 반영하며, 혁신적인 기술을 통해 더 나은 웹 경험을 제공하려는 비전을 보았고, 이에 함께 기여하고 싶어 지원하게 되었습니다."
        />
      </div>

      {/* 안내문구 */}
      <div className="flex gap-4 items-center w-full text-[10px] sm:text-base mt-4 px-11 py-5 bg-[#F3F3F3] text-gray-0">
        <p id="임시" className="h-4 text-xs text-white-0 bg-gray-0 rounded-full px-[6px]">
          !
        </p>
        <div>
          <p>
            첨삭 내용을 다시 확인하려면 포스트를 반드시 생성해야 합니다. 포스트를 생성하지 않으면 첨삭 내용을 다시 볼 수
            없습니다.
          </p>
          <p className="hidden md:block">
            추상적인 설명보다는 구체적인 경험이나 성과를 통해 자신을 어필하세요. 이를 통해 신뢰성과 설득력을 높일 수
            있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
