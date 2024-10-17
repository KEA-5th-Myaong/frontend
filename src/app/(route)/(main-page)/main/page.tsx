'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Post from '../../../_components/Post';
import JobMenu from './_components/JobMenu';
import postTest from '../../(blog)/blog/[userId]/_components/test.json';
import { PostProps } from '../../(blog)/blog/[userId]/_types/blog';
import InterestedJob from './_components/InterestedJob';

export default function MainPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [activeTab, setActiveTab] = useState('추천');
  const [showInterestedJob, setShowInterestedJob] = useState(true);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setPosts(postTest);
  }, []);

  const handleInterestedJobClose = () => {
    setShowInterestedJob(false);
  };
  return (
    <>
      <section className="flex justify-center pt-10 sm:pt-11 md:pt-14 pb-12">
        <div className="w-full min-w-[360px] max-w-[982px] px-[42px]">
          <div id="캐러셀" className="w-full h-[214px] md:h-[280px] rounded-[10px] relative overflow-hidden">
            <Image
              src="/assets/carousel1.png"
              alt="캐러셀 1"
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-col md:flex-row w-full gap-[14px]">
            {/* 직군 메뉴 */}
            <JobMenu className="hidden md:flex" />

            <div className="flex flex-col items-center w-full pt-4 md:pt-5">
              {/* 추천 팔로잉 가로 북마크 */}
              <div className="flex flex-col w-full max-w-[254px] sm:max-w-[416px] ">
                <div className="flex justify-around w-full relative">
                  {['추천', '팔로잉', '북마크'].map((tab) => (
                    <button key={tab} type="button" onClick={() => handleTabChange(tab)} className="pb-2">
                      {tab}
                    </button>
                  ))}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-300 rounded-[10px]" />
                  <div
                    className="absolute bottom-0 h-[2px] bg-primary-1 transition-all duration-300 ease-in-out rounded-[10px] w-1/3"
                    style={{
                      left: `${(['추천', '팔로잉', '북마크'].indexOf(activeTab) / 3) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* 직군 메뉴 */}
              <JobMenu className="flex md:hidden" />
              {/* 피드 */}
              <div className="flex flex-col gap-6 w-full pt-5">
                {posts.map((post) => (
                  <Post
                    id={post.id}
                    userName={post.userName}
                    userId={post.userId}
                    userJob={post.userJob}
                    postTitle={post.postTitle}
                    postContent={post.postContent}
                    postDate={post.postDate}
                    isLoved={post.isLoved}
                    lovedCount={post.lovedCount}
                    isBookmarked={post.isBookmarked}
                    onUserClick={() => {
                      router.push(`/blog/${post.userId}`);
                    }}
                    onContentClick={() => {
                      router.push(`/blog/${post.userId}/${post.id}`);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {showInterestedJob && <InterestedJob onClose={handleInterestedJobClose} />}
    </>
  );
}
